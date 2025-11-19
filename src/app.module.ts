import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';
import { PawnsModule } from './pawns/pawns.module';
import { CustomersModule } from './customers/customers.module';
import { GoldPricesModule } from './gold-prices/gold-prices.module';
import { ForfeitedAssetsModule } from './forfeited-assets/forfeited-assets.module';
import { MlModule } from './ml/ml.module';
import { LlmModule } from './llm/llm.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ExternalApiModule } from './external-api/external-api.module';
import { WebsocketModule } from './websocket/websocket.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    CommonModule,
    AuthModule,
    UsersModule,
    PawnsModule,
    CustomersModule,
    GoldPricesModule,
    ForfeitedAssetsModule,
    MlModule,
    LlmModule,
    AnalyticsModule,
    ExternalApiModule,
    WebsocketModule,
  ],
})
export class AppModule {}