import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';  // ✅ Add this import

@Injectable()
export class BooksService {
     constructor(private dataSource: DataSource) {}
     
  async checkdb(): Promise <string>{
    if(!this.dataSource.isInitialized){
      await this.dataSource.initialize();
    }
  return 'you are successfully connected with your database and successfully created table with columns';
  }
}
