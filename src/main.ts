import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Serve frontend
  app.use(express.static(join(__dirname, '..', 'public')));

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();