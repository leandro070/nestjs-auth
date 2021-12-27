import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserRequest } from './dto/CreateUserRequest';
import { LoginUserRequest } from './dto/LoginUserRequest';
import { User } from './entities/User';
import { IUser } from './interfaces/IUser';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async create({
    username,
    password,
    name,
    address,
    cityId,
  }: CreateUserRequest) {
    this.logger.log(
      `Start creating a new user '${username}'`,
      `${AuthService.name} - create`,
    );
    const user = new User({ password, username });
    await user.encryptPassword();

    const userId: number = await this.userRepository.createUserByTransaction(
      user,
      {
        cityId,
        street: address,
      },
      name,
    );
    user.id = userId;
    delete user.password;

    this.logger.log(
      `End creating a new user '${username}'`,
      `${AuthService.name} - create`,
    );
    return user;
  }

  async validate({
    username,
    password,
  }: LoginUserRequest): Promise<Omit<IUser, 'password'>> {
    this.logger.log(
      `Validating user credential '${username}'`,
      `${AuthService.name} - validate`,
    );
    const firstElementFound: IUser = (
      await this.userRepository.findByUsername(username)
    )[0];

    if (!firstElementFound) {
      this.logger.log(
        `Username not found '${username}'`,
        `${AuthService.name} - validate`,
      );
      throw new HttpException(
        'Invalid Credential',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = new User({ ...firstElementFound });
    const isSamePassword: boolean = await user.compareWithMyPassword(password);

    if (!isSamePassword) {
      this.logger.log(
        `Password invalid '${username}'`,
        `${AuthService.name} - validate`,
      );
      throw new HttpException(
        'Invalid Credential',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.logger.log(
      `User credential valid '${username}'`,
      `${AuthService.name} - validate`,
    );
    return { username: firstElementFound.username, id: firstElementFound.id };
  }

  async findUserByUsername(username: string) {
    this.logger.log(
      `Finding user by username '${username}'`,
      `${AuthService.name} - findUserByUsername`,
    );
    const users = await this.userRepository.findByUsername(username);
    this.logger.log(
      `User found '${username}'`,
      `${AuthService.name} - findUserByUsername`,
    );
    return users[0];
  }

  async createToken(user: Omit<IUser, 'password'>) {
    this.logger.log(
      `Creating user token '${user.username}'`,
      `${AuthService.name} - createToken`,
    );
    const payload = { username: user.username, sub: user.id };
    this.logger.log(`Token created`, `${AuthService.name} - createToken`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
