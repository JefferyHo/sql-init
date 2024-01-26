import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column()
  level: number;

  @Column()
  capacity: number;

  @Column()
  duration: number;

  @Column({ length: 1000, nullable: true })
  desc: string;

  @Column({ length: 100 })
  cover: string;

  @Column('simple-enum', {
    enum: [0, 1, 2],
    default: 0,
  })
  type: number;

  // @ManyToOne(() => Coach, (coach) => coach.courses, { nullable: true })
  // coach: Coach;

  // @ManyToOne(() => Venue, (venue) => venue.courses, { cascade: true })
  // @JoinColumn({ name: 'venueId' })
  // venue: Venue;

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateTime: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', select: false })
  deletedAt: Date;
}
