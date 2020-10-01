import { CustomEntityManager } from "@typeorm/customEntityManager";

export const deleteReportByReportId = async (reportId: string) => {
  try {
    const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
    const reportRepository = entityManager.getReportRepository();
    reportRepository.delete(reportId);
    return true;
  } catch {
    return false;
  }
};
