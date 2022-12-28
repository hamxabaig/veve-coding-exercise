import { registerAs } from '@nestjs/config';
import { Config } from 'types/config';

export default registerAs<Config['database']>('database', () => ({
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
}));
