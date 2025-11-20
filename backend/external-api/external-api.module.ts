import { Module } from '@nestjs/common';
import { BotApiService } from './bot-api/bot-api.service';
import { GoldThaiApiService } from './gold-thai-api/gold-thai-api.service';
import { GoldGlobalApiService } from './gold-global-api/gold-global-api.service';
import { HolidayApiService } from './holiday-api/holiday-api.service';

@Module({
  providers: [BotApiService, GoldThaiApiService, GoldGlobalApiService, HolidayApiService]
})
export class ExternalApiModule {}
