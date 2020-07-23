import { EntityRepository, Repository } from 'typeorm';
import { User } from '@entities/user';
import { EntityNotFoundError } from '@errors/custom/entityNotFoundError';
import { Token } from '@entities/token';
import { TokenType } from '@entities/enums';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  public async getByTokenString(tokenString: string, type?: TokenType): Promise<Token> {
    const query = this.createQueryBuilder(Token.name)
      .leftJoinAndSelect(`${Token.name}.user`, User.name)
      .where(`"${Token.name}"."signed_string" = :tokenString`, { tokenString });
    if (type) {
      query.andWhere(`"${Token.name}"."type" = :type`, { type });
    }
    const token: Token | undefined = await query.getOne();

    if (!token) {
      throw new EntityNotFoundError('Token', { text: 'Token is not found' });
    }

    return token;
  }

  public async getByTokenId(id: number): Promise<Token> {
    const token: Token | undefined = await this.createQueryBuilder(Token.name)
      .where(`${Token.name}.id = :id`, { id })
      .getOne();

    if (!token) {
      throw new EntityNotFoundError('Token', { text: 'Token is not found' });
    }

    return token;
  }

  public async getAccessTokensByUserId(userId: string): Promise<Token[]> {
    const tokens: Token[] = await this.createQueryBuilder(Token.name)
      .leftJoinAndSelect(`${Token.name}.user`, User.name)
      .where(`"${User.name}"."id" = :userId AND "${Token.name}"."type" = :type`, { userId, type: TokenType.ACCESS })
      .getMany();

    if (!tokens.length) {
      throw new EntityNotFoundError('Token', { text: 'Tokens are not found' });
    }

    return tokens;
  }
}
