import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsAfterConstraint implements ValidatorConstraintInterface {
  validate(endTime: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const startTime = (args.object as any)[relatedPropertyName];
    return (
      typeof startTime === 'string' &&
      typeof endTime === 'string' &&
      endTime > startTime
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.property}" must be after "${args.constraints[0]}"`;
  }
}

function IsAfter(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsAfterConstraint,
    });
  };
}

export default IsAfter;
