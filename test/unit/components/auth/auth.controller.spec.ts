import { HttpStatus, Logger } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisCacheModule } from '@cache/redis.module';
import { CreateUserRequest } from '@components/auth/dto/CreateUserRequest';
import { IUser } from '@components/auth/interfaces/IUser';
import { JwtStrategy } from '@components/auth/jwt.strategy';
import { LocalStrategy } from '@components/auth/local.strategy';
import { CitiesService } from '@components/cities/cities.service';
import { DatabaseModule } from '@database/database.module';
import { CityExistPipe } from '@pipes/city-exist.pipe';
import { UserNotExistPipe } from '@pipes/user-not-exist.pipe';
import { CityRepository } from '@repositories/city.repository';
import { UserRepository } from '@repositories/user.repository';
import { AuthController } from '@components/auth/auth.controller';
import { AuthService } from '@components/auth/auth.service';
import { jwtConstants } from '@test/common/mocks/jwtConstants';
import { LoginUserRequest } from '@components/auth/dto/LoginUserRequest';

describe('tests for AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1h' },
        }),
        RedisCacheModule,
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        Logger,
        UserRepository,
        CityRepository,
        LocalStrategy,
        {
          provide: JwtStrategy,
          useValue: {
            sign: () => '',
          },
        },
        UserNotExistPipe,
        CityExistPipe,
        CitiesService,
      ],
    }).compile();

    controller = await module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('[registerUser] should register a user', async () => {
    const userStub: Omit<IUser, 'password'> = {
      id: 1,
      username: 'test',
    };
    const mockCreateFunction = jest
      .spyOn(AuthService.prototype, 'create')
      .mockResolvedValue(userStub);

    const data: CreateUserRequest = {
      username: 'test',
      password: 'testpassword',
      name: 'Test',
      address: 'Address test',
      cityId: 220,
    };

    const result = await controller.registerUser(
      data.username,
      data.cityId,
      data,
    );

    const resultMock = {
      data: userStub,
      message: 'The user has been successfully created.',
      statusCode: HttpStatus.CREATED,
    };

    expect(result).toBeTruthy();
    expect(result).toEqual(resultMock);
    expect(mockCreateFunction).toHaveBeenCalled();
    expect(mockCreateFunction).toHaveBeenCalledTimes(1);
  });

  it('[loginUser] should login a user succesfully', async () => {
    const tokenStub = {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    };
    const mockCreateTokenFunction = jest
      .spyOn(AuthService.prototype, 'createToken')
      .mockResolvedValue(tokenStub);

    const req = {
      user: {
        id: 1,
        username: 'test',
        password: 'testpasswordhashed',
      },
    };

    const data: LoginUserRequest = {
      username: 'test',
      password: 'testpassword',
    };

    const result = await controller.loginUser(req, data);

    const resultMock = {
      data: tokenStub,
      message: 'The user has been successfully logged.',
      statusCode: HttpStatus.OK,
    };

    expect(result).toBeTruthy();
    expect(result).toEqual(resultMock);
    expect(mockCreateTokenFunction).toHaveBeenCalled();
    expect(mockCreateTokenFunction).toHaveBeenCalledTimes(1);
  });
});
