import { Test, TestingModule } from '@nestjs/testing';
import { GainttService } from './gaintt.service';

describe('GainttService', () => {
  let service: GainttService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GainttService],
    }).compile();

    service = module.get<GainttService>(GainttService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
