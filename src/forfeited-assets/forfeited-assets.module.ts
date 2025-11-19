import { Module } from '@nestjs/common';
import { ForfeitedAssetsService } from './forfeited-assets.service';
import { ForfeitedAssetsController } from './forfeited-assets.controller';

@Module({
  controllers: [ForfeitedAssetsController],
  providers: [ForfeitedAssetsService],
})
export class ForfeitedAssetsModule {}
