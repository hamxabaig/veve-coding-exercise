import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'modules/user/models/user.model';
import { UserService } from 'modules/user/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UserService],
  providers: [Logger, UserService],
})
export class UserModule {}
