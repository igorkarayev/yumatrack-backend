import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsUniqueArrayThan (property: string, validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isUniqueArrayThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (<any> args.object)[relatedPropertyName];

          return !value.some((data: string) => relatedValue.includes(data));
        }
      }
    });
  };
}