import { Reports } from "@entities/reports";
import { CustomEntityManager } from "@typeorm/customEntityManager";

export const findReportsBetweenDates = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<Reports[]> => {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const reportRepository = entityManager.getReportRepository();
  return reportRepository.findReportsBetweenDates(userId, startDate, endDate);
};
