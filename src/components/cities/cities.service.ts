import { Injectable, Logger } from '@nestjs/common';
import { CityRepository } from 'src/repositories/city.repository';

@Injectable()
export class CitiesService {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly logger: Logger,
  ) {}

  async findAllByCountryId(countryId) {
    this.logger.log(
      `Finding all cities by countryId ${countryId}...`,
      `${CitiesService.name} - findAllByCountryId`,
    );
    return await this.cityRepository.findAllByCountryId(countryId);
  }

  async findOneById(cityId) {
    this.logger.log(
      `Finding a city with id ${cityId}...`,
      `${CitiesService.name} - findOneById`,
    );
    return await this.cityRepository.findOneById(cityId);
  }
}
