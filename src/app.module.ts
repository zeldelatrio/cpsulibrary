import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // change if you have password
      database: 'cpsu_library',
      autoLoadEntities: true,
      synchronize: true, // auto create table (DEV only)
    }),
    BooksModule,
  ],
})
export class AppModule {}