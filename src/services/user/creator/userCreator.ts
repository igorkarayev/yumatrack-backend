import { User } from '@entities/user';
import { Statuses } from '@entities/enums';
import { UserCreateRequest } from '@validation/user/userCreateRequest';
import * as generator from 'generate-password';
import { AuthService } from '@services/auth';
import { UsersCompany } from '@entities/usersCompany';
import { UsersRole } from '@entities/usersRole';

export class UserCreator {
  private roleId: string;
  private companyId: string;

  constructor(private readonly newUser: UserCreateRequest) {
    this.companyId = AuthService.getCompanyId();
  }

  private static generatePassword(): string {
    return generator.generate({ numbers: true });
  }

  public setRole(roleId: string) {
    this.roleId = roleId;
  }

  public create(companyId?: string | undefined): [User, UsersCompany, UsersRole] {
    const user = new User();

    user.fullName = this.newUser.fullName;
    user.phone = this.newUser.phone;
    user.email = this.newUser.email;
    user.status = this.newUser.status || Statuses.INVITED;
    user.password = this.newUser.password || UserCreator.generatePassword();

    const usersCompany = this.createUsersCompany(user, companyId);
    const usersRole = this.createUsersRole(user);

    return [user, usersCompany, usersRole];
  }

  private createUsersCompany(user: User, companyId?: string | undefined): UsersCompany {
    const usersCompany = new UsersCompany();

    usersCompany.user = user;
    usersCompany.companyId = companyId || this.companyId;

    return usersCompany;
  }

  private createUsersRole(user: User): UsersRole {
    const usersRole = new UsersRole();

    usersRole.user = user;
    usersRole.roleId = this.roleId;

    return usersRole;
  }
}
