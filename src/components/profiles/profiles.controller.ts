import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  Response,
  TransformInterceptor,
} from '@interceptors/transform.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserProfileRequest } from './dto/UserProfileResponse';
import { ProfilesService } from './profiles.service';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly logger: Logger,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile by token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return profile found',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransformInterceptor)
  async getProfile(@Request() req): Promise<Response<UserProfileRequest>> {
    this.logger.log(
      `Start finding user profile: UserId ${req.user.userId}`,
      `${ProfilesController.name} - getProfile`,
    );

    const result = await this.profilesService.getProfileByUserId(
      req.user.userId,
    );

    this.logger.log(
      `Profile found: UserId ${req.user.userId}`,
      `${ProfilesController.name} - getProfile`,
    );
    return {
      message: 'Profile found.',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
