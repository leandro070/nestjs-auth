import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from '../../../src/components/cities/cities.controller';
import { CitiesService } from '../../../src/components/cities/cities.service';

describe('CitiesController', () => {
  let controller: CitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [CitiesService],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
