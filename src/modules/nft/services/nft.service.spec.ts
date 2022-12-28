import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NFT } from 'modules/nft/models/nft.model';
import { NFTTransfer } from 'modules/nft/models/nft_transfer.model';
import { UserService } from 'modules/user/services/user.service';
import { NftService } from './nft.service';

export const nftRepositoryMock = {
  findOneBy: jest.fn(),
  save: jest.fn(),
};
export const nftTransferRepositoryMock = {
  create: jest.fn(),
  save: jest.fn(),
};
export const userServiceMock = {
  findById: jest.fn(),
};
export const loggerMock = {
  log: jest.fn(),
};

describe('NFTService', () => {
  let service: NftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NftService,
        { provide: getRepositoryToken(NFT), useValue: nftRepositoryMock },
        {
          provide: getRepositoryToken(NFTTransfer),
          useValue: nftTransferRepositoryMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: Logger,
          useValue: loggerMock,
        },
      ],
    }).compile();

    service = module.get<NftService>(NftService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('transfers nft to new owner', async () => {
    userServiceMock.findById.mockResolvedValue({ id: 2 });
    nftRepositoryMock.findOneBy.mockResolvedValue({ owner: { id: 1 } });
    nftTransferRepositoryMock.save.mockResolvedValue({ id: 1 });

    const transferId = await service.transfer(1, 1, 2);
    expect(transferId).toBe(1);
  });

  it('throws error if nft does not belong to owner', async () => {
    userServiceMock.findById.mockResolvedValue({ id: 2 });
    nftRepositoryMock.findOneBy.mockResolvedValue({ owner: { id: 1 } });

    const transferFn = () => service.transfer(1, 2, 2);
    expect(transferFn).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws error if nft was not found', async () => {
    userServiceMock.findById.mockResolvedValue({ id: 2 });
    nftRepositoryMock.findOneBy.mockResolvedValue(undefined);

    const transferFn = () => service.transfer(1, 2, 2);
    expect(transferFn).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws error if new owner was not found', async () => {
    userServiceMock.findById.mockResolvedValue(undefined);
    nftRepositoryMock.findOneBy.mockResolvedValue({ owner: { id: 1 } });

    const transferFn = () => service.transfer(1, 2, 2);
    expect(transferFn).rejects.toThrowErrorMatchingSnapshot();
  });
});
