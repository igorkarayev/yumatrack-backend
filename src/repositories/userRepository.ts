import { EntityRepository, Repository } from 'typeorm';
import { User } from '@entities/user';
import { Company } from '@entities/company';
import { EntityNotFoundError } from '@errors/custom/entityNotFoundError';
import { Role } from '@entities/role';
import { Token } from '@entities/token';
import { Roles, Statuses } from '@entities/enums';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findUserWithDetailsByUserIdOrFail(userId: string): Promise<User> {
    const user: User | undefined = await this.createQueryBuilder(User.name)
      .leftJoinAndSelect(`${User.name}.companies`, Company.name)
      .leftJoinAndSelect(`${User.name}.roles`, Role.name)
      .leftJoinAndSelect(`${User.name}.tokens`, Token.name)
      .where(`${User.name}.id = :userId`, { userId })
      .getOne();

    if (!user) {
      throw new EntityNotFoundError('User', { text: 'User is not found' });
    }

    return user;
  }

  public async findUserByUserIdOrFail(userId: string): Promise<User> {
    const user: User | undefined = await this.createQueryBuilder(User.name)
      .where(`${User.name}.id = :userId`, { userId })
      .getOne();

    if (!user) {
      throw new EntityNotFoundError('User', { text: 'User is not found' });
    }

    return user;
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return this.createQueryBuilder(User.name)
      .leftJoinAndSelect(`${User.name}.companies`, Company.name)
      .leftJoinAndSelect(`${User.name}.roles`, Role.name)
      .leftJoinAndSelect(`${User.name}.tokens`, Token.name)
      .where(`${User.name}.email = :email`, { email })
      .getOne();
  }

  public async findUserByEmailWithoutDetails(email: string): Promise<User | undefined> {
    return this.createQueryBuilder(User.name)
      .where(`${User.name}.email = :email`, { email })
      .getOne();
  }

  public async findUsersByCompanyId(companyId: string): Promise<User[]> {
    return this.createQueryBuilder(User.name)
      .leftJoinAndSelect(`${User.name}.roles`, Role.name)
      .innerJoin(`${User.name}.companies`, Company.name)
      .where(`${Company.name}.id = :companyId`, { companyId })
      .getMany();
  }

  public async findUserByCompanyIdAndRole(companyId: string, role: Roles): Promise<User> {
    const user: User | undefined = await this.createQueryBuilder(User.name)
      .leftJoinAndSelect(`${User.name}.roles`, Role.name)
      .innerJoin(`${User.name}.companies`, Company.name)
      .where(`${Company.name}.id = :companyId`, { companyId })
      .andWhere(`${Role.name}.role = '${role}'`)
      .getOne();

    if (!user) {
      throw new EntityNotFoundError('User', { text: 'User is not found' });
    }

    return user;
  }

  public async findCompanyAdminsByCompanyId(companyId: string): Promise<User[]> {
    return this.createQueryBuilder(User.name)
      .leftJoinAndSelect(`${User.name}.roles`, Role.name)
      .innerJoin(`${User.name}.companies`, Company.name)
      .where(`${Company.name}.id = :companyId`, { companyId })
      .andWhere(`${Role.name}.role = '${Roles.CADMIN}'`)
      .andWhere(`${User.name}.status = '${Statuses.ACTIVE}'`)
      .getMany();
  }

  public async addUser(entity: User): Promise<void> {
    const user = this.create(entity);
    await this.save(user);
  }

  public async findUsersByCompanyIdWithFPS(companyId: string, fps: any): Promise<[User[], number]> {
    const { pagination, sorting } = fps;

    const [users, count]: [User[], number] = await this.createQueryBuilder(User.name)
      .leftJoinAndSelect(`${User.name}.roles`, Role.name)
      .innerJoinAndSelect(`${User.name}.companies`, Company.name)
      .where(`${Company.name}.id = :companyId`, { companyId })
      .orderBy(sorting)
      .limit(pagination.limit)
      .offset(pagination.offset)
      .getManyAndCount();

    return [users, count];
  }
}
