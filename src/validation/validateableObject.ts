// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { plainToClassFromExist } from 'class-transformer';
import { validate, validateSync } from 'class-validator';
import { FieldErrorFactory } from '@errors/custom/misc/fieldErrorFactory';
import { FieldErrorCollectionGenerator } from '@errors/custom/misc/fieldErrorCollectionGenerator';
import { FieldErrorCollection } from '@errors/custom/fieldErrorCollection';
import { ValidationError } from 'class-validator/validation/ValidationError';

export class ValidateableObject {
  constructor(inputData: object | null) {
    this.initObject(inputData);
  }

  public async validateAsync() {
    const errors = await validate(this);

    this.checkErrors(errors);
  }

  protected initObject(inputData: object | null) {
    const data = inputData ? inputData : {};

    plainToClassFromExist(this, data, {excludeExtraneousValues: true});

    const errors: ValidationError[] = validateSync(this);

    this.checkErrors(errors);
  }

  protected checkErrors(errors: ValidationError[]) {
    if (!errors.length) {
      return;
    }

    const factory: FieldErrorFactory = new FieldErrorFactory();
    const generator: FieldErrorCollectionGenerator = new FieldErrorCollectionGenerator(errors, factory);
    throw new FieldErrorCollection(generator.getErrors());
  }
}
