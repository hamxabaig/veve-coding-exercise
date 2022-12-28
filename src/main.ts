import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DatabaseSeederService } from 'db.seed';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  await app.get(DatabaseSeederService).seed();
  await app.listen(3000);
}
bootstrap();
