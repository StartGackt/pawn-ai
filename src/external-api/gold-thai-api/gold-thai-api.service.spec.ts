import { Test, TestingModule } from '@nestjs/testing';
import { GoldThaiApiService } from './gold-thai-api.service';

describe('GoldThaiApiService', () => {
  let service: GoldThaiApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoldThaiApiService],
    }).compile();

    service = module.get<GoldThaiApiService>(GoldThaiApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
