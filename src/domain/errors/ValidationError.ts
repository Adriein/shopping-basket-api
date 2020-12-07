import { CustomError } from './CustomError';

export class ValidationError extends CustomError {
  statusCode = 500;
  constructor(message: string = 'Something went wrong') {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serialize() {
    return [{ message: this.message }];
  }
}
