import { validate } from 'class-validator';
import { ValidationError } from '../../errors/validation-error';

// Helper function to validate and throw errors
export async function validateDto<T extends object>(dto: T) {
  const validationErrors = await validate(dto);

  if (validationErrors.length > 0) {
    const formattedErrors = validationErrors.map((error) => ({
      [error.property]: error.constraints,
    }));

    throw new ValidationError(formattedErrors);
  }
}
