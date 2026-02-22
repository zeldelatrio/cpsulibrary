import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // 🔥 GET /books
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  // 🔥 POST /books
  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  // 🔥 PUT /books/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.booksService.update(+id, dto);
  }

  // 🔥 DELETE /books/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }

  // Optional: database test
  @Get('db')
  async checkdatabase(): Promise<string> {
    return await this.booksService.checkdb();
  }
}