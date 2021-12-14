import { Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const mysql = require('mysql2/promise');
import * as mysql from 'mysql2/promise';

export const databaseProviders = [
  {
    provide: 'MYSQL_CONNECTION',
    useFactory: async (configService: ConfigService): Promise<unknown> => {
      try {
        const connection = await mysql.createPool({
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

        return connection;
      } catch (error) {
        throw error;
      }
    },
    inject: [ConfigService],
    scope: Scope.TRANSIENT,
  },
];
