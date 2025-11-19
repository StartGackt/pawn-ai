import { Test, TestingModule } from '@nestjs/testing';
import { GoldPricesService } from './gold-prices.service';

describe('GoldPricesService', () => {
  let service: GoldPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoldPricesService],
    }).compile();

    service = module.get<GoldPricesService>(GoldPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
