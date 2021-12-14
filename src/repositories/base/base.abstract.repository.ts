import { Inject } from '@nestjs/common';
import { Connection } from 'mysql2/typings/mysql';
import { BaseInterfaceRepository } from './base.interface.repository';
import { RedisCacheService } from 'src/cache/redis.service';

export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  constructor(
    @Inject('MYSQL_CONNECTION') private db: Connection,
    protected readonly cacheManager: RedisCacheService,
  ) {}

  public abstract create(data: T): Promise<number>;

  public abstract findOneById(id: number): Promise<T>;

  protected abstract _findByCondition(
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
