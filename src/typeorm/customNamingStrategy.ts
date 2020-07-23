import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { pluralCamelCase, singularSnakeCase } from '@typeorm/pluralizeWord';
import { snakeCase } from '@helpers/snakeCase';
import { logger } from '@services/logger';

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  public tableName(targetName: string, userSpecifiedName: string): string {
    try {
      if (userSpecifiedName) {
        return userSpecifiedName;
      }

      return snakeCase(pluralCamelCase(targetName));
    } catch (e) {
      logger.debug(e.message, e);
      throw e;
    }
  }

  public columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return customName ? customName : snakeCase(embeddedPrefixes.concat(propertyName).join('_'));
  }

  public relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  public joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(`${relationName}_${referencedColumnName}`);
  }

  public joinTableName(firstTableName: string, secondTableName: string, firstPropertyName: string,
                       secondPropertyName: string): string {
    return snakeCase(`${firstTableName}_${secondTableName}`);
  }

  public joinTableColumnName(tableName: string, propertyName: string, columnName: string): string {
    try {
      const tName = singularSnakeCase(tableName);
      const cName = columnName ? columnName : propertyName;

      return snakeCase(`${tName}_${cName}`);
    } catch (e) {
      logger.error(e.message, e);
      throw e;
    }
  }

  public classTableInheritanceParentColumnName(
    parentTableName: any,
    parentTableIdPropertyName: any,
  ): string {
    return snakeCase(`${parentTableName}_${parentTableIdPropertyName}`);
  }
}
