import {Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToOne, JoinColumn} from 'typeorm';
import { User } from '@entities/user';
import { Role } from '@entities/role';
import { Company } from '@entities/company';
import {EntityPermission} from '@entities/entityPermission';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public description: string;

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

  @ManyToMany('User', 'permissions')
  public users: User[];

  @ManyToMany('Role', 'permissions')
  public roles: Role[];

  @ManyToMany('Company', 'permissions')
  public companies: Company[];

  @OneToOne('EntityPermission')
  @JoinColumn({
    name: 'permission_id',
    referencedColumnName: 'id',
  })
  public ep: EntityPermission;
}
