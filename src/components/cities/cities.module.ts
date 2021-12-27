import { Logger, Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CityRepository } from '@repositories/city.repository';
import { DatabaseModule } from '@database/database.module';
import { RedisCacheModule } from '@cache/redis.module';

@Module({
  imports: [DatabaseModule, RedisCacheModule],
  controllers: [CitiesController],
  providers: [CitiesService, CityRepository, Logger],
})
export class CitiesModule {}
