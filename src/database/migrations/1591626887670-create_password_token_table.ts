import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePasswordTokenTable1591626887670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'password_tokens',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'token',
          length: '200',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        },
        {
          name: 'user_id',
          type: 'uuid',
          isNullable: true,
          isUnique: true,
        },
        {
          name: 'expired_at',
          type: 'timestamp',
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          isNullable: false,
          default: 'CURRENT_TIMESTAMP'
        },
      ]
    }));
    await queryRunner.createForeignKeys('password_tokens', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('password_tokens');
  }
}
