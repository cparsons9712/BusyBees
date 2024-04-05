import { registerDecorator, ValidationOptions } from 'class-validator';

export const TimeUnit: { [unit: string]: number } = {
  Day: 1,
  Week: 7,
  Month: 30,
  Quarterly: 91,
};

export function IsTimeUnit(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTimeUnit',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return Object.values(TimeUnit).includes(value); // Your validation logic
        },
      },
    });
  };
}
