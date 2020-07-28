import { EntityRepository, Repository } from "typeorm";
import { Reports } from "@entities/reports";
import { EntityNotFoundError } from "@errors/custom/entityNotFoundError";

@EntityRepository(Reports)
export class ReportsRepository extends Repository<Reports> {
  public async findReportDetailsByUser(userId: string): Promise<Reports[]> {
    const report: Reports[] | undefined = await this.createQueryBuilder(
      Reports.name
    )
      .where(`${Reports.name}.user_id = :userId`, { userId })
      .getMany();
    if (!report) {
      throw new EntityNotFoundError("User", { text: "User is not found" });
    }

    return report;
  }
}
