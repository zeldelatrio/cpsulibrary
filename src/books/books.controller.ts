import { Controller, Get, Post, Body } from '@nestjs/common';
import {BooksService} from './books.service';

@Controller('books')
export class BooksController {
constructor(private readonly booksservice: BooksService){}

 @Get('db')
  async checkdatabase(): Promise<string> {
    return await this.booksservice.checkdb();
  }

}

