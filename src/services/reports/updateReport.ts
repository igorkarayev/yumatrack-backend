import { Reports } from "@entities/reports";
import { CustomEntityManager } from "@src/typeorm/customEntityManager";

interface Report {
  description: string;
  date: Date;
  time: number;
  isPaid: boolean;
}

// export const updateReportByReportId = async (
//   newReport: Report,
//   reportId: string
// ) => {
//   const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
//   const reportRepository = entityManager.getReportRepository();
//   return reportRepository.updateReportByReportId(reportId);
// };

export const updateReportByReportId = async (
  // newReport: any,
  reportId: string
) => {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const reportRepository = entityManager.getReportRepository();
  const report = await reportRepository.findReportByReportId(reportId);
  if (report) {
    // Object.keys(newReport).forEach((key) => {
    //   if (newReport[key] !== undefined) {
    //     report[key] = newReport[key];
    //   }
    // });
    report.description = "Surrender";
    report.updatedAt = new Date();
  }
  await entityManager.save(report);
};

// export const createReport = async (newReport: Report) => {
//   const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
//   const report = generateReport(newReport);
//   await entityManager.save(report);
//   return report;
// };

// const generateReport = (newReport: Report) => {
//   const report = new Reports();
//   const { description, date, time, isPaid, user } = newReport;
//   report.description = description;
//   report.date = date;
//   report.time = time;
//   report.isPaid = isPaid;
//   report.user = user;
//   return report;
// };
