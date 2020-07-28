import { Reports } from "@entities/reports";
import { User } from "@entities/user";
import { CustomEntityManager } from "@src/typeorm/customEntityManager";

interface Report {
  description: string;
  date: Date;
  time: number;
  isPaid: boolean;
  user: User;
}

export const createReport = async (newReport: Report) => {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const report = generateReport(newReport);
  await entityManager.save(report);
  return report;
};

const generateReport = (newReport: Report) => {
  const report = new Reports();
  const { description, date, time, isPaid, user } = newReport;
  report.description = description;
  report.date = date;
  report.time = time;
  report.isPaid = isPaid;
  report.user = user;
  return report;
};
