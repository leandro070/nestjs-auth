import { Injectable } from '@nestjs/common';
import { CountryRepository } from 'src/repositories/country.repository';

@Injectable()
export class CountriesService {
  constructor(private readonly countryRepository: CountryRepository) {}
  async findAll() {
    return await this.countryRepository.findAll();
  }
}
