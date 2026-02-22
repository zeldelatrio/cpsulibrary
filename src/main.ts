import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // ✅ ADD THIS

async function bootstrap() {
  console.log('🚀 Starting NestJS on Railway...');
  console.log('MYSQL_PUBLIC_URL:', process.env.MYSQL_PUBLIC_URL ? 'SET' : 'NOT SET');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('PORT:', process.env.PORT);

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // 🔥 ADD THIS BLOCK
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,  // ✅ THIS IS THE IMPORTANT PART
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`✅ Server running on port ${port}`);
}

bootstrap();