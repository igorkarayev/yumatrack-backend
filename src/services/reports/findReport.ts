import { Reports } from "@entities/reports";
import { CustomEntityManager } from "@typeorm/customEntityManager";

export const findReport = async (userId: string): Promise<Reports[]> => {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const reportRepository = entityManager.getReportRepository();
  return reportRepository.findReportDetailsByUserId(userId);
};
