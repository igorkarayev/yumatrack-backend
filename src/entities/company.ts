import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '@entities/user';
import { Permission } from '@entities/permission';
import { CompanyStatuses } from '@entities/enums';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public name: string;

  @Column({
    type: 'enum',
    enum: CompanyStatuses,
    default: CompanyStatuses.ACTIVE,
    nullable: true,
  })
  public status: CompanyStatuses;

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

  @ManyToMany('User', 'companies')
  @JoinTable({
    name: 'users_companies',
    joinColumn: {
      name: 'company_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
  })
  public users: User[];

  @ManyToMany('Permission', 'companies')
  public permissions: Permission[];
}
