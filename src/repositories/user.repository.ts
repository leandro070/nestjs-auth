import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IAddress } from 'src/components/addresses/interfaces/IAddress';
import { IUser } from 'src/components/auth/interfaces/IUser';
import { IProfile } from 'src/components/profiles/interfaces/IProfile';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class UserRepository extends BaseAbstractRepository<IUser> {
  public async create(user: Omit<IUser, 'id'>): Promise<number> {
    const res = await this.query('INSERT INTO Users SET ?', user);
    return res.insertId as number;
  }
  protected async _findByCondition(
    filterCondition: any,
    args = [],
  ): Promise<IUser[]> {
    const res = await this.query(
      'SELECT username, id, password FROM Users WHERE ' + filterCondition,
      args,
    );

    return res;
  }
  public findOneById(id: number): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  public findAll(): Promise<IUser[]> {
    throw new Error('Method not implemented.');
  }
  public remove(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public async findByUsername(username: string) {
    const res = await this._findByCondition('username = ?', [username]);
    return res;
  }

  /**
   * createUserWithTransaction
   */
  public async createUserByTransaction(
    user: Omit<IUser, 'id'>,
    address: Omit<IAddress, 'id'>,
    name: string,
  ) {
    this.logger.log(
      `Saving a new user on database`,
      `${UserRepository.name} - createUserByTransaction`,
    );
    const conn = await this.db.getConnection();
    await conn.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    await conn.beginTransaction();
    this.logger.log(
      `Start transaction`,
      `${UserRepository.name} - createUserByTransaction`,
    );
    try {
      this.logger.log(
        `Start creating user`,
        `${UserRepository.name} - createUserByTransaction`,
      );
      const queryUser = await conn.query('INSERT INTO Users SET ?', user);
      const userId = queryUser[0]['insertId'];
      this.logger.log(
        `User created`,
        `${UserRepository.name} - createUserByTransaction`,
      );

      this.logger.log(
        `Start creating address`,
        `${UserRepository.name} - createUserByTransaction`,
      );
      const queryAddress = await conn.query(
        'INSERT INTO Addresses SET ?',
        address,
      );
      const addressId = queryAddress[0]['insertId'];
      this.logger.log(
        `Address created`,
        `${UserRepository.name} - createUserByTransaction`,
      );

      this.logger.log(
        `Start creating profile`,
        `${UserRepository.name} - createUserByTransaction`,
      );
      const profile: Omit<IProfile, 'id'> = {
        addressId,
        userId,
        name,
      };

      await conn.query('INSERT INTO Profiles SET ?', profile);
      this.logger.log(
        `Profile created`,
        `${UserRepository.name} - createUserByTransaction`,
      );

      await conn.commit();
      this.logger.log(
        `End transaction`,
        `${UserRepository.name} - createUserByTransaction`,
      );
      return userId;
    } catch (err) {
      this.logger.warn(
        `An error has ocurred. Starting Rollback. Stack: ${err}`,
        `${UserRepository.name} - createUserByTransaction`,
      );
      await conn.rollback();
      this.logger.log(
        `Rollback finished.`,
        `${UserRepository.name} - createUserByTransaction`,
      );
      // 500 is returned because HTTP does not consider a particular code for DB errors.
      // and because it shouldn't happen if everything is correctly validated before executing the transaction
      throw new HttpException(
        'Transaction failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await conn.release();
    }
  }
}
