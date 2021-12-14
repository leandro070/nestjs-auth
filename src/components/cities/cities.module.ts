import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CityRepository } from 'src/repositories/city.repository';
import { DatabaseModule } from 'src/database/database.module';
import { RedisCacheModule } from 'src/cache/redis.module';

@Module({
  imports: [DatabaseModule, RedisCacheModule],
  controllers: [CitiesController],
  providers: [CitiesService, CityRepository],
})
export class CitiesModule {}
