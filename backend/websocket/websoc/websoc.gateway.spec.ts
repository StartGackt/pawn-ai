import { Test, TestingModule } from '@nestjs/testing';
import { WebsocGateway } from './websoc.gateway';

describe('WebsocGateway', () => {
  let gateway: WebsocGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocGateway],
    }).compile();

    gateway = module.get<WebsocGateway>(WebsocGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
