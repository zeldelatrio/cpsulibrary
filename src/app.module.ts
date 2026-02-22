import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/book.entity';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
      password: '', // change if you have password
      database: 'cpsu_library',
      entities: [Book],
      synchronize: true, // auto create table (DEV only)
    }),
         TypeOrmModule.forFeature([Book]), 
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class AppModule {}