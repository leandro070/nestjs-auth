import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database.provider';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  providers: [...databaseProviders, Logger],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
