import { Venue } from 'src/modules/venue/entities/venue.entity';
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

enum PhotoType {
  Venue = 1,
  Coach = 2,
  Course = 3,
  CoachBatch = 4,
}

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 1000 })
  url: string;

  @Column({
    type: 'enum',
    enum: PhotoType,
    default: PhotoType.Venue,
  })
  type: PhotoType;

  // @ManyToOne(() => Coach, (coach) => coach.photos, { nullable: true })
  // @JoinColumn({ name: 'coach_id'})
  // coach: Coach;
  @Column()
  rid: number;

  // @ManyToOne(() => Venue, (venue) => venue.photos, { nullable: true })
  // @JoinColumn({ name: 'venue_id'})
  // venue: Venue;

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateTime: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
