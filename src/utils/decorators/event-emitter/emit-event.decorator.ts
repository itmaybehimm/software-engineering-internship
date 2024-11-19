/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from 'events';

export function EmitEvent(eventName: string, dataExtractor?: (args: any[], result: any) => any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    if (typeof originalMethod !== 'function') {
      throw new Error('@EmitEvent can only be applied to methods');
    }

    descriptor.value = async function (...args: any[]) {
      const eventBus: EventEmitter = this.eventBus;

      if (!eventBus || !(eventBus instanceof EventEmitter)) {
        throw new Error('No EventEmitter instance found on "this.eventBus".');
      }

      const result = await originalMethod.apply(this, args);

      const eventData = dataExtractor ? dataExtractor(args, result) : result;

      eventBus.emit(eventName, eventData);

      // Return the original result
      return result;
    };

    return descriptor;
  };
}
