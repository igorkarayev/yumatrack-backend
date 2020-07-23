import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@entities/user';
import { Role } from '@entities/role';

@Entity('users_roles')
export class UsersRole {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  public userId: string;

  @ManyToOne('User', 'usersRoles',
    {
      onDelete: 'CASCADE',
    }
  )
  public user: User;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  public roleId: string;

  @ManyToOne('Role', 'usersRoles',
    {
      onDelete: 'CASCADE',
    }
  )
  public role: Role;

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
}
