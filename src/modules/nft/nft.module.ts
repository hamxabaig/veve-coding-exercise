import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NFT } from 'modules/nft/models/nft.model';
import { NFTTransfer } from 'modules/nft/models/nft_transfer.model';
import { UserModule } from 'modules/user/user.module';
import { NftResolver } from './graphql/nft.resolver';
import { NftService } from './services/nft.service';

@Module({
  imports: [TypeOrmModule.forFeature([NFT, NFTTransfer]), UserModule],
  providers: [Logger, NftResolver, NftService],
})
export class NftModule {}
