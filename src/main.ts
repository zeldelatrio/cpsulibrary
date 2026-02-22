import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// AppModule is the root module of the application.
// NestJS starts the app from this module and loads
// all other modules, controllers, and services from it.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();


