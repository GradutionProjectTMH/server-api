import { Test, TestingModule } from '@nestjs/testing';
import { ganttService } from './gantt.service';

describe('ganttService', () => {
  let service: ganttService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ganttService],
    }).compile();

    service = module.get<ganttService>(ganttService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
