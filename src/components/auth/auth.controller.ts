import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  ParseIntPipe,
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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserRequest } from './dto/LoginUserRequest';
import { UserNotExistPipe } from 'src/pipes/user-not-exist.pipe';
import { CityExistPipe } from 'src/pipes/city-exist.pipe';
@Controller({
  path: 'auth',
  version: '2.1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

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
    @Body('username', UserNotExistPipe) _username,
    @Body('cityId', ParseIntPipe, CityExistPipe) _cityId,
    @Body() createUser: CreateUserRequest,
  ): Promise<Response<any>> {
    this.logger.log(
      `Start registering new user ${JSON.stringify(createUser)}`,
      `${AuthController.name} - registerUser`,
    );

    const user = await this.authService.create(createUser);

    this.logger.log(
      `The user '${createUser.username}' has been successfully created.`,
      `${AuthController.name} - registerUser`,
    );
    return {
      message: 'The user has been successfully created.',
      statusCode: HttpStatus.CREATED,
      data: user,
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
    this.logger.log(
      `Start logging the user ${JSON.stringify(dto)}`,
      `${AuthController.name} - loginUser`,
    );

    const result = await this.authService.createToken(req.user);

    this.logger.log(
      `The user '${dto.username}' has been successfully logged`,
      `${AuthController.name} - loginUser`,
    );
    return {
      message: 'The user has been successfully logged.',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
