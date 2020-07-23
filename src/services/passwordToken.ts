import { URL } from 'url';
import { generate } from 'randomstring';
import { config } from '@src/config';
import { PasswordToken } from '@entities/passwordToken';
import { PasswordTokenRepository } from '@repositories/passwordTokenRepository';
import { EntityManager } from 'typeorm';

class PasswordTokenService {
  public constructor(
    private readonly tokenConfirmationUrl: string,
    private readonly tokenLength: number,
    private readonly tokenLivenessInHours: number,
  ) {}

  public async createPasswordToken(entityManager: EntityManager, userId: string): Promise<PasswordToken> {
    const passwordTokenRepository = entityManager.getCustomRepository(PasswordTokenRepository);
    const passwordToken = passwordTokenRepository.create({
      userId,
      token: this.generateToken(),
      expiredAt: this.getTokenExpiredAt(),
    });
    return passwordTokenRepository.save(passwordToken);
  }

  public async findPasswordToken(entityManager: EntityManager, token: string): Promise<PasswordToken | undefined> {
    const passwordTokenRepository = entityManager.getCustomRepository(PasswordTokenRepository);
    return passwordTokenRepository.findOne({ token });
  }

  public async removePasswordToken(entityManager: EntityManager, passwordToken: PasswordToken): Promise<void> {
    const passwordTokenRepository = entityManager.getCustomRepository(PasswordTokenRepository);
    await passwordTokenRepository.remove(passwordToken);
  }

  public isTokenExpired(passwordToken: PasswordToken): boolean {
    return new Date() > passwordToken.expiredAt;
  }

  public getTokenConfirmationUrl(passwordToken: PasswordToken): string {
    const url = new URL(this.tokenConfirmationUrl);
    url.searchParams.append('token', passwordToken.token);
    return url.href;
  }

  private generateToken(): string {
    return generate({ length: this.tokenLength });
  }

  private getTokenExpiredAt(): Date {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + this.tokenLivenessInHours);
    return currentTime;
  }
}

export const passwordTokenService = new PasswordTokenService(
  config.PASSWORD_TOKEN?.CONFIRMATION_URL,
  config.PASSWORD_TOKEN?.LENGTH,
  config.PASSWORD_TOKEN?.LIVENESS_IN_HOURS,
);
