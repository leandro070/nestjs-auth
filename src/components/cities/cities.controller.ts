import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  Response,
  TransformInterceptor,
} from 'src/interceptors/transform.interceptor';
import { CitiesService } from './cities.service';
import { ICity } from './interfaces/ICity';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('cities')
export class CitiesController {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly logger: Logger,
  ) {}

  @ApiOperation({ summary: 'Get the cities of a country' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'a number for country id',
  })
  @Get('byCountryId/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransformInterceptor)
  async findAllByCountryId(@Param() params): Promise<Response<ICity[]>> {
    this.logger.log(
      `Start finding all cities by countryId ${params.id}`,
      `${CitiesController.name} - findAllByCountryId`,
    );
    const res = await this.citiesService.findAllByCountryId(params.id);
    this.logger.log(
      `End finding all cities by countryId ${params.id}`,
      `${CitiesController.name} - findAllByCountryId`,
    );
    return {
      message: 'Cities filtered.',
      statusCode: HttpStatus.OK,
      data: res,
    };
  }
}
