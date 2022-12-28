import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NftModule } from './modules/nft/nft.module';
import { UserModule } from 'modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'db.module';
import { AuthModule } from 'modules/auth/auth.module';
import { config } from 'config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      include: [NftModule, AuthModule],
    }),
    DatabaseModule,
    NftModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
