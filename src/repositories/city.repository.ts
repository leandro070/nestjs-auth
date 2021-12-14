import { Injectable } from '@nestjs/common';
import { ICity } from 'src/components/cities/interfaces/ICity';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class CityRepository extends BaseAbstractRepository<ICity> {
  public async create(user: Omit<ICity, 'id'>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  public async findByCondition(
    filterCondition: any,
    args = [],
  ): Promise<ICity[]> {
    throw new Error('Method not implemented.');
  }
  public findOneById(id: number): Promise<ICity> {
    const res = this.query('SELECT * FROM Cities WHERE id = ?', [id]);
    return res;
  }
  public findAll(): Promise<ICity[]> {
    throw new Error('Method not implemented.');
  }
  public remove(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
