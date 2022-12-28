import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from 'modules/auth/graphql/auth.input';
import { LoginType } from 'modules/auth/graphql/auth.type';
import { AuthService } from 'modules/auth/services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  @Mutation(() => LoginType)
  async login(
    @Args('data', { type: () => LoginInput })
    data: LoginInput,
  ): Promise<LoginType> {
    const { email, password } = data;

    return this.authService.login(email, password);
  }
}
