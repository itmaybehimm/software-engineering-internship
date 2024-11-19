import { validateSync } from 'class-validator';
import { ValidationError } from '../../errors/validation-error';

// Helper function to validate and throw errors
export function validateDto<T extends object>(dto: T) {
  const validationErrors = validateSync(dto);

  if (validationErrors.length > 0) {
    const formattedErrors = validationErrors.map((error) => ({
      [error.property]: error.constraints,
    }));

    throw new ValidationError(formattedErrors);
  }
}
