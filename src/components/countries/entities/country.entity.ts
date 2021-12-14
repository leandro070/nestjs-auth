import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ICountry } from '../interfaces/ICountry';

export class Country implements ICountry {
  @IsNumber()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
}
