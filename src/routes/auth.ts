import express, { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Repository, User } from '../core/entities';
import { RegisterUseCase, SignInUseCase } from '../core/usecases';
import { UserRepository } from '../infrastructure/repository';
import { maskFields } from '../core/helpers';
import { requireAuth } from './middlewares/auth';

const router: Router = express.Router();
const repository: Repository<User> = new UserRepository();
router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Creating the user
      const usecase = new RegisterUseCase(repository);
      const [user] = (await usecase.execute(req.body)).data as User[];

      const { id, username } = user;

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id,
          username,
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };

      //Mask dangerous fields
      const secureUser = maskFields(user, ['password']);

      res.status(201).send(secureUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signin',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new SignInUseCase(repository);
      const [user] = (await usecase.execute(req.body)).data as User[];

      const { id, username } = user;

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id,
          username,
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };

      //Mask dangerous fields
      const securedUser = maskFields(user, ['password']);

      res.status(200).send([securedUser]);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signout',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Signout the user
      req.session = null;
      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
);

export { router as auth };
