import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from 'typeorm';
import { encrypt } from '../../utils/encrypt';

@Entity({ name: 'user_old' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 30, nullable: true })
  nickname: string;

  @Column({ select: false, default: '123456' })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  email: string;

  @Column('simple-enum', {
    enum: [0, 1],
    default: 0,
  })
  sex: number;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 1000, nullable: true })
  desc: string;

  @Column('simple-enum', {
    enum: ['manager', 'user', 'visitor'],
    default: 'visitor',
    nullable: true,
  })
  role: string;

  @Column({ name: 'venue_id' })
  venueId: number;

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateTime: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;

  @BeforeInsert()
  async encryptPwd() {
    console.log(this);
    this.password = await encrypt(this.password);
  }
}
