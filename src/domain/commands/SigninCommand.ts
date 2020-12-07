import { ICommand } from '../interfaces';

export class SigninCommand implements ICommand {
  constructor(public username: string, public password: string) {}
}
