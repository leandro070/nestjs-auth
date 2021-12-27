import { Logger, Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { ProfileRepository } from '@repositories/profile.repository';
import { DatabaseModule } from '@database/database.module';
import { RedisCacheModule } from '@cache/redis.module';
@Module({
  imports: [DatabaseModule, RedisCacheModule],
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfileRepository, Logger],
})
export class ProfilesModule {}
