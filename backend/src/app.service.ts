import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Name } from './Entities/name.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Name)
    private namesRepository: Repository<Name>,
  ) {}
  async addName(name: string) {
    // take name and save into main table of database
    await this.namesRepository.save({ name });
    return await this.getNames();
  }
  async getNames() {
    //get all names from database
    return await this.namesRepository.find();
  }
}
