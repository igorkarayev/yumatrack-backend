import { NextFunction, Request, Response, Router } from "express";
import { createReport } from "../../src/services/reports/createReport";
import { findReport } from "../../src/services/reports/findReport";
import { deleteReportByReportId } from "../../src/services/reports/deleteReport";
import { updateReportByReportsId } from "../../src/services/reports/updateReport";
import { findReportsBetweenDates } from "../../src/services/reports/filterReports";
import { wrapper } from "@helpers/wrapperData";
import { AuthService } from "@src/services/auth";

const router = Router();

router.post("/createReport", async (req: any, res: any, next: NextFunction) => {
  try {
    const { date, description, time, isPaid } = req.body;
    const result = await createReport({
      date,
      description,
      time,
      isPaid,
      user: AuthService.getUser(),
    });
    res.send(wrapper(result));
  } catch (e) {
    next(e);
  }
});

router.get(
  "/getReport",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      const result = await findReport(userId);
      res.json(wrapper(result));
    } catch (e) {
      res.send(e);
    }
  }
);

router.delete(
  "/deleteReport/:reportId",
  async (req: Request, res: Response) => {
    try {
      const { reportId } = req.params;
      const result = await deleteReportByReportId(reportId);
      res.json(wrapper(result));
    } catch (e) {
      res.send(e);
    }
  }
);

router.put("/updateReport/:reportId", async (req: Request, res: Response) => {
  try {
    const { newReport } = req.body;
    const { reportId } = req.params;
    const result = await updateReportByReportsId(newReport, reportId);
    res.json(wrapper(result));
  } catch (e) {
    res.send(e);
  }
});

router.get(
  "/getReportsBetween/:userId",
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { startDate, endDate } = req.body;
      const result = await findReportsBetweenDates(userId, startDate, endDate);
      res.json(wrapper(result));
    } catch (e) {
      res.send(e);
    }
  }
);

export const reportRouter = router;
