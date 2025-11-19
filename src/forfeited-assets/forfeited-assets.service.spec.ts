import { Test, TestingModule } from '@nestjs/testing';
import { ForfeitedAssetsService } from './forfeited-assets.service';

describe('ForfeitedAssetsService', () => {
  let service: ForfeitedAssetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForfeitedAssetsService],
    }).compile();

    service = module.get<ForfeitedAssetsService>(ForfeitedAssetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
