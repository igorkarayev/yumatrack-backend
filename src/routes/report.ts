import { NextFunction, Request, Response, Router } from "express";
import { createReport } from "../../src/services/reports/createReport";
import { findReport } from "../../src/services/reports/findReport";
import { deleteReportByReportId } from "../../src/services/reports/deleteReport";
import { updateReportByReportsId } from "../../src/services/reports/updateReport";
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

router.delete("/deleteReport", async (req: Request, res: Response) => {
  try {
    const { reportId } = req.body;
    const result = await deleteReportByReportId(reportId);
    res.json(wrapper(result));
  } catch (e) {
    res.send(e);
  }
});

router.put("/updateReport", async (req: Request, res: Response) => {
  try {
    const { reportId, newReport } = req.body;
    const result = await updateReportByReportsId(newReport, reportId);
    res.json(wrapper(result));
  } catch (e) {
    res.send(e);
  }
});

// router.put(
//   '/:userId',
//   authorize([Roles.SADMIN, Roles.CADMIN, Roles.USER]),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const idRequest = new IdTypeRequest({ id: req.params.userId });

//       const newUserDetails = new UserUpdateRequest({
//         userId: idRequest.id,
//         ...req.body,
//       });

//       await updateUserDetails(idRequest.id, newUserDetails);

//       res.status(HttpCode.NO_CONTENT).send();
//     } catch (e) {
//       next(e);
//     }
//   },
// );

export const reportRouter = router;
