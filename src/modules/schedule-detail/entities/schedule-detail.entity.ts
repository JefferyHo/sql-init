import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ScheduleDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'schedule_id' })
  scheduleId: number;

  // @Column({ name: 'venue_id' })
  // venueId: number;

  @Column({ name: 'coach_id' })
  coachId: number;

  @Column({ name: 'course_id' })
  courseId: number;

  @Column({ name: 'time_start' })
  startTime: string;

  @Column({ name: 'time_end' })
  endTime: string;

  // @ManyToOne(() => Schedule, (schedule) => schedule.detail)
  // schedule: Schedule;

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateTime: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', select: false })
  deletedAt: Date;
}
