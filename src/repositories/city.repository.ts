import { Injectable, NotFoundException } from '@nestjs/common';
import { ICity } from 'src/components/cities/interfaces/ICity';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class CityRepository extends BaseAbstractRepository<ICity> {
  public async create(user: Omit<ICity, 'id'>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  protected async _findByCondition(
    filterCondition: any,
    args = [],
  ): Promise<ICity[]> {
    const res = await this.query(
      'SELECT * FROM Cities WHERE ' + filterCondition,
      [...args],
    );
    return res;
  }
  public async findOneById(id: number): Promise<ICity> {
    const res = await this.query('SELECT * FROM Cities WHERE id = ?', [id]);
    return res[0];
  }
  public findAll(): Promise<ICity[]> {
    throw new Error('Method not implemented.');
  }
  public remove(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async findAllByCountryId(countryId: number) {
    this.logger.log(
      `Finding cities on Redis cache: CountryId ${countryId}...`,
      `${CityRepository.name} - findAllByCountryId`,
    );
    let cities: ICity[] = await this.cacheManager.get(
      `CITIES_BY_COUNTRY_${countryId}`,
    );

    if (!cities) {
      this.logger.log(
        `Cities not found on Redis cache, finding on database: CountryId ${countryId}...`,
        `${CityRepository.name} - findAllByCountryId`,
      );
      const res = await this._findByCondition('countryId = ?', [countryId]);
      if (!res) {
        this.logger.warn(
          `Cities not found: CountryId ${countryId}`,
          `${CityRepository.name} - findAllByCountryId`,
        );
        throw new NotFoundException();
      }
      cities = res;
      await this.cacheManager.set(`CITIES_BY_COUNTRY_${countryId}`, cities);
    }

    this.logger.log(
      `Cities found: ${JSON.stringify(cities)}`,
      `${CityRepository.name} - findAllByCountryId`,
    );
    return cities;
  }
}
