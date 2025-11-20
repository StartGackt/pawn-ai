import { Module } from '@nestjs/common';
import { GoldPricesService } from './gold-prices.service';
import { GoldPricesController } from './gold-prices.controller';

@Module({
  controllers: [GoldPricesController],
  providers: [GoldPricesService],
})
export class GoldPricesModule {}
