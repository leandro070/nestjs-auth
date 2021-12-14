import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  Response,
  TransformInterceptor,
} from 'src/interceptors/transform.interceptor';
import { CitiesService } from './cities.service';
import { ICity } from './interfaces/ICity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('byCountryId/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransformInterceptor)
  async findAllByCountryId(@Param() params): Promise<Response<ICity[]>> {
    const res = await this.citiesService.findAllByCountryId(params.id);
    return {
      message: 'Cities filtered.',
      statusCode: HttpStatus.OK,
      data: res,
    };
  }
}
