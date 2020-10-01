import { CustomEntityManager } from "@src/typeorm/customEntityManager";

interface Report {
  description: string;
  date: Date;
  time: number;
  isPaid: boolean;
  updatedAt: Date;
}

export const updateReportByReportsId = async (
  newReport: Report,
  reportId: string
) => {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const reportRepository = entityManager.getReportRepository();
  const report = await reportRepository.findReportByReportId(reportId);
  const { description, date, time, isPaid } = newReport;
  if (report) {
    report.description = description;
    report.date = date;
    report.time = time;
    report.isPaid = isPaid;
    report.updatedAt = new Date();
  }
  console.log("Report", report);
  await entityManager.save(report);
};
