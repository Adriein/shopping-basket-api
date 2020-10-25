import { currentUser, requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { IList, IRepository } from '../core/interfaces';
import { CreateListUseCase, GetListUseCase } from '../core/usecases';
import { ListMapper } from '../infrastructure/data/Mappers/ListMapper';
import { ListRepository } from '../infrastructure/data/repository/ListRepository';

const router: Router = express.Router();
const listRepository: IRepository<IList> = new ListRepository(
  'List',
  new ListMapper()
);

router.get(
  '/lists',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getListUseCase = new GetListUseCase(listRepository);
      res.status(200).send((await getListUseCase.execute()).data);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/list',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getListUseCase = new GetListUseCase(listRepository);
      res.status(200).send((await getListUseCase.execute(req.body)).data);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/list',
  requireAuth,
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createListUseCase = new CreateListUseCase(listRepository);
      res
        .status(200)
        .send(
          (await createListUseCase.execute(req.body, req.currentUser!.id)).data
        );
    } catch (error) {
      next(error);
    }
  }
);

// router.put(
//   '/list',
//   requireAuth,
//   currentUser,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const agregateFriendUseCase = new AgregateFriendUseCase(
//         usersRepository,
//         userToFriendRepository
//       );
//       res
//         .status(200)
//         .send(
//           (await agregateFriendUseCase.execute(req.body, req.currentUser!.id))
//             .data
//         );
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export { router as lists };
