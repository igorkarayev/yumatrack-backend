import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UsersAddColumnSalt1584602039692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn('users', new TableColumn({
        name: 'salt',
        type: 'varchar',
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'salt');
  }

}
