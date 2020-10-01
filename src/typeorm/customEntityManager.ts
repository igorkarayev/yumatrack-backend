// tslint:disable-next-line:no-import-side-effect
import "reflect-metadata";
import { EntityManager } from "typeorm";
import { Connection } from "typeorm/connection/Connection";
import { connector } from "@database/connector";
import { UserRepository } from "@repositories/userRepository";
import { RoleRepository } from "@repositories/roleRepository";
import { CompanyRepository } from "@repositories/companyRepository";
import { PermissionRepository } from "@repositories/permissionRepository";
import { UsersRoleRepository } from "@repositories/usersRoleRepository";
import { TokenRepository } from "@repositories/tokenRepository";
import { ReportsRepository } from "@repositories/reportRepository";

export class CustomEntityManager extends EntityManager {
  private static instance: CustomEntityManager;

  private constructor(connection: Connection) {
    super(connection);
  }

  public static async getEntityManager() {
    if (!CustomEntityManager.instance) {
      const connection: Connection = await connector();

      CustomEntityManager.instance = new CustomEntityManager(connection);
    }

    return CustomEntityManager.instance;
  }

  public getUserRepository(): UserRepository {
    return this.getCustomRepository(UserRepository);
  }

  public getRoleRepository(): RoleRepository {
    return this.getCustomRepository(RoleRepository);
  }

  public getCompanyRepository(): CompanyRepository {
    return this.getCustomRepository(CompanyRepository);
  }

  public getPermissionRepository(): PermissionRepository {
    return this.getCustomRepository(PermissionRepository);
  }

  public getUsersRoleRepository(): UsersRoleRepository {
    return this.getCustomRepository(UsersRoleRepository);
  }

  public getTokenRepository(): TokenRepository {
    return this.getCustomRepository(TokenRepository);
  }

  public getReportRepository(): ReportsRepository {
    return this.getCustomRepository(ReportsRepository);
  }
}
