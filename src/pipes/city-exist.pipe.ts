import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CitiesService } from 'src/components/cities/cities.service';

@Injectable()
export class CityExistPipe implements PipeTransform {
  constructor(private readonly citiesService: CitiesService) {}

  async transform(cityId: any, metadata: ArgumentMetadata) {
    const city = await this.citiesService.findOneById(cityId);
    if (!city) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }
    return cityId;
  }
}
