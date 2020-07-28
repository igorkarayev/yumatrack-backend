import { Reports } from "@entities/reports";
import { CustomEntityManager } from "@src/typeorm/customEntityManager";

interface Report {
  userId: string;
  description: string;
  date: Date;
  time: number;
  isPaid: boolean;
}

export const createReport = async (newReport: any) => {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const report = generateReport(newReport);
  await entityManager.save(report);
  return report;
};

const generateReport = (newReport: Report) => {
  const report = new Reports();
  const { userId, description, date, time, isPaid } = newReport;
  report.userId = userId;
  report.description = description;
  report.date = date;
  report.time = time;
  report.isPaid = isPaid;
  return report;
};
