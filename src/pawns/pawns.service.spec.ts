import { Test, TestingModule } from '@nestjs/testing';
import { PawnsService } from './pawns.service';

describe('PawnsService', () => {
  let service: PawnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PawnsService],
    }).compile();

    service = module.get<PawnsService>(PawnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
