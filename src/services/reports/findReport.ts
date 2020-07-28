import { Reports } from "@entities/reports";
import { CustomEntityManager } from "@typeorm/customEntityManager";
import { createQueryBuilder } from "typeorm";

// interface IReport {
//   userId: number;
//   description: string;
//   date: Date;
//   time: number;
//   isPaid: boolean;
// }

export const findReport = async (id: string) => {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const report = generateReport();
  await entityManager.find(id);
  return await entityManager.find(id);
};

const generateReport = async () => {
  const report = new Reports();
  return report;
};
