import { Min, Max } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NFTsPaginationInput {
  @Min(1)
  @Field()
  page: number;

  @Min(1)
  @Max(50)
  @Field()
  limit: number;
}

@InputType()
export class NFTTransferInput {
  @Field()
  newOwnerId: number;

  @Field()
  nftId: number;
}
