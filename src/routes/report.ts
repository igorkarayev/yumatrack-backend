import { NextFunction, Request, Response, Router } from "express";
import { createReport } from "../../src/services/reports/createReport";
import { findReport } from "../../src/services/reports/findReport";
import { wrapper } from "@helpers/wrapperData";

const router = Router();

router.post(
  "/createReport",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await createReport();
      res.send(wrapper(result));
    } catch (e) {
      res.send(e);
    }
  }
);

router.get(
  "/getReport",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await findReport();
      //   res.send(wrapper(result));
      res.json(wrapper(result));
    } catch (e) {
      res.send(e);
    }
  }
);

export const reportRouter = router;
