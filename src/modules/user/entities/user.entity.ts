import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { encrypt } from '../../../utils/encrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  name: string;

  @Column({ length: 30, nullable: true })
  nickname: string;

  @Column('simple-enum', {
    enum: [0, 1],
    default: 0,
    comment: '0-男，1-女',
  })
  sex: number;

  @Column({ length: 100, nullable: true })
  avatar: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 1000, nullable: true })
  email: string;

  @Column({ length: 1000, nullable: true })
  desc: string;

  @Column({ name: 'venue_id' })
  venueId: number;

  // @OneToMany(() => Photo, (photo) => photo.coach, { nullable: true })
  // photos: Photo[];

  // @OneToMany(() => Course, (course) => course.coach, { nullable: true })
  // courses: Course[];

  @Column({ select: false, default: '123456' })
  password: string;

  @Column('simple-enum', {
    enum: [1, 2, 3, 4],
    default: 1,
    nullable: true,
    comment: '1-visitor, 2-user, 3-coach, 4-manager',
  })
  role: number;

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateTime: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', select: false })
  deletedAt: Date;

  // @BeforeInsert()
  // async encryptPwd() {
  //   this.password = await encrypt(this.password);
  // }
}
