import { Injectable } from '@nestjs/common';
import { ICountry } from 'src/components/countries/interfaces/ICountry';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class CountryRepository extends BaseAbstractRepository<ICountry> {
  public async create(user: Omit<ICountry, 'id'>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  public async findByCondition(
    filterCondition: any,
    args = [],
  ): Promise<ICountry[]> {
    throw new Error('Method not implemented.');
  }
  public findOneById(id: number): Promise<ICountry> {
    throw new Error('Method not implemented.');
  }
  public findAll(): Promise<ICountry[]> {
    throw new Error('Method not implemented.');
  }
  public remove(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
