import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { ScheduleDetail } from "./schedule-detail.entity";

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'venue_id' })
  venueId: number;

  // @OneToMany(() => ScheduleDetail, (dtl) => dtl.schedule)
  // detail: ScheduleDetail;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: '' })
  desc: string;

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateTime: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', select: false })
  deletedAt: Date;
}
