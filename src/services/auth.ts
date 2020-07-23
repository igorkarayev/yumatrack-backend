import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { config } from '@src/config';
import { logger } from '@services/logger';
import { session } from '@services/session';
import { User } from '@entities/user';
import { CustomEntityManager } from '@typeorm/customEntityManager';
import { UsersCompany } from '@entities/usersCompany';
import { UsersRole } from '@entities/usersRole';
import { Roles, Statuses, TokenType } from '@entities/enums';
import { PasswordChangeRequest } from '@validation/auth/passwordChangeRequest';
import { Company } from '@entities/company';
import { AuthorizationFailedError } from '@errors/custom/authorizationFailedError';
import { QueryFailedError } from '@errors/custom/queryFailedError';
import { Token } from '@entities/token';
import { Role } from '@entities/role';
import { Permission } from '@entities/permission';
import { EntityManager } from 'typeorm';
import { TokenNotValidError } from '@errors/custom/tokenNotValid';

export const makePasswordHash = (password: string): Promise<string> => {
  const saltRounds: number = 10;
  return new Promise((resolve, reject) => {
    if (!password) {
      return reject(new Error('No password'));
    }

    bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
      if (err) {
        return reject(err);
      }
      return resolve(hash);
    });
  });
};

export interface JwtPayload {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: Statuses;
  roles: Role[];
  company: Company | null;
}

export interface TokenResponse {
  refreshToken: string;
  accessToken: string;
  expired: number;
}

export interface TFAResposne {
  url: string;
  code: string;
}

export class AuthService {
  public static setToken(token: string | null): void {
    session.set('token', token);
  }

  public static getToken(): string {
    const token = session.get('token');
    if (!token) {
      throw new Error('Token is not set in session');
    }
    return token;
  }

  public static setUserId(userId: string): void {
    session.set('userId', userId);
  }

  public static getUserId(): string {
    const userId = session.get('userId');
    if (!userId) {
      throw new Error('User ID is not set in session');
    }
    return userId;
  }

  public static haveUserId(): boolean {
    const userId = session.get('userId');
    return !!userId;
  }

  public static setCompanyId(companyId: string): void {
    session.set('companyId', companyId);
  }

  public static getCompanyId(): string {
    return session.get('companyId');
  }

  public static setUser(user: User | undefined): void {
    session.set('currentUser', user);
  }

  public static getUser(): User {
    const user = session.get('currentUser');
    if (!user) {
      throw new Error('User is not set in session');
    }
    return user;
  }

  public static setUserRoles(roles: Role[] | undefined): void {
    session.set('userRoles', roles);
  }

  public static getUserRoles(): Role[] | undefined {
    return session.get('userRoles');
  }

  public static setPermissions(permissions: Permission[] | undefined): void {
    session.set('userPermissions', permissions);
  }

  public static getPermissions(): Permission[] | undefined {
    return session.get('userPermissions');
  }

  public static haveRole(role: Roles): boolean {
    return !!this.getUserRoles()?.find(r => r.role === role);
  }

  public static isSuperAdmin(): boolean {
    return this.haveRole(Roles.SADMIN);
  }

  public static setUserStatus(status: Statuses): void {
    session.set('userStatus', status);
  }

  public static getUserStatus(): Statuses | undefined {
    return session.get('userStatus');
  }

  public static async login(email: string, password: string): Promise<any> {
    const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
    const userRepository = entityManager.getUserRepository();
    const user: User | undefined = await userRepository.findUserByEmail(email);

    try {
      if (!user) {
        throw new Error('Incorrect login or password');
      } else {
        const correctPassword = await this.compare(password, user.password);
        if (!correctPassword) {
          throw new Error('Incorrect login or password');
        }
      }
      logger.info('Login successfully: ', { email: user.email });

      const refreshTokenString = this.generateJWT(user, config.JWT.EXPIRES_IN_REFRESH);
      const refreshToken: Token = this.createToken(TokenType.REFRESH, user, refreshTokenString);
      const accessTokenString = this.generateJWT(user, config.JWT.EXPIRES_IN);
      const accessToken: Token = this.createToken(TokenType.ACCESS, user, accessTokenString);
      accessToken.refreshToken = refreshToken;

      await entityManager.transaction(async transactionalEM => {
        await Promise.all([
          transactionalEM.save(refreshToken),
          transactionalEM.save(accessToken)
        ]);
      });

      this.setToken(accessTokenString);
      return {
        refreshToken: refreshToken.signedString,
        accessToken: accessToken.signedString,
        // tslint:disable-next-line:no-magic-numbers
        expired: (config.JWT.EXPIRES_IN || 3600)
      };
    } catch (error) {
      throw new AuthorizationFailedError(error.message);
    }
  }

