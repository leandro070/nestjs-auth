import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CountryRepository } from 'src/repositories/country.repository';
import { RedisCacheModule } from 'src/cache/redis.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, RedisCacheModule],
  controllers: [CountriesController],
  providers: [CountriesService, CountryRepository],
})
export class CountriesModule {}
