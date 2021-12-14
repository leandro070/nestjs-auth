import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from '../../../src/components/countries/countries.controller';
import { CountriesService } from '../../../src/components/countries/countries.service';

describe('CountriesController', () => {
  let controller: CountriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [CountriesService],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
