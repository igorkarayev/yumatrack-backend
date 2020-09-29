import { CustomEntityManager } from "@src/typeorm/customEntityManager";

interface Report {
  description: string;
  date: Date;
  time: number;
  isPaid: boolean;
  updatedAt: Date;
}

export const updateReportByReportId = async (
  // newReport: Report,
  reportId: string
) => {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const reportRepository = entityManager.getReportRepository();
  const report = await reportRepository.findReportByReportId(reportId);
  // const { description, date, time, isPaid } = newReport;
  if (report) {
    report.description = "MEME";
    // report.date = date;
    // report.time = time;
    // report.isPaid = isPaid;
    report.updatedAt = new Date();
  }
  console.log("Report", report);
  await entityManager.save(report);
};
