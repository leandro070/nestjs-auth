import { Injectable } from '@nestjs/common';
import { IAddress } from 'src/components/addresses/interfaces/IAddress';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class AddressRepository extends BaseAbstractRepository<IAddress> {
  public async create(address: Omit<IAddress, 'id'>): Promise<number> {
    const res = await this.query('INSERT INTO Addresses SET ?', address);
    return res.insertId as number;
  }
  public async findByCondition(
    filterCondition: any,
    args = [],
  ): Promise<IAddress[]> {
    throw new Error('Method not implemented.');
  }
  public findOneById(id: number): Promise<IAddress> {
    const res = this.query('SELECT * FROM Cities WHERE id = ?', [id]);
    return res;
  }
  public findAll(): Promise<IAddress[]> {
    throw new Error('Method not implemented.');
  }
  public remove(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
