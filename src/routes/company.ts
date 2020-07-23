import { NextFunction, Request, Response, Router } from 'express';
import { wrapper, wrapperWithPagination } from '@helpers/wrapperData';
import { IdTypeRequest } from '@validation/requests/idTypeRequest';
import { CompanyCreateRequest } from '@validation/company/companyCreateRequest';
import { getCompanyDetails } from '@services/company/getCompanyDetails';
import { getListOfUsersByCompany } from '@services/user/getListOfUsersByCompany';
import { createCompany } from '@services/company/createCompany';
import { CompanyUpdateRequest } from '@validation/company/companyUpdateRequest';
import { CompanyStatusTypeRequest } from '@validation/company/companyStatusTypeRequest';
import { HttpCode } from '@constants/httpCode';
import { updateCompanyDetails } from '@services/company/updateCompanyDetails';
import { setStatus } from '@services/company/setStatus';
import { PaginationQuery } from '@validation/requests/paginationQuery';
import { SortingQuery } from '@validation/requests/sortingQuery';
import { authorize } from '@middleware/authorize';
import { Roles } from '@entities/enums';
import { getListOfCompanies } from '@services/company/getListOfCompanies';
import { createCompanyWithAdmin } from '@services/company/createCompanyWithAdmin';
import { UserCredentials } from '@entities/types';

const router = Router();

router.get(
  '/',
  authorize([Roles.SADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companies = await getListOfCompanies();

      res.send(wrapper(companies));
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  '/:companyId',
  authorize([Roles.SADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idRequest = new IdTypeRequest({ id: req.params.companyId });

      const companyDetails = await getCompanyDetails(idRequest.id);

      res.send(wrapper(companyDetails));
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  '/:companyId/users',
  authorize([Roles.SADMIN, Roles.CADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idRequest = new IdTypeRequest({ id: req.params.companyId });

      const fpsQuery = {
        paginationQuery: new PaginationQuery(req.query),
        sortingQuery: new SortingQuery(req.query),
      };

      const { listOfUsers, pagination } =
        await getListOfUsersByCompany(idRequest.id, fpsQuery);

      res.send(wrapperWithPagination(listOfUsers, pagination));
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/',
  authorize([Roles.SADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCompany = new CompanyCreateRequest(req.body);

      const company = await createCompany(newCompany);

      res.send(wrapper(company));
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/admin',
  authorize([Roles.SADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials: UserCredentials = await createCompanyWithAdmin(req);

      res.send(wrapper(credentials));
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  '/:companyId',
  authorize([Roles.SADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idRequest = new IdTypeRequest({ id: req.params.companyId });

      const newCompanyDetails = new CompanyUpdateRequest(req.body);

      await updateCompanyDetails(idRequest.id, newCompanyDetails);

      res.status(HttpCode.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  },
);

router.patch(
  '/:companyId/status',
  authorize([Roles.SADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idRequest = new IdTypeRequest({ id: req.params.companyId });
      const statusRequest = new CompanyStatusTypeRequest(req.body);

      await setStatus(idRequest.id, statusRequest.status);

      res.status(HttpCode.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  },
);

// tslint:disable-next-line:max-file-line-count
export const companyRouter = router;
