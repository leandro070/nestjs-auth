import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  Response,
  TransformInterceptor,
} from '@interceptors/transform.interceptor';
import { CountriesService } from './countries.service';
import { ICountry } from './interfaces/ICountry';

@Controller('countries')
export class CountriesController {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly logger: Logger,
  ) {}

  @ApiOperation({ summary: 'Get all countries' })
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransformInterceptor)
  async findAll(): Promise<Response<ICountry[]>> {
    this.logger.log(
      `Start finding all countries`,
      `${CountriesController.name} - findOneById`,
    );
    const res = await this.countriesService.findAll();
    this.logger.log(
      `End finding all countries`,
      `${CountriesController.name} - findOneById`,
    );
    return {
      message: 'All countries filtered.',
      statusCode: HttpStatus.OK,
      data: res,
    };
  }
}
