import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NFTType {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  blockchainLink: string;

  @Field()
  imageUrl: string;

  @Field(() => GraphQLISODateTime)
  mintDate: Date;
}

@ObjectType()
export class NFTsType {
  @Field(() => [NFTType])
  edges: NFTType[];

  @Field()
  total: number;
}
