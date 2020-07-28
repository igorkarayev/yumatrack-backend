import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { config } from "@src/config";
import { AuthService, JwtPayload } from "@services/auth";
import { AuthorizationFailedError } from "@errors/custom/authorizationFailedError";
import { combinePermissions } from "@services/permissionsCombine";
import { CustomEntityManager } from "@typeorm/customEntityManager";
import { User } from "@entities/user";
import { Token } from "@entities/token";
import { TokenNotValidError } from "@errors/custom/tokenNotValid";

export const verifyTokenAndGetUser = async (token: string): Promise<User> => {
  const jwtPayload: JwtPayload = <JwtPayload>(
    jwt.verify(token, config.JWT.SECRET)
  );

  if (!jwtPayload || !jwtPayload.id) {
    throw new TokenNotValidError("Token is not valid");
  }

  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const userRepository = entityManager.getUserRepository();
  const user: User = await userRepository.findUserWithDetailsByUserIdOrFail(
    jwtPayload.id
  );

  const isTokenActive = user.tokens.some(
    (t: Token) => t.active && token.includes(t.signedString)
  );

  if (!isTokenActive) {
    throw new TokenNotValidError("Token is not active");
  }

  return user;
};

export const getTokenFromHeader = (req: Request): string => {
  const authorization = req.get("authorization");
  const match = authorization && authorization.match(/^bearer (.*)$/i);
  if (!match) {
    throw new AuthorizationFailedError("Invalid authorization header");
  }

  const [, token] = match;
  return token;
};

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFromHeader(req);
    const user: User = await verifyTokenAndGetUser(token);
    AuthService.setUserId(user.id);
    AuthService.setUser(user);
    AuthService.setUserRoles(user.roles);
    if (user.companies && user.companies[0]) {
      AuthService.setCompanyId(user.companies[0].id);
    }
    AuthService.setPermissions(combinePermissions(user));
    AuthService.setUserStatus(user.status);
    AuthService.setToken(token);
  } catch (error) {
    next(new TokenNotValidError(error.message));
    return;
  }

  next();
};
