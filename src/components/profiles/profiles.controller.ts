import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  Response,
  TransformInterceptor,
} from 'src/interceptors/transform.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserProfileRequest } from './dto/UserProfileResponse';
import { ProfilesService } from './profiles.service';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransformInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile by token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return profile found',
  })
  async getProfile(@Request() req): Promise<Response<UserProfileRequest>> {
    const result = await this.profilesService.getProfileByUserId(
      req.user.userId,
    );
    return {
      message: 'Profile found.',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
