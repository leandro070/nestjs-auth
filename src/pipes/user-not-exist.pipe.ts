import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AuthService } from 'src/components/auth/auth.service';

@Injectable()
export class UserNotExistPipe implements PipeTransform {
  constructor(private readonly authService: AuthService) {}

  async transform(username: string, metadata: ArgumentMetadata) {
    const user = await this.authService.findUserByUsername(username);
    if (user) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    return username;
  }
}
