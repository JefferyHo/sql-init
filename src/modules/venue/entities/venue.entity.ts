import { Course } from 'src/modules/course/entities/course.entity';
import { Photo } from 'src/modules/photo/entities/photo.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 100 })
  cover: string;

  @Column({ length: 100 })
  address: string;

  // @OneToMany(() => Course, (course) => course.venue, { nullable: true })
  // courses: Course[];

  // @OneToMany(() => Photo, (photo) => photo.venue, { nullable: true })
  // photos: Photo[];

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateTime: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', select: false })
  deletedAt: Date;
}
