import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DropColumnSalt1586173173768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'salt');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn('users', new TableColumn({
        name: 'salt',
        type: 'varchar',
        isNullable: true
      })
    );
  }
}
