import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseSeederService } from 'db.seed';
import { AuthModule } from 'modules/auth/auth.module';
import { NFT } from 'modules/nft/models/nft.model';
import { NFTTransfer } from 'modules/nft/models/nft_transfer.model';
import { User } from 'modules/user/models/user.model';
import { Config } from 'types/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService<Config>) => {
        const { password, db, user, host } = config.get('database');

        return {
          host,
          password,
          type: 'mysql',
          port: 3306,
          username: user,
          database: db,
          autoLoadEntities: true,
          entities: [User, NFT, NFTTransfer],
          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature([User, NFT, NFTTransfer]),
    AuthModule,
  ],
  providers: [DatabaseSeederService],
  exports: [DatabaseSeederService],
})
export class DatabaseModule {}
