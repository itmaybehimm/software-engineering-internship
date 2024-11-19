/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthenticatedRequest } from '../../../types/authenticated-request';

export function Filtered() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: AuthenticatedRequest = args[0];

      // Ensure userFilter is present in the request
      if (!req?.userFilter) {
        throw new Error('User filter not found in request. Ensure middleware sets req.userFilter.');
      }

      const userFilterId = req.userFilter.userId;
      const filterCriteria = args[1] || {};
      const modifiedCriteria = { ...filterCriteria, userId: userFilterId };

      return await originalMethod.apply(this, [req, modifiedCriteria, ...args.slice(2)]);
    };

    return descriptor;
  };
}
