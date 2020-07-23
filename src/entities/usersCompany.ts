import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Company } from '@entities/company';
import { User } from '@entities/user';

@Entity('users_companies')
export class UsersCompany {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  public userId: string;

  @ManyToOne('User', 'usersCompanies',
    {
      onDelete: 'CASCADE',
    }
  )
  public user: User;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  public companyId: string;

  @ManyToOne('Company', 'usersCompanies',
    {
      onDelete: 'CASCADE',
    }
  )
  public company: Company;

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
