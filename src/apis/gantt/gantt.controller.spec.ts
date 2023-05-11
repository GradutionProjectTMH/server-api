import { Test, TestingModule } from '@nestjs/testing';
import { ganttController } from './gantt.controller';
import { ganttService } from './gantt.service';

describe('ganttController', () => {
  let controller: ganttController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ganttController],
      providers: [ganttService],
    }).compile();

    controller = module.get<ganttController>(ganttController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
