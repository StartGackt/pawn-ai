import { Test, TestingModule } from '@nestjs/testing';
import { PawnsController } from './pawns.controller';
import { PawnsService } from './pawns.service';

describe('PawnsController', () => {
  let controller: PawnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PawnsController],
      providers: [PawnsService],
    }).compile();

    controller = module.get<PawnsController>(PawnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
