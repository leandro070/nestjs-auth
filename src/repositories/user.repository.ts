import { Injectable } from '@nestjs/common';
import { IUser } from 'src/components/auth/interfaces/IUser';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class UserRepository extends BaseAbstractRepository<IUser> {
  public async create(user: Omit<IUser, 'id'>): Promise<number> {
    const res = await this.query('INSERT INTO Users SET ?', user);
    return res.insertId as number;
  }
  protected async _findByCondition(
    filterCondition: any,
    args = [],
  ): Promise<IUser[]> {
    const res = await this.query(
      'SELECT username, id, password FROM Users WHERE ' + filterCondition,
      args,
    );

    return res;
  }
  public findOneById(id: number): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  public findAll(): Promise<IUser[]> {
    throw new Error('Method not implemented.');
  }
  public remove(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public async findByUsername(username: string) {
    const res = await this._findByCondition('username = ?', [username]);
    return res;
  }
}
