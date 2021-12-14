import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './components/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ProfilesModule } from './components/profiles/profiles.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { RedisCacheModule } from './cache/redis.module';
import { CountriesModule } from './components/countries/countries.module';
import { CitiesModule } from './components/cities/cities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    DatabaseModule,
    ProfilesModule,
    RedisCacheModule,
    CountriesModule,
    CitiesModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  exports: [],
})
export class AppModule {}
