import { maskFields } from '../domain/helpers';
import { requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../domain/entities';
import { CommandBus } from '../application/CommandBus/CommandBus';
import { RegisterUserCommand } from '../domain/commands';

const router: Router = express.Router();

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commandBus = new CommandBus();

      const command = new RegisterUserCommand(
        req.body.username,
        req.body.password
      );

      const user: User = await commandBus.execute(command);

      const id = user.getId();
      const username = user.getPassword();

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

      res
        .status(201)
        .send({ username: user.getUsername(), publicId: user.getPublicId });
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

      const [user] = (await signin.execute(credentials)).data as User[];

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: user.getId(),
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

export { router as auth };
