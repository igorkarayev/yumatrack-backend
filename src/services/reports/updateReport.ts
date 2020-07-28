import { Reports } from "@entities/reports";
import { CustomEntityManager } from "@src/typeorm/customEntityManager";

interface Report {
  userId: string;
  description: string;
  date: Date;
  time: number;
  isPaid: boolean;
}

export const updateReport = async (newReport: Report, userId: string) => {
  // const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  // const report = generateReport(newReport);
  // await entityManager.update()
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const reportRepository = entityManager.getReportRepository();
  const report: Reports[] = await reportRepository.findReportDetailsByUserId(
    userId
  );
  Object.keys(newReport).forEach((key) => {
    if (newReport[key] !== undefined) {
      report[key] = newReport[key];
    }
  });
  await entityManager.save(report);
};

// const generateReport = (newReport: Report) => {
//   const report = new Reports();
//   const { userId, description, date, time, isPaid } = newReport;
//   report.userId = userId;
//   report.description = description;
//   report.date = date;
//   report.time = time;
//   report.isPaid = isPaid;
//   return report;
// };
