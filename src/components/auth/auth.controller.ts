import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import {
  Response,
  TransformInterceptor,
} from 'src/interceptors/transform.interceptor';
import { AuthService } from './auth.service';
import { CreateUserRequest } from './dto/CreateUserRequest';
import { LoginUserReponse } from './dto/LoginUserResponse';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserRequest } from './dto/LoginUserRequest';

@Controller({
  path: 'auth',
  version: '2.1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User register endpoint' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exist',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'City not found',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TransformInterceptor)
  async registerUser(
    @Body() createUser: CreateUserRequest,
  ): Promise<Response<any>> {
    await this.authService.create(createUser);

    return {
      message: 'The user has been successfully created.',
      statusCode: HttpStatus.CREATED,
      data: null,
    };
  }

  @ApiOperation({ summary: 'User login endpoint' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Invalid Credential',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransformInterceptor)
  async loginUser(
    @Request() req,
    @Body() dto: LoginUserRequest,
  ): Promise<Response<LoginUserReponse>> {
    const result = await this.authService.login(req.user);

    return {
      message: 'The user has been successfully logged.',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
