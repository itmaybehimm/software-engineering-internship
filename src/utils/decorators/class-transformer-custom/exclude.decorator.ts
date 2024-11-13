/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';

export function CustomExclude(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    Reflect.defineMetadata('custom:exclude', true, target, propertyKey);
  };
}
