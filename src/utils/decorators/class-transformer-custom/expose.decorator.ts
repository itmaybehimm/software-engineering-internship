/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';

export function CustomExpose(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    Reflect.defineMetadata('custom:expose', true, target, propertyKey);
  };
}
