import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { CompanyStatuses } from '@entities/enums';

export class ChangeColumnType1585742333693 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn('companies', 'active', new TableColumn({
      name: 'status',
      type: 'enum',
      enum: [
        CompanyStatuses.ACTIVE,
        CompanyStatuses.INACTIVE,
      ],
      default: `'${CompanyStatuses.ACTIVE}'`,
      isNullable: false
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn('companies', 'status', new TableColumn({
      name: 'active',
      type: 'boolean',
      isNullable: false,
      default: true
    }));

    await queryRunner.query(`DROP TYPE IF EXISTS companies_status_enum`);
  }

}
