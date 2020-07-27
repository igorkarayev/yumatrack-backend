import { Reports } from "@entities/reports";

// interface IReport {
//   userId: number;
//   description: string;
//   date: Date;
//   time: number;
//   isPaid: boolean;
// }

export const findReport = async () => {
  return await Reports.find();
};
