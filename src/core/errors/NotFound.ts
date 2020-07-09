import { CustomError } from './CustomError';

export class NotFound extends CustomError {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFound.prototype);
  }

  serialize() {
    return [{ message: this.message }];
  }
}
