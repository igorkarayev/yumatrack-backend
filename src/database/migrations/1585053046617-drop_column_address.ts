import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DropColumnAddress1585053046617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'address');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'address',
      type: 'varchar',
      isNullable: true
    }));
  }
}
