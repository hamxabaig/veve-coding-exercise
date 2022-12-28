import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'modules/user/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(userId: number): Promise<User | undefined> {
    return this.usersRepo.findOneBy({ id: userId });
  }
}
