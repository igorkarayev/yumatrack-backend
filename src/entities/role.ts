import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '@entities/user';
import { Permission } from '@entities/permission';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public role: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public title: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true
  })
  public active: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'now()',
  })
  public createdAt: Date;

  @ManyToMany('User', 'roles')
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
  })
  public users: User[];

  @ManyToMany('Permission', 'roles')
  public permissions: Permission[];
}
