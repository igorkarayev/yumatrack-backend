import { EntityRepository, Repository } from "typeorm";
import { Reports } from "@entities/reports";
import { EntityNotFoundError } from "@errors/custom/entityNotFoundError";
import { User } from "@src/entities/user";

@EntityRepository(Reports)
export class ReportsRepository extends Repository<Reports> {
  public async findReportDetailsByUserId(userId: string): Promise<Reports[]> {
    const report: Reports[] | undefined = await this.createQueryBuilder(
      Reports.name
    )
      .leftJoinAndSelect(`${Reports.name}.user`, User.name)
      .where(`"${User.name}"."id" = :userId`, { userId })
      .getMany();
    if (!report) {
      throw new EntityNotFoundError("Report", { text: "Report is not found" });
    }

    return report;
  }

  //   public async deleteReportByReportId(id: string) {
  //     const response = await this.createQueryBuilder(Reports.name)
  //       .leftJoinAndSelect(`${Reports.name}.user`, User.name)
  //       .delete()
  //       .from(Reports)
  //       .where(`"${Reports.name}"."id" = :id`, { id })
  //       .execute();

  //     return response;
  //   }

  public async updateReportByReportId(id: string) {
    const response = await this.createQueryBuilder(Reports.name)
      .leftJoinAndSelect(`${Reports.name}.user`, User.name)
      .update(Reports)
      .set({ description: "Hello its test" })
      .where(`"${Reports.name}"."id" = :id`, { id })
      .execute();
    return response;
  }

  public async findReportByReportId(id: string) {
    const response = await this.createQueryBuilder(Reports.name)
      .leftJoinAndSelect(`${Reports.name}.user`, User.name)
      .where(`"${Reports.name}"."id" = :id`, { id })
      .getOne();

    return response;
  }
}
