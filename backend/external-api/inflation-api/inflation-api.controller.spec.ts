import { Test, TestingModule } from '@nestjs/testing';
import { InflationApiController } from './inflation-api.controller';
import { InflationApiService } from './inflation-api.service';

describe('InflationApiController', () => {
  let controller: InflationApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InflationApiController],
      providers: [
        {
          provide: InflationApiService,
          useValue: {
            getCPI: jest.fn(),
            getInflationRate: jest.fn(),
            getCurrentInflation: jest.fn(),
            getInflationByYear: jest.fn(),
            getAverageInflation: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InflationApiController>(InflationApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
