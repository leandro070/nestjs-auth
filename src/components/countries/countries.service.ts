import { Injectable, Logger } from '@nestjs/common';
import { CountryRepository } from 'src/repositories/country.repository';

@Injectable()
export class CountriesService {
  constructor(
    private readonly countryRepository: CountryRepository,
    private readonly logger: Logger,
  ) {}
  async findAll() {
    this.logger.log(
      `Finding all countries...`,
      `${CountriesService.name} - findAll`,
    );
    return await this.countryRepository.findAll();
  }
}
