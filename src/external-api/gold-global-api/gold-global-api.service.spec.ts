import { Test, TestingModule } from '@nestjs/testing';
import { GoldGlobalApiService } from './gold-global-api.service';

describe('GoldGlobalApiService', () => {
  let service: GoldGlobalApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoldGlobalApiService],
    }).compile();

    service = module.get<GoldGlobalApiService>(GoldGlobalApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
