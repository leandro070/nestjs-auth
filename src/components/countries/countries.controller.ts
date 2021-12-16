import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  Response,
  TransformInterceptor,
} from 'src/interceptors/transform.interceptor';
import { CountriesService } from './countries.service';
import { ICountry } from './interfaces/ICountry';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiOperation({ summary: 'Get all countries' })
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransformInterceptor)
  async findAll(): Promise<Response<ICountry[]>> {
    const res = await this.countriesService.findAll();
    return {
      message: 'All countries filtered.',
      statusCode: HttpStatus.OK,
      data: res,
    };
  }
}
