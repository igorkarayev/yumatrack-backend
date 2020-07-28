import { Reports } from "@entities/reports";
import { CustomEntityManager } from "@typeorm/customEntityManager";

export const findReport = async (userId: string): Promise<Reports[]> => {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const reportRepository = entityManager.getReportRepository();
  const reports = reportRepository.findReportDetailsByUserId(userId);
  return reports;
};

// const serializeReport = (report: any) => {
//   return {
//     userId: report.userId,
//     description: report.description,
//     date: report.date,
//     time: report.time,
//     isPaid: report.isPaid,
//   };
// };
