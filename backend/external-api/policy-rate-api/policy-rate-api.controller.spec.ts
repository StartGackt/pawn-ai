import { Test, TestingModule } from '@nestjs/testing';
import { PolicyRateApiController } from './policy-rate-api.controller';
import { PolicyRateApiService } from './policy-rate-api.service';

describe('PolicyRateApiController', () => {
  let controller: PolicyRateApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolicyRateApiController],
      providers: [
        {
          provide: PolicyRateApiService,
          useValue: {
            getPolicyRate: jest.fn(),
            getCurrentPolicyRate: jest.fn(),
            getPolicyRateByYear: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PolicyRateApiController>(PolicyRateApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
