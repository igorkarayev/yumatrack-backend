
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, Index, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity('password_tokens')
export class PasswordToken {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  @Index({ unique: true })
  public token: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  @Index({ unique: true })
  public userId: string;

  @OneToOne(() => User)
  @JoinColumn()
  public user: User;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  public expiredAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'now()',
  })
  public createdAt: Date;
}