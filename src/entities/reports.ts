import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '@entities/user';

@Entity('reports')
export class Reports {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  public description: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  public date: Date;

  @Column({
    type: 'int',
    nullable: true,
  })
  public time: number;

  @Column({
    type: 'uuid',
  })
  public userId: string;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  public isPaid: string;

  @Column({
    type: 'timestamp',
    default: () => 'now()',
  })
  public createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'now()',
  })
  public updatedAt: Date;

  @ManyToOne('User', 'reports', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  public user: User;
}
