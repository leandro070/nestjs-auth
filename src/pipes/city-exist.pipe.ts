import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { CitiesService } from 'src/components/cities/cities.service';

@Injectable()
export class CityExistPipe implements PipeTransform {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly logger: Logger,
  ) {}

  async transform(cityId: any, metadata: ArgumentMetadata) {
    this.logger.log(
      `Start validating if the city with id ${cityId} exists`,
      CityExistPipe.name,
    );
    const city = await this.citiesService.findOneById(cityId);
    if (!city) {
      this.logger.log(`City with id ${cityId} not exists`, CityExistPipe.name);
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }
    this.logger.log(
      `City with id ${cityId} is ${city.name}`,
      CityExistPipe.name,
    );

    return cityId;
  }
}
