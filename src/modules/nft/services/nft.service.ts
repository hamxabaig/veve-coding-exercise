import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NFT } from 'modules/nft/models/nft.model';
import { NFTTransfer } from 'modules/nft/models/nft_transfer.model';
import { UserService } from 'modules/user/services/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(NFT)
    private nftRepository: Repository<NFT>,
    @InjectRepository(NFTTransfer)
    private nftTransferRepository: Repository<NFTTransfer>,
    @Inject(UserService)
    private userService: UserService,
    private readonly logger: Logger,
  ) {}

  async getAllByUser(ownerId: any, page: number, limit: number) {
    const [edges, total] = await this.nftRepository.findAndCount({
      where: { owner: ownerId },
      relations: ['owner'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      edges,
      total,
    };
  }

  async transfer(nftId: any, prevOwnerId: any, newOwnerId: any) {
    const [nft, newOwner] = await Promise.all([
      this.nftRepository.findOneBy({ id: nftId }),
      this.userService.findById(newOwnerId),
    ]);

    if (!newOwner) {
      throw new BadRequestException(`User not found with id ${newOwnerId}`);
    }

    if (!nft || nft.owner.id !== prevOwnerId) {
      throw new BadRequestException(
        `NFT not found with id ${nftId} or you might not have access to it`,
      );
    }

    await this.nftRepository.save({
      ...nft,
      owner: newOwner,
    });

    const nftTransfer = this.nftTransferRepository.create({
      nft: nftId,
      prevOwner: prevOwnerId,
      newOwner: newOwnerId,
    });

    const newTransfer = await this.nftTransferRepository.save(nftTransfer);

    this.logger.log('Transferred nft to new user', {
      nftId,
      prevOwnerId,
      newOwnerId,
    });

    return newTransfer.id;
  }
}
