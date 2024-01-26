import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleDetailService } from './schedule-detail.service';

describe('ScheduleDetailService', () => {
  let service: ScheduleDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleDetailService],
    }).compile();

    service = module.get<ScheduleDetailService>(ScheduleDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
