import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CityRepository } from '@repositories/city.repository';

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
    const cities = await this.cityRepository.findAllByCountryId(countryId);
    if (!cities.length) {
      this.logger.log(
        `There aren't cities for countryId ${countryId}`,
        `${CitiesService.name} - findAllByCountryId`,
      );
      throw new HttpException(
        `There aren't cities for selected country`,
        HttpStatus.NOT_FOUND,
      );
    }
    return cities;
  }

  async findOneById(cityId) {
    this.logger.log(
      `Finding a city with id ${cityId}...`,
      `${CitiesService.name} - findOneById`,
    );
    return await this.cityRepository.findOneById(cityId);
  }
}
