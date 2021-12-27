import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '@database/database.module';
import { UserRepository } from '@repositories/user.repository';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { CityRepository } from '@repositories/city.repository';
import { RedisCacheModule } from '@cache/redis.module';
import { UserNotExistPipe } from '@pipes/user-not-exist.pipe';
import { CityExistPipe } from '@pipes/city-exist.pipe';
import { CitiesService } from '../cities/cities.service';

@Module({
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
    UserRepository,
    CityRepository,
    LocalStrategy,
    JwtStrategy,
    UserNotExistPipe,
    CityExistPipe,
    Logger,
    CitiesService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
