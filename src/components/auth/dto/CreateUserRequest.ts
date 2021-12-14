import { User } from '../entities/User';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

type Mix = Partial<User>;

export class CreateUserRequest implements Mix {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  cityId: number;
}
