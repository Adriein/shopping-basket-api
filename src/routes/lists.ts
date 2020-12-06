import { currentUser, requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { IRepository } from '../core/interfaces';
import {
  CreateListUseCase,
  GetListUseCase,
  UpdateListProductUseCase,
  UpdateListUseCase,
} from '../core/usecases';
import { ListMapper } from '../infrastructure/data/Mappers/ListMapper';
import { ListRepository } from '../infrastructure/data/repository/ListRepository';
import { List } from '../core/entities/List';
import { Product, User } from '../core/entities';
import { BaseRepository } from '../infrastructure/data/repository';
import { UserMapper } from '../infrastructure/data/Mappers/UserMapper';
import { CreateListRequest, UpdateListProductRequest } from '../core/request';
import { UpdateListRequest } from '../core/request/UpdateListRequest';
import { ProductToListMapper } from '../infrastructure/data/Mappers/ProductToListMapper';

const router: Router = express.Router();

const listRepository: IRepository<List> = new ListRepository(
  'List',
  new ListMapper()
);

const productRepository: IRepository<Product> = new BaseRepository(
  'Product',
  new ProductToListMapper()
);

const usersRepository: IRepository<User> = new BaseRepository(
  'User',
  new UserMapper()
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
      const createListUseCase = new CreateListUseCase(
        listRepository,
        usersRepository
      );

      const request: CreateListRequest = {
        title: req.body.title,
        users: req.body.users.map(
          (user: any) => new User(user.id, user.username, '', '', new Date())
        ),
        products: req.body.products.map(
          (product: any) =>
            new Product(
              product.id,
              product.name,
              product.img,
              product.supermarket,
              product.status,
              product.user,
              product.quantity
            )
        ),
      };

      res
        .status(200)
        .send(
          (await createListUseCase.execute(request, req.currentUser!.id)).data
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
      const request: UpdateListRequest = {
        id: req.params.id,
        title: req.body.title,
        users: req.body.users.map(
          (user: any) => new User(user.id, user.username, '', '', new Date())
        ),
        status: req.body.status,
        products: req.body.products.map(
          (product: any) =>
            new Product(
              product.id,
              product.name,
              product.img,
              product.supermarket,
              product.status,
              product.user,
              product.quantity
            )
        ),
      };
      res.status(200).send((await updateListUseCase.execute(request)).data);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/list/:listId/product/:productId',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateListUseCase = new UpdateListProductUseCase(productRepository);
      const request: UpdateListProductRequest = {
        product: new Product(
          req.params.productId,
          req.body.name,
          req.body.img,
          req.body.supermarket,
          req.body.status,
          req.body.user,
          req.body.quantity,
          req.params.listId
        ),
      };
      res.status(200).send((await updateListUseCase.execute(request)).data);
    } catch (error) {
      next(error);
    }
  }
);

export { router as lists };
