import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { BaseInterfaceRepository } from './base.interface.repository';
import { RedisCacheService } from '@cache/redis.service';
import { MYSQL_CONNECTION } from '@database/database.provider';
import * as mysql from 'mysql2/promise';

export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  constructor(
    @Inject(MYSQL_CONNECTION) protected db: mysql.Pool,
    protected readonly cacheManager: RedisCacheService,
    protected readonly logger: Logger,
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
    const conn = await this.db.getConnection();
    try {
      const data = await conn.query(sql, args);
      return data[0];
    } catch (error) {
      this.logger.warn('Query Error', error, BaseAbstractRepository.name);
      throw new InternalServerErrorException();
    } finally {
      conn.release();
    }
  }
}
