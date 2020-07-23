import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TokenType } from '@entities/enums';

export class CreateTokensTable1585522538881 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'tokens',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'user_id',
          type: 'uuid',
          isNullable: false
        },
        {
          name: 'refresh_token_id',
          type: 'int',
          isNullable: true
        },
        {
          name: 'type',
          type: 'enum',
          enum: [
            TokenType.ACCESS,
            TokenType.REFRESH
          ],
          default: `'${TokenType.ACCESS}'`,
          isNullable: false
        },
        {
          name: 'signed_string',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'active',
          type: 'boolean',
          default: true,
          isNullable: false
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
      ]
    }), true);

    await queryRunner.createForeignKeys('tokens', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      })
    ]);

    await queryRunner.createForeignKeys('tokens', [
      new TableForeignKey({
        columnNames: ['refresh_token_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tokens',
        onDelete: 'CASCADE'
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const tokenTable = await queryRunner.getTable('tokens');
    if (tokenTable) {
      const foreignKeys = tokenTable.foreignKeys.filter(fk => fk.columnNames.indexOf('user_id') !== -1);
      if (foreignKeys) {
        await queryRunner.dropForeignKeys('tokens', foreignKeys);
      }
    }
    await queryRunner.dropTable('tokens');
    await queryRunner.query(`DROP TYPE IF EXISTS tokens_type_enum`);
  }

}
