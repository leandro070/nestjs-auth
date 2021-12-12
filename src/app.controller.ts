import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    const connection = mysql.createConnection({
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      user: this.configService.get<string>('MYSQL_USER'),
      password: this.configService.get<string>('MYSQL_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
    });
    const result = await new Promise((res, rej) => {
      // simple query
      connection.execute(
        'SELECT * FROM `Countries`',
        function (err, results, fields) {
          if (results) {
            res(results);
          } else {
            rej(err);
          }
          console.log({ results }); // results contains rows returned by server
          console.log({ fields, err }); // fields contains extra meta data about results, if available
        },
      );
    });

    return result;
  }
}
