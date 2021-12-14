import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { DatabaseModule } from 'src/database/database.module';
import { RedisCacheModule } from 'src/cache/redis.module';
@Module({
  imports: [DatabaseModule, RedisCacheModule],
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfileRepository],
})
export class ProfilesModule {}
