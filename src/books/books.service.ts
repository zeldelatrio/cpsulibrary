import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<Book>) {
    const book = this.repo.create(data);
    return this.repo.save(book);
  }

  async update(id: number, data: Partial<Book>) {
    await this.repo.update(id, data);
    return { message: 'Book updated' };
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { message: 'Book deleted' };
  }
}