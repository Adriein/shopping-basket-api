import { ICommand } from "../interfaces";

export class RegisterUserCommand implements ICommand{
  constructor(public username: string, public password: string) {}
}
