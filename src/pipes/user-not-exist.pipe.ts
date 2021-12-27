import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { AuthService } from 'src/components/auth/auth.service';

@Injectable()
export class UserNotExistPipe implements PipeTransform {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  async transform(username: string, metadata: ArgumentMetadata) {
    this.logger.log(
      `Start validating that there isn't user with username '${username}'`,
      UserNotExistPipe.name,
    );
    const user = await this.authService.findUserByUsername(username);
    if (user) {
      this.logger.log(
        `Username '${username}' already exist`,
        UserNotExistPipe.name,
      );
      throw new HttpException(
        `Username '${username}' already exist`,
        HttpStatus.CONFLICT,
      );
    }
    this.logger.log(
      `Username '${username}' is available`,
      UserNotExistPipe.name,
    );
    return username;
  }
}
