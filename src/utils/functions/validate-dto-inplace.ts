import { validate } from 'class-validator';
import { Request } from 'express';
import { ValidationError } from '../../errors/validation-error';

// Validate and assign request body to DTO
export async function validateBodyAndAssignInPlace<T extends object>(dto: T, req: Request) {
  // Assign values from body in place
  Object.assign(dto, req.body);

  await validateRequest(dto);
}

// Validate and assign query parameters to DTO
export async function validateQueryAndAssignInPlace<T extends object>(dto: T, req: Request) {
  // Assign values from query in place
  Object.assign(dto, req.query);

  await validateRequest(dto);
}

// Validate and assign route params to DTO
export async function validateParamsAndAssignInPlace<T extends object>(dto: T, req: Request) {
  // Assign values from params in place
  Object.assign(dto, req.params);

  await validateRequest(dto);
}

// Helper function to validate and throw errors
async function validateRequest<T extends object>(dto: T) {
  const validationErrors = await validate(dto);

  if (validationErrors.length > 0) {
    const formattedErrors = validationErrors.map((error) => ({
      [error.property]: error.constraints,
    }));

    throw new ValidationError(formattedErrors);
  }
}
