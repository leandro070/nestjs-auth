import { MinLength } from 'class-validator';
import { hashPassword, comparePassword } from 'src/utils/hashing';
import { IUser } from '../interfaces/IUser';

export class User implements IUser {
  id: number;
  @MinLength(2, {
    message:
      'Username is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  username: string;
  @MinLength(8, {
    message:
      'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  password: string;
  constructor({ username, password, id }: Partial<IUser>) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  async encryptPassword() {
    if (this.password) {
      const hashedPassword = await hashPassword(this.password, 10);
      this.password = hashedPassword;
    }
  }

  async compareWithMyPassword(plainTextPassword: string): Promise<boolean> {
    if (this.password && plainTextPassword) {
      return await comparePassword(plainTextPassword, this.password);
    }
  }
}
