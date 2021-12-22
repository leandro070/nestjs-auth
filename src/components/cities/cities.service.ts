import { Injectable } from '@nestjs/common';
import { CityRepository } from 'src/repositories/city.repository';

@Injectable()
export class CitiesService {
  constructor(private readonly cityRepository: CityRepository) {}
  async findAllByCountryId(countryId) {
    return await this.cityRepository.findAllByCountryId(countryId);
  }

  async findOneById(cityId) {
    return await this.cityRepository.findOneById(cityId);
  }
}
