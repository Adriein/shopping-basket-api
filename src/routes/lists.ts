import { currentUser, requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { IList, IRepository } from '../core/interfaces';
import {
  CreateListUseCase,
  GetListUseCase,
  UpdateListUseCase,
} from '../core/usecases';
import { ListMapper } from '../infrastructure/data/Mappers/ListMapper';
import { ListRepository } from '../infrastructure/data/repository/ListRepository';
import { List } from '../core/entities/List';

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
  '/list/:id',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getListUseCase = new GetListUseCase(listRepository);
      res.status(200).send((await getListUseCase.execute(req.params.id)).data);
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

router.put(
  '/list/:id',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateListUseCase = new UpdateListUseCase(listRepository);
      const list = List.create(req.body.title, req.body.users, req.body.status, req.body.products);
      res
        .status(200)
        .send((await updateListUseCase.execute(req.params.id, req.body)).data);
    } catch (error) {
      next(error);
    }
  }
);

export { router as lists };
