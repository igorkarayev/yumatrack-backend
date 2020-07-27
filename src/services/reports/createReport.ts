import { Reports } from "@entities/reports";
import { CustomEntityManager } from "@src/typeorm/customEntityManager";

interface Report {
  userId: number;
  description: string;
  date: Date;
  time: number;
  isPaid: boolean;
}

export const createReport = async () => {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const report = generateReport();
  await entityManager.save(report);
};

const generateReport = () => {
  const report = new Reports();
  report.userId = "65244acd-8431-4e07-902e-a8f1dee95c5b";
  report.description = "Hell";
  report.date = new Date();
  report.time = 180;
  report.isPaid = "false";
  return report;
};
