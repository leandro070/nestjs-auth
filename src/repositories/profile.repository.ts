import { Injectable } from '@nestjs/common';
import { IProfile } from 'src/components/profiles/interfaces/IProfile';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class ProfileRepository extends BaseAbstractRepository<IProfile> {
  public async create(profile: Omit<IProfile, 'id'>): Promise<number> {
    const res = await this.query('INSERT INTO Profiles SET ?', profile);
    return res.insertId as number;
  }
  public async findByCondition(
    filterCondition: any,
    args: any[],
  ): Promise<IProfile[]> {
    throw new Error('Method not implemented.');
  }
  public findOneById(id: number): Promise<IProfile> {
    throw new Error('Method not implemented.');
  }
  public findAll(): Promise<IProfile[]> {
    throw new Error('Method not implemented.');
  }
  public remove(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  public async getProfileByUserId(userId: number): Promise<unknown> {
    const res = await this.query(
      `SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
      SELECT p.id, p.name, a.street, ci.name AS city, co.name AS country FROM Profiles AS p
      INNER JOIN Addresses a ON p.addressId = a.id 
      INNER JOIN Cities ci ON a.cityId = ci.id 
      INNER JOIN Countries co ON ci.countryId = co.id
      WHERE p.userId = ?;
      COMMIT ;`,
      [userId],
    );

    return res[1];
  }
}
