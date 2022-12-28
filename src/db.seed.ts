import { Injectable } from '@nestjs/common';
import { AuthService } from 'modules/auth/services/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'modules/user/models/user.model';
import { NFT } from 'modules/nft/models/nft.model';

const users = [
  { name: 'john', email: 'test1@gmail.com', password: 'secure_password' },
  { name: 'foo', email: 'test2@gmail.com', password: 'secure_password' },
];

const nfts = [
  {
    name: 'Cool NFT',
    description: 'Very cool nft',
    blockchainLink: 'some_link',
    imageUrl: 'some_image_url',
    owner: 1 as any,
    mintDate: new Date(),
  },
];

@Injectable()
export class DatabaseSeederService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(NFT)
    private nftsRepo: Repository<NFT>,
    private authService: AuthService,
  ) {}

  public async seed() {
    const shouldSeed = await this.shouldSeed();
    if (!shouldSeed) {
      return;
    }

    await this.seedUsers();
    await this.seedNFTs();
  }

  private async shouldSeed() {
    const [nftCount, userCount] = await Promise.all([
      this.nftsRepo.count(),
      this.usersRepo.count(),
    ]);

    return nftCount <= 0 || userCount <= 0;
  }

  private async seedNFTs() {
    const promises = nfts.map(async (nft) => {
      const entity = this.nftsRepo.create(nft);
      await this.nftsRepo.save(entity);
    });

    await Promise.all(promises);
  }

  private async seedUsers() {
    const promises = users.map(async (user) => {
      const passwordHash = await this.authService.hashPassword(user.password);
      const newUser = { ...user, passwordHash };
      const entity = this.usersRepo.create(newUser);
      await this.usersRepo.save(entity);
    });

    await Promise.all(promises);
  }
}
