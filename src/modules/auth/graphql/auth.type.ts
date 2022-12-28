import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginType {
  @Field()
  accessToken: string;

  @Field()
  tokenType: string;
}
