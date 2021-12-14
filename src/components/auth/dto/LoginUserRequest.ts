import { User } from '../entities/User';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserRequest implements Partial<User> {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
