import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from 'types/config';
import { UserModule } from 'modules/user/user.module';
import { UserService } from 'modules/user/services/user.service';
import { AuthResolver } from 'modules/auth/graphql/auth.resolver';
import { JwtStrategy } from 'modules/auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService<Config>) => {
        const { secret, expiryPeriod } = config.get<Config['jwt']>('jwt');

        return {
          secret,
          signOptions: { expiresIn: expiryPeriod },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
  providers: [
    ConfigService,
    UserService,
    AuthService,
    JwtStrategy,
    AuthResolver,
  ],
})
export class AuthModule {}