  public static async refresh(tokenString: string): Promise<TokenResponse> {
    const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
    const tokenRepository = entityManager.getTokenRepository();
    const userRepository = entityManager.getUserRepository();

    try {
      const jwtPayload: JwtPayload = <JwtPayload>jwt.verify(tokenString, config.JWT.SECRET);

      if (!jwtPayload || !jwtPayload.id) {
        throw new TokenNotValidError('Token is not valid');
      }

      const refreshToken: Token = await tokenRepository.getByTokenString(tokenString, TokenType.REFRESH);
      const user = await userRepository.findUserByEmail(refreshToken.user.email);

      if (!refreshToken.active || !user) {
        throw new TokenNotValidError('Token is not active');
      }

      const accessTokenString = this.generateJWT(user, config.JWT.EXPIRES_IN);
      const accessToken: Token = this.createToken(TokenType.ACCESS, user, accessTokenString);
      accessToken.refreshToken = refreshToken;

      await entityManager.transaction(async transactionalEM => {
        await Promise.all([
          transactionalEM.save(accessToken)
        ]);
      });

      this.setToken(accessTokenString);
      return {
        refreshToken: tokenString,
        accessToken: accessToken.signedString,
        // tslint:disable-next-line:no-magic-numbers
        expired: (config.JWT.EXPIRES_IN || 3600)
      };
    } catch (e) {
      throw new TokenNotValidError(e.message);
    }
  }

  public static async logout(tokenString: string): Promise<void> {
    const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
    const tokenRepository = entityManager.getTokenRepository();

    try {
      const accessToken: Token = await tokenRepository.getByTokenString(tokenString);
      const refreshToken: Token = await tokenRepository.getByTokenId(accessToken.refreshTokenId);
      await entityManager.transaction(async transactionalEM => {
        accessToken.active = false;
        refreshToken.active = false;

        await Promise.all([
          transactionalEM.save(accessToken),
          transactionalEM.save(refreshToken)
        ]);
      });
    } catch (error) {
      throw error;
    }

    this.setToken(null);
  }

  public static generateJWT(user: User, expired: string): string {
    const data: JwtPayload = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      roles: user.roles,
      status: user.status,
      company: user.companies ? user.companies[0] : null
    };

    return jwt.sign(data, config.JWT.SECRET, { expiresIn: expired });
  }

  public static async passwordChange({ currentPassword, newPassword }: PasswordChangeRequest): Promise<void> {
    const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
    const user: User = await entityManager.getUserRepository().findUserByUserIdOrFail(this.getUserId());

    if (await this.compare(currentPassword, user!.password)) {
      user!.password = await makePasswordHash(newPassword);
      user!.status = Statuses.ACTIVE;
      user!.registeredAt = new Date();
      user!.updatedAt = new Date();

      await entityManager.save(user);
    } else {
      throw new AuthorizationFailedError();
    }
  }

  public static async resetPassword(userId: string): Promise<string> {
    const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
    const user: User = await entityManager.getUserRepository().findUserByUserIdOrFail(userId);

    user.password = await makePasswordHash(user.password);
    user.status = Statuses.PENDING;

    try {
      await entityManager.save(user);
    } catch (e) {
      throw new Error(e);
    }

    return user.password;
  }

  public static async signUp(
    [user, usersCompany, usersRole]: [User, UsersCompany, UsersRole],
    tEM?: EntityManager | undefined,
  ): Promise<void> {
    const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();

    user.password = await makePasswordHash(user.password);

    try {
      if (tEM) {
        await tEM.save(user);
        await Promise.all([tEM.save(usersCompany), tEM.save(usersRole)]);
      } else {
        await entityManager.transaction(async transactionalEM => {
          await transactionalEM.save(user);
          await Promise.all([transactionalEM.save(usersCompany),
            transactionalEM.save(usersRole)]);
        });
      }
    } catch (error) {
      if (error.name === 'QueryFailedError') {
        throw new QueryFailedError(error.message);
      }
      throw new Error(error);
    }

    logger.info('SignUp successfully: ', { email: user.email });
  }

  private static async compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(rawPassword, hashedPassword, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }

  private static createToken(type: TokenType, user: User, tokenValue: string): Token {
    const token = new Token();
    token.user = user;
    token.type = type;
    token.signedString = tokenValue;

    return token;
  }
}

// tslint:disable-next-line:max-file-line-count
export const authService = new AuthService();
