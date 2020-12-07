import { CustomError } from './CustomError';

export class UnExpectedError extends CustomError {
  statusCode = 500;
  constructor(message: string = 'Something went wrong') {
    super(message);
    Object.setPrototypeOf(this, UnExpectedError.prototype);
  }

  serialize() {
    return [{ message: this.message }];
  }
}
