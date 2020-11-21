import { generateShortId, generateUuid, hash } from '../helpers';

export class User {
  private id: string;
  private publicId: string;
  private username: string;
  private password: string;
  private creation: Date;
  private followers: User[] | undefined;

  constructor(
    id: string,
    username: string,
    password: string,
    publicId: string,
    creation: Date,
    followers?: User[]
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.publicId = publicId;
    this.creation = creation;
    this.followers = followers;
  }

  public getPublicId(): string {
    return this.publicId;
  }

  public getId(): string {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }

  public getCreation(): Date {
    return this.creation;
  }

  public getFollowers(): User[] | undefined {
    return this.followers;
  }

  public setFollowers(followers: User[]): void {
    this.followers = [...this.followers!, ...followers];
  }

  public static create(username: string, password: string) {
    return new User(
      generateUuid(),
      username,
      password,
      generateShortId(),
      new Date()
    );
  }

  public async hashPassword(): Promise<void> {
    this.password = await hash(this.password);
  }
}
