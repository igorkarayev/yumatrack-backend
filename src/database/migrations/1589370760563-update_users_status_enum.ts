import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { Statuses } from '@entities/enums';

export class UpdateUsersStatusEnum1589370760563 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`BEGIN`);
    await queryRunner.query(`COMMIT`);
    await queryRunner.query(`ALTER TYPE users_status_enum ADD VALUE '${Statuses.NOT_CONNECTED}'`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn('users', 'status', new TableColumn({
      name: 'status',
      type: 'enum',
      enum: [
        Statuses.INVITED,
        Statuses.ACTIVE,
        Statuses.PENDING,
        Statuses.BLOCKED,
      ],
      default: `'${Statuses.INVITED}'`,
      isNullable: false
    }));
  }
}