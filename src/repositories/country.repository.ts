import { Injectable } from '@nestjs/common';
import { ICountry } from 'src/components/countries/interfaces/ICountry';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class CountryRepository extends BaseAbstractRepository<ICountry> {
  private redisCountriesKey = 'COUNTRIES_KEY';
  public async create(user: Omit<ICountry, 'id'>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  protected async _findByCondition(
    filterCondition: any,
    args = [],
  ): Promise<ICountry[]> {
    throw new Error('Method not implemented.');
  }
  public findOneById(id: number): Promise<ICountry> {
    throw new Error('Method not implemented.');
  }
  public async findAll(): Promise<ICountry[]> {
    let countries: ICountry[] = await this.cacheManager.get(
      this.redisCountriesKey,
    );

    if (!countries) {
      const res = await this.query('SELECT * FROM Countries');
      countries = res;
      await this.cacheManager.set(this.redisCountriesKey, countries);
    }

    return countries;
  }
  public remove(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
