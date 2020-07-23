import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

const validationOptions: ValidationOptions = { message: 'ApiKey and ApiSecret are required fields' };

export function IsRequiredField (property: string) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isRequiredField',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (<any> args.object)[relatedPropertyName];
          return relatedValue && value;
        }
      }
    });
  };
}