import { Test, TestingModule } from '@nestjs/testing';
import { GoldPricesController } from './gold-prices.controller';
import { GoldPricesService } from './gold-prices.service';

describe('GoldPricesController', () => {
  let controller: GoldPricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoldPricesController],
      providers: [GoldPricesService],
    }).compile();

    controller = module.get<GoldPricesController>(GoldPricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
