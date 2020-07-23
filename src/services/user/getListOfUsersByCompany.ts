import { CustomEntityManager } from '@typeorm/customEntityManager';
import { serializeUserDetails } from '@services/user/serialization/serializeUserDetails';
import { checkCompanyExistence } from '@services/company/checks/checkCompanyExistence';
import { User } from '@entities/user';
import {
  generateSorting,
  generatePagination,
  generateResponsePagination,
} from '@helpers/fps';
import { QueryFailedError } from '@errors/custom/queryFailedError';
import { BadRequestError } from '@errors/custom/http/badRequestError';

export async function getListOfUsersByCompany(companyId: string, fpsQuery: any) {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();

  await checkCompanyExistence(entityManager, companyId);

  const { paginationQuery, sortingQuery } = fpsQuery;

  let fps = {};
  try {
    fps = {
      pagination: generatePagination(paginationQuery),
      sorting: generateSorting(sortingQuery),
    };
  } catch (err) {
    throw new BadRequestError(err.message);
  }

  const userRepository = entityManager.getUserRepository();
  let users: User[];
  let count: number;
  try {
    [users, count] = await userRepository.findUsersByCompanyIdWithFPS(companyId, fps);
  } catch (error) {
    if (error.name === 'QueryFailedError') {
      throw new QueryFailedError(error.message);
    }
    throw new Error(error);
  }

  return {
    // tslint:disable-next-line:no-unnecessary-callback-wrapper
    listOfUsers: users.map(user => serializeUserDetails(user)),
    pagination: generateResponsePagination(paginationQuery.limit, paginationQuery.page, count),
  };
}
