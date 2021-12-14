import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Connection } from 'mysql2/typings/mysql';
import { Cache } from 'cache-manager';
import { BaseInterfaceRepository } from './base.interface.repository';

export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  constructor(
    @Inject('MYSQL_CONNECTION') private db: Connection,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
  ) {}

  public abstract create(data: T): Promise<number>;

  public abstract findOneById(id: number): Promise<T>;

  public abstract findByCondition(
    filterCondition: any,
    args?: any[],
  ): Promise<T[]>;

  public abstract findAll(): Promise<T[]>;

  public abstract remove(id: number): Promise<boolean>;

  public async query(sql: string, args?: any): Promise<any | T[] | T> {
    const data = await this.db.query(sql, args);
    return data[0];
  }
}
