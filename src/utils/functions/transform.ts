import 'reflect-metadata';

export function customPlainToClass<T>(dtoClass: new () => T, source: T): T {
  const dtoInstance = new dtoClass();
  Object.keys(dtoInstance).forEach((key) => {
    const shouldInclude =
      Reflect.hasMetadata('custom:expose', dtoInstance, key) &&
      !Reflect.hasMetadata('custom:exclude', dtoInstance, key);
    if (shouldInclude && source[key] !== undefined) {
      dtoInstance[key] = source[key];
    }
  });
  return dtoInstance;
}
