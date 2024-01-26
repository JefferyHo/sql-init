import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleDetailController } from './schedule-detail.controller';
import { ScheduleDetailService } from './schedule-detail.service';

describe('ScheduleDetailController', () => {
  let controller: ScheduleDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleDetailController],
      providers: [ScheduleDetailService],
    }).compile();

    controller = module.get<ScheduleDetailController>(ScheduleDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
