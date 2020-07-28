import { Reports } from "@entities/reports";
import { CustomEntityManager } from "@src/typeorm/customEntityManager";

interface Report {
  userId: string;
  description: string;
  date: Date;
  time: number;
  isPaid: boolean;
}

export const updateReport = async (newReport: Report, id: string) => {};
