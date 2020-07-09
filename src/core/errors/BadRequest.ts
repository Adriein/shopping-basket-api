import { CustomError } from './CustomError';

export class BadRequest extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequest.prototype);
  }

  serialize() {
    return [{ message: this.message }];
  }
}
