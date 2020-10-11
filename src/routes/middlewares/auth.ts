import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../../core/errors';

interface UserPayload {
  id: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!req.session || !req.session.jwt) {
    throw new NotAuthorizedError();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    const userJwt = jwt.sign(
      {
        id: payload.id,
        uername: payload.username,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };
    next();
  } catch (err) {
    throw new NotAuthorizedError();
  }
};
