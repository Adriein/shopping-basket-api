import { BaseRepository } from '../infrastructure/data/repository';
import { currentUser, requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { IRepository } from '../core/interfaces';
import { UserMapper } from '../infrastructure/data/Mappers/UserMapper';
import { FollowUseCase, GetFollowersUseCase } from '../core/usecases';
import { User } from '../core/entities';

const router: Router = express.Router();

const userRepository: IRepository<User> = new BaseRepository<User>(
  'User',
  new UserMapper()
);

router.get(
  '/followers',
  requireAuth,
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getFriendsUseCase = new GetFollowersUseCase(userRepository);
      res
        .status(200)
        .send((await getFriendsUseCase.execute(req.currentUser!.id)).data);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/follow',
  requireAuth,
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agregateFriendUseCase = new FollowUseCase(userRepository);
      res
        .status(200)
        .send(
          (
            await agregateFriendUseCase.execute({
              publicId: req.body.publicId,
              currentUserId: req.currentUser!.id,
            })
          ).data
        );
    } catch (error) {
      next(error);
    }
  }
);

export { router as users };
