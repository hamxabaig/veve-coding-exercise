import { registerAs } from '@nestjs/config';
import { Config } from 'types/config';

export default registerAs<Config['jwt']>('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiryPeriod: '7d',
}));
