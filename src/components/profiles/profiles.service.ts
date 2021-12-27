import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { UserProfileRequest } from './dto/UserProfileResponse';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly logger: Logger,
  ) {}

  async getProfileByUserId(userId: number): Promise<UserProfileRequest> {
    if (!userId) {
      this.logger.warn(`UserId not found`, `${ProfilesService.name} - findAll`);
      throw new HttpException('UserId not found', HttpStatus.NOT_FOUND);
    }
    this.logger.log(
      `Finding profile.: UserId ${userId}`,
      `${ProfilesService.name} - getProfileByUserId`,
    );
    const profiles = await this.profileRepository.getProfileByUserId(userId);
    if (!profiles[0]) {
      this.logger.warn(
        `Profile not found`,
        `${ProfilesService.name} - getProfileByUserId`,
      );
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    this.logger.log(
      `Profile found: UserId ${userId}`,
      `${ProfilesService.name} - getProfileByUserId`,
    );
    return {
      id: profiles[0].id,
      name: profiles[0].name,
      address: {
        street: profiles[0].street,
        city: profiles[0].city,
        country: profiles[0].country,
      },
    };
  }
}
