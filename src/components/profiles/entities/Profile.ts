import { MinLength } from 'class-validator';
import { IProfile } from '../interfaces/IProfile';

export class Profile implements IProfile {
  id: number;
  userId: number;
  addressId: number;
  @MinLength(2, {
    message:
      'Username is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  name: string;

  constructor({ userId, addressId, id, name }: Partial<IProfile>) {
    this.id = id;
    this.userId = userId;
    this.addressId = addressId;
    this.name = name;
  }
}
