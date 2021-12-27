import { Logger, Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CountryRepository } from '@repositories/country.repository';
import { RedisCacheModule } from '@cache/redis.module';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule, RedisCacheModule],
  controllers: [CountriesController],
  providers: [CountriesService, CountryRepository, Logger],
})
export class CountriesModule {}
