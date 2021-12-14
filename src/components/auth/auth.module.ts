import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserRepository } from 'src/repositories/user.repository';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { CityRepository } from 'src/repositories/city.repository';
import { AddressRepository } from 'src/repositories/address.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { RedisCacheModule } from 'src/cache/redis.module';

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
    ProfileRepository,
    CityRepository,
    AddressRepository,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
