import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @MinLength(8)
  @MaxLength(50)
  @Field()
  password: string;
}
