import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isTimeFormat', async: false })
export class IsTimeFormatConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const regex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
    return typeof value === 'string' && regex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be in HH:mm format`;
  }
}

export function IsTimeFormat(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTimeFormatConstraint,
    });
  };
}
