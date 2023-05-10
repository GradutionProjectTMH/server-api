import { Test, TestingModule } from '@nestjs/testing';
import { GainttController } from './gaintt.controller';
import { GainttService } from './gaintt.service';

describe('GainttController', () => {
  let controller: GainttController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GainttController],
      providers: [GainttService],
    }).compile();

    controller = module.get<GainttController>(GainttController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
