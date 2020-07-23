import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';
import { Entities, Statuses } from '@entities/enums';

export class Init1584018264844 implements MigrationInterface {
  // tslint:disable-next-line:max-func-body-length
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'full_name',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'trading_name',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'email',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'phone',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'address',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'status',
          type: 'enum',
          enum: [
            Statuses.INVITED,
            Statuses.ACTIVE,
            Statuses.PENDING,
            Statuses.BLOCKED
          ],
          default: `'${Statuses.INVITED}'`,
          isNullable: false
        },
        {
          name: 'registered_at',
          type: 'timestamp',
          isNullable: false,
          default: 'CURRENT_TIMESTAMP'
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

    await queryRunner.createIndex('users', new TableIndex({
      name: 'IDX_USERS_EMAIL',
      columnNames: ['email']
    }));

    await queryRunner.createTable(new Table({
      name: 'roles',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'role',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'title',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'active',
          type: 'boolean',
          isNullable: false,
          default: true
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

    await queryRunner.query(`
            INSERT INTO roles (role, title)
            VALUES ('super', 'Super Admin'),
                   ('company', 'Company Admin'),
                   ('user', 'User'),
                   ('guest', 'Guest')
        `);

    await queryRunner.createTable(new Table({
      name: 'companies',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'active',
          type: 'boolean',
          isNullable: false,
          default: true
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

    await queryRunner.createTable(new Table({
      name: 'permissions',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true
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

    await queryRunner.createTable(new Table({
      name: 'users_roles',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'user_id',
          type: 'uuid',
          isNullable: false
        },
        {
          name: 'role_id',
          type: 'uuid',
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

    await queryRunner.createTable(new Table({
      name: 'users_companies',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'user_id',
          type: 'uuid',
          isNullable: false
        },
        {
          name: 'company_id',
          type: 'uuid',
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

    await queryRunner.createTable(new Table({
      name: 'entities_permissions',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'entity_id',
          type: 'uuid',
          isNullable: false
        },
        {
          name: 'entity_type',
          type: 'enum',
          enum: [
            Entities.USER,
            Entities.ROLE,
            Entities.COMPANY
          ],
          isNullable: false
        },
        {
          name: 'permission_id',
          type: 'uuid'
        },
        {
          name: 'value',
          type: 'int',
          isNullable: false,
          default: 0
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

    await queryRunner.createForeignKeys('users_roles', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      }),
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE'
      })
    ]);

    await queryRunner.createForeignKeys('users_companies', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      }),
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies',
        onDelete: 'CASCADE'
      })
    ]);

    await queryRunner.createForeignKeys('entities_permissions', [
      new TableForeignKey({
        columnNames: ['permission_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'permissions',
        onDelete: 'CASCADE'
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const userRoleTable = await queryRunner.getTable('users_roles');
    if (userRoleTable) {
      const foreignKeys = userRoleTable.foreignKeys.filter(fk =>
        fk.columnNames.indexOf('user_id') !== -1 || fk.columnNames.indexOf('role_id') !== -1);
      if (foreignKeys) {
        await queryRunner.dropForeignKeys('users_roles', foreignKeys);
      }
    }
    await queryRunner.dropTable('users_roles');

    const userCompanyTable = await queryRunner.getTable('users_companies');
    if (userCompanyTable) {
      const foreignKeys = userCompanyTable.foreignKeys.filter(fk =>
        fk.columnNames.indexOf('user_id') !== -1 || fk.columnNames.indexOf('company_id') !== -1);
      if (foreignKeys) {
        await queryRunner.dropForeignKeys('users_companies', foreignKeys);
      }
    }
    await queryRunner.dropTable('users_companies');

    const entityPermissionTable = await queryRunner.getTable('entities_permissions');
    if (entityPermissionTable) {
      const foreignKeys = entityPermissionTable.foreignKeys.filter(fk => fk.columnNames.indexOf('permission_id') !== -1);
      if (foreignKeys) {
        await queryRunner.dropForeignKeys('entities_permissions', foreignKeys);
      }
    }
    await queryRunner.dropTable('entities_permissions');

    await queryRunner.dropTable('permissions');
    await queryRunner.dropTable('companies');
    await queryRunner.dropTable('roles');
    await queryRunner.dropIndex('users', 'IDX_USERS_EMAIL');
    await queryRunner.dropTable('users');

    await queryRunner.query(`DROP TYPE IF EXISTS users_status_enum`);
    await queryRunner.query(`DROP TYPE IF EXISTS roles_role_enum`);
    await queryRunner.query(`DROP TYPE IF EXISTS entities_permissions_entity_type_enum`);
  }

// tslint:disable-next-line:max-file-line-count
}
