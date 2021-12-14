import { CacheModule, Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { ClientOpts as RedisClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    DatabaseModule,
    CacheModule.registerAsync<RedisClientOpts>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: configService.get('CACHE_TTL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfileRepository],
})
export class ProfilesModule {}
