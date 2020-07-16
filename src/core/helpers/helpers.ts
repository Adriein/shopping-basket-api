import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export const isEmpty = (obj: Object) => {
  return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
};

export const toHash = async (password: string) => {
  const salt = randomBytes(8).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${buf.toString('hex')}-${salt}`;
};

export const compare = async (
  storedPassword: string,
  suppliedPassword: string
) => {
  const [hashedPassword, salt] = storedPassword.split('-');
  const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

  return buf.toString('hex') === hashedPassword;
};

export const maskFields = (object: any, array: string[]): Object => {
  Object.keys(object).forEach((key) => {
    array.forEach((element) => {
      if (element === key) {
        delete object[key];
      }
    });
  });
  return object;
};

export const isEqual = (a: any, b: any) =>
  a.length === b.length && a.every((v: any, i: any) => JSON.stringify(v) === JSON.stringify(b[i]));
