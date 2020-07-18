import {
  Repository,
  User,
  PushNotificationSubscription,
} from '../core/entities';
import {
  RegisterUseCase,
  SignInUseCase,
  RegisterPushSubscriptionUseCase,
} from '../core/usecases';
import {
  UserRepository,
  PushNotificationSubscriptionRepository,
} from '../infrastructure/repository';
import { maskFields } from '../core/helpers';
import { requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();
const userRepository: Repository<User> = new UserRepository();
const pushRepository: Repository<PushNotificationSubscription> = new PushNotificationSubscriptionRepository();

let pushSubscripton;

router.post('/notifications', async (req, res) => {
  pushSubscripton = req.body;
  console.log(pushSubscripton);

  // Server's Response
  res.status(201).json();
});

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Creating the user
      const usecase = new RegisterUseCase(userRepository);
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
      const signin = new SignInUseCase(userRepository);
      const subscription = new RegisterPushSubscriptionUseCase(pushRepository);

      const { username, password, registration } = req.body;

      const credentials = {
        username,
        password,
      };

      const [user] = (await signin.execute(credentials)).data as User[];

      subscription.execute(user.id!, registration);

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
