import { Module } from '@nestjs/common';
import { PawnsService } from './pawns.service';
import { PawnsController } from './pawns.controller';

@Module({
  controllers: [PawnsController],
  providers: [PawnsService],
})
export class PawnsModule {}
