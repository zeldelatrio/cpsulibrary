import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private dataSource: DataSource,
  ) {}

  // 🔥 GET ALL BOOKS
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  // 🔥 CREATE BOOK
  async create(dto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(dto);
    return this.bookRepository.save(book);
  }

  // 🔥 UPDATE BOOK
  async update(id: number, dto: UpdateBookDto): Promise<Book> {
    const result = await this.bookRepository.update(id, dto);

    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return this.bookRepository.findOneByOrFail({ id });
  }

  // 🔥 DELETE BOOK
  async remove(id: number): Promise<void> {
    const result = await this.bookRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  // 🔥 DATABASE CHECK
  async checkdb(): Promise<string> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
    return 'Database connected successfully!';
  }
}