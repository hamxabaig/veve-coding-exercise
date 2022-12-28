import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'modules/user/services/user.service';
import { randomRangedNumber } from 'utils/range';
import { v4 } from 'uuid';
import { sleep } from 'utils/sleep';
import { User } from 'modules/user/models/user.model';
import { AuthUser } from 'types/auth';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);

    return this.getJWT(user.id);
  }

  public async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOne(email);
    const isPassCorrect = await this.matchPassword(user.passwordHash, pass);

    if (!user || !isPassCorrect) {
      // Introduces a random delay of max 1 secs to avoid time based attacks
      await sleep(200 * randomRangedNumber(1, 5));
      throw new Error('Password or email invalid');
    }

    return user;
  }

  public async isValidUser(userId: number): Promise<AuthUser> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not valid');
    }

    return {
      email: user.email,
      id: user.id,
      name: user.name,
    };
  }

  public async hashPassword(pass: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(pass, saltOrRounds);

    return hash;
  }

  private async matchPassword(hash: string, pass: string): Promise<boolean> {
    return await bcrypt.compare(pass, hash);
  }

  private async getJWT(userId: number) {
    // Useful in scenarios where you can save jwtId in redis
    // and want to invalidate sessions
    const jwtId = v4();

    return {
      tokenType: 'bearer',
      accessToken: this.jwtService.sign(
        {
          userId,
        },
        { jwtid: jwtId },
      ),
    };
  }
}
