import { BaseRepository } from '../infrastructure/data/repository';
import { currentUser, requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { IRepository, IUser, IUserToFriend } from '../core/interfaces';
import { UserMapper } from '../infrastructure/data/Mappers/UserMapper';
import { AgregateFriendUseCase, GetFriendsUseCase } from '../core/usecases';
import { UserToFriendMapper } from '../infrastructure/data/Mappers/UserToFriendMapper';

const router: Router = express.Router();
const usersRepository: IRepository<IUser> = new BaseRepository<IUser>(
  'User',
  new UserMapper()
);

const userToFriendRepository: IRepository<IUserToFriend> = new BaseRepository<
  IUserToFriend
>('UserToFriend', new UserToFriendMapper());

router.get(
  '/friend',
  requireAuth,
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getFriendsUseCase = new GetFriendsUseCase(
        userToFriendRepository
      );
      res
        .status(200)
        .send((await getFriendsUseCase.execute(req.currentUser!.id)).data);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/friend',
  requireAuth,
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agregateFriendUseCase = new AgregateFriendUseCase(
        usersRepository,
        userToFriendRepository
      );
      res
        .status(200)
        .send(
          (await agregateFriendUseCase.execute(req.body, req.currentUser!.id))
            .data
        );
    } catch (error) {
      next(error);
    }
  }
);

export { router as users };
