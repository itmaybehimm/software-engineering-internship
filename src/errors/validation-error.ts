type ValidationErrorDetail = {
  [key: string]: {
    [constraint: string]: string; // The validation rule and its error message
  };
};

export class ValidationError extends Error {
  errors: Array<ValidationErrorDetail>;
  statusCode: number;

  constructor(errors: Array<ValidationErrorDetail>) {
    super('Validation failed');
    this.statusCode = 400;
    this.errors = errors;
    this.name = 'ValidationError';
  }
}
