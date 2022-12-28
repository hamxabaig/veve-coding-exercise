import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'decorators/user.decorator';
import { GraphqlAuthGuard } from 'modules/auth/guards/graphql.guard';
import {
  NFTsPaginationInput,
  NFTTransferInput,
} from 'modules/nft/graphql/nft.input';
import { NFTsType } from 'modules/nft/graphql/nft.type';
import { NftService } from 'modules/nft/services/nft.service';
import { User } from 'modules/user/models/user.model';

@Resolver()
export class NftResolver {
  constructor(
    @Inject(NftService)
    private nftService: NftService,
  ) {}

  @UseGuards(GraphqlAuthGuard)
  @Query(() => NFTsType)
  async nfts(
    @Args('pagination', { type: () => NFTsPaginationInput })
    pagination: NFTsPaginationInput,
    @CurrentUser() user: User,
  ): Promise<NFTsType> {
    const { id: ownerId } = user;
    const { page, limit } = pagination;

    return this.nftService.getAllByUser(ownerId, page, limit);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Boolean)
  async transferNFT(
    @Args('data', { type: () => NFTTransferInput })
    data: NFTTransferInput,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    const { id: prevOwnerId } = user;
    const { newOwnerId, nftId } = data;
    const transferId = await this.nftService.transfer(
      nftId,
      prevOwnerId,
      newOwnerId,
    );

    return !!transferId;
  }
}
