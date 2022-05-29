import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(private errors: ValidationError[]) {
    super('Request validation parameters failed');
    // Only beacuse we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((err) => ({ message: err.msg, field: err.param }));
  }
}
