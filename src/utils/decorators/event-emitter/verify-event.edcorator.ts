/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from 'events';

export function VerifyEvent(eventName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    if (typeof originalMethod !== 'function') {
      throw new Error('@VerifyEvent can only be applied to methods');
    }

    descriptor.value = async function (...args: any[]) {
      const eventBus: EventEmitter = this.eventBus; // Assuming `this.eventBus` exists in the class

      if (!eventBus || !(eventBus instanceof EventEmitter)) {
        throw new Error('No EventEmitter instance found on "this.eventBus".');
      }

      // Flag to check if the event is emitted
      let eventEmitted = false;

      // Event listener to mark if the event is emitted
      const eventListener = () => {
        eventEmitted = true;
      };

      // Add event listener for the specific event
      eventBus.on(eventName, eventListener);

      try {
        // Call the original method
        const result = await originalMethod.apply(this, args);

        // Check if the event was emitted
        if (!eventEmitted) {
          throw new Error(`Event "${eventName}" was not emitted.`);
        }

        return result;
      } finally {
        // Cleanup: remove the event listener to prevent memory leaks
        eventBus.off(eventName, eventListener);
      }
    };

    return descriptor;
  };
}
