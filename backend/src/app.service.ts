import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Name } from './entities/name.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Name)
    private namesRepository: Repository<Name>,
  ) {}
  async addName(firstName: string, lastName: string) {
    // take name and save into main table of database
    const newName = await this.namesRepository.save({
      first_name: firstName,
      last_name: lastName,
    });
    return newName;
  }
  async getNames() {
    //get all names from database
    return await this.namesRepository.find();
  }
}
