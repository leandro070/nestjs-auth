import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserRequest } from './dto/CreateUserRequest';
import { LoginUserRequest } from './dto/LoginUserRequest';
import { User } from './entities/User';
import { IUser } from './interfaces/IUser';
import { JwtService } from '@nestjs/jwt';
import { CityRepository } from 'src/repositories/city.repository';
import { AddressRepository } from 'src/repositories/address.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly cityRepository: CityRepository,
    private readonly addressRepository: AddressRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async create({
    username,
    password,
    name,
    address,
    cityId,
  }: CreateUserRequest) {
    const usersFound = await this.userRepository.findByUsername(username);
    if (usersFound[0]) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }

    const citiesFound = await this.cityRepository.findOneById(cityId);

    if (!citiesFound || !citiesFound[0]) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }

    const user = new User({ password, username });
    await user.encryptPassword();

    const userId: number = await this.userRepository.create(user);
    user.id = userId;
    delete user.password;

    const addressId: number = await this.addressRepository.create({
      cityId,
      street: address,
    });

    const profileId: number = await this.profileRepository.create({
      addressId,
      name,
      userId,
    });

    return;
  }

  async validate({
    username,
    password,
  }: LoginUserRequest): Promise<Omit<IUser, 'password'>> {
    const firstElementFound: IUser = (
      await this.userRepository.findByUsername(username)
    )[0];

    if (!firstElementFound) {
      throw new HttpException(
        'Invalid Credential',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = new User({ ...firstElementFound });
    const isSamePassword: boolean = await user.compareWithMyPassword(password);

    if (!isSamePassword) {
      throw new HttpException(
        'Invalid Credential',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return { username: firstElementFound.username, id: firstElementFound.id };
  }

  async login(user: Omit<IUser, 'password'>) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
