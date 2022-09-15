import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import * as mongodb from 'mongodb';

export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: '$property must be a  ObjectId',
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return !mongodb.ObjectId.isValid(value);
        },
      },
    });
  };
}
