import { RegisterUseCase, SignInUseCase } from '../core/usecases';
import { BaseRepository } from '../infrastructure/data/repository';
import { maskFields } from '../core/helpers';
import { requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserMapper } from '../infrastructure/data/Mappers/UserMapper';
import { Repository, IUser } from '../core/interfaces';

const router: Router = express.Router();
const userRepository: Repository<IUser> = new BaseRepository<IUser>(
  'User',
  new UserMapper()
);

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Creating the user
      const usecase = new RegisterUseCase(userRepository);
      const [user] = (await usecase.execute(req.body)).data as IUser[];

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
      const secureUser = maskFields(user, ['password', 'id', 'creation']);

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
      const signin = new SignInUseCase(userRepository);
      const { username, password } = req.body;

      const credentials = {
        username,
        password,
      };

      const [user] = (await signin.execute(credentials)).data as IUser[];

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };

      //Mask dangerous fields
      const securedUser = maskFields(user, ['password', 'id', 'creation']);

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

router.get(
  '/test',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      require('../infrastructure/scrapper/OpenFoodFactScrapper');
      res.status(200).send({}); 
    } catch (error) {
      next(error);
    }
  }
);

export { router as auth };
