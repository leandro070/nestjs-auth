import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { UserProfileRequest } from './dto/UserProfileResponse';

@Injectable()
export class ProfilesService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async getProfileByUserId(userId: number): Promise<UserProfileRequest> {
    if (!userId) {
      throw new Error('UserId not provided');
    }
    const profiles = await this.profileRepository.getProfileByUserId(userId);
    if (!profiles[0]) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

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
