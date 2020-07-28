import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createReportsTable1595583321021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'reports',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'time',
            type: 'int',
          },
          {
            name:'is_paid',
            type:'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP'
          }
        ],
      }),
      true
    );

    await queryRunner.createForeignKeys('reports', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const reportsTable = await queryRunner.getTable('reports');
    if (reportsTable) {
      const foreignKeys = reportsTable.foreignKeys.filter(
        (fk) => fk.columnNames.indexOf('user_id') !== -1
      );
      if (foreignKeys) {
        await queryRunner.dropForeignKeys('reports', foreignKeys);
      }
    }
    await queryRunner.dropTable('reports');
  }
}
