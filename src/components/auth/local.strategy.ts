import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly logger: Logger,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    this.logger.log(
      `Validating user credential '${JSON.stringify({
        username,
        password,
      })}'`,
      `${LocalStrategy.name} - validate`,
    );
    if (!username || !password) {
      this.logger.log(
        `Username or password not provided`,
        `${LocalStrategy.name} - validate`,
      );
      throw new HttpException(
        'Username or password not provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.authService.validate({ username, password });
    if (!user) {
      this.logger.log(`User unauthorized`, `${LocalStrategy.name} - validate`);
      throw new HttpException('User unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
