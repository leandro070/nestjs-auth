import { Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const mysql = require('mysql2/promise');
import * as mysql from 'mysql2/promise';

export const MYSQL_CONNECTION = 'MYSQL_CONNECTION';
export const databaseProviders = [
  {
    provide: MYSQL_CONNECTION,
    useFactory: async (
      configService: ConfigService,
      logger: Logger,
    ): Promise<mysql.Pool> => {
      try {
        const pool = await mysql.createPool({
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          user: configService.get<string>('MYSQL_USER'),
          password: configService.get<string>('MYSQL_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
          multipleStatements: true,
        });
        const conn = await pool.getConnection();
        await conn.release();
        logger.log('Database ready', 'DatabaseProvider');
        return pool;
      } catch (error) {
        logger.error('Database connection error', error, 'DatabaseProvider');
      }
    },
    inject: [ConfigService, Logger],
    scope: Scope.TRANSIENT,
  },
];
