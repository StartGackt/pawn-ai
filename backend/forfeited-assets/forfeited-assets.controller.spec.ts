import { Test, TestingModule } from '@nestjs/testing';
import { ForfeitedAssetsController } from './forfeited-assets.controller';
import { ForfeitedAssetsService } from './forfeited-assets.service';

describe('ForfeitedAssetsController', () => {
  let controller: ForfeitedAssetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForfeitedAssetsController],
      providers: [ForfeitedAssetsService],
    }).compile();

    controller = module.get<ForfeitedAssetsController>(ForfeitedAssetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
