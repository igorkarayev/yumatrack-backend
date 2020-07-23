import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { AuthService } from '@services/auth';

const validationOptions: ValidationOptions = { message: 'You don’t have permission to update' };

export function IsNotSelfUpdating (property: string) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'forbidden',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const userId = (<any> args.object)[relatedPropertyName];

          const currentId = AuthService.getUserId();

          return currentId !== userId;
        }
      }
    });
  };
}