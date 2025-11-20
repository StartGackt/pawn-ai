import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BotApiService } from './bot-api/bot-api.service';
import { BotApiController } from './bot-api/bot-api.controller';
import { LoanRateApiService } from './loan-rate-api/loan-rate-api.service';
import { LoanRateApiController } from './loan-rate-api/loan-rate-api.controller';
import { HolidayApiService } from './holiday-api/holiday-api.service';
import { HolidayApiController } from './holiday-api/holiday-api.controller';
import { PolicyRateApiService } from './policy-rate-api/policy-rate-api.service';
import { PolicyRateApiController } from './policy-rate-api/policy-rate-api.controller';
import { InflationApiService } from './inflation-api/inflation-api.service';
import { InflationApiController } from './inflation-api/inflation-api.controller';
import { GoldThaiApiService } from './gold-thai-api/gold-thai-api.service';
import { GoldThaiApiController } from './gold-thai-api/gold-thai-api.controller';
import { GoldGlobalApiService } from './gold-global-api/gold-global-api.service';
import { GoldGlobalApiController } from './gold-global-api/gold-global-api.controller';
import { AlphaVantageApiService } from './alpha-vantage-api/alpha-vantage-api.service';
import { AlphaVantageApiController } from './alpha-vantage-api/alpha-vantage-api.controller';
import { WorldBankApiService } from './world-bank-api/world-bank-api.service';
import { WorldBankApiController } from './world-bank-api/world-bank-api.controller';

@Module({
  imports: [HttpModule],
  controllers: [
    BotApiController,
    LoanRateApiController,
    HolidayApiController,
    PolicyRateApiController,
    InflationApiController,
    GoldThaiApiController,
    GoldGlobalApiController,
    AlphaVantageApiController,
    WorldBankApiController,
  ],
  providers: [
    BotApiService,
    LoanRateApiService,
    HolidayApiService,
    PolicyRateApiService,
    InflationApiService,
    GoldThaiApiService,
    GoldGlobalApiService,
    AlphaVantageApiService,
    WorldBankApiService,
  ],
  exports: [
    BotApiService,
    LoanRateApiService,
    HolidayApiService,
    PolicyRateApiService,
    InflationApiService,
    GoldThaiApiService,
    GoldGlobalApiService,
    AlphaVantageApiService,
    WorldBankApiService,
  ],
})
export class ExternalApiModule {}
