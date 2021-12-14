import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  Response,
  TransformInterceptor,
} from 'src/interceptors/transform.interceptor';
import { AuthService } from './auth.service';
import { CreateUserRequest } from './dto/CreateUserRequest';
import { LoginUserReponse } from './dto/LoginUserResponse';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransformInterceptor)
  async loginUser(@Request() req): Promise<Response<LoginUserReponse>> {
    const result = await this.authService.login(req.user);

    return {
      message: 'The user has been successfully logged.',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
