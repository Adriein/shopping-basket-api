import { BaseRepository } from '../infrastructure/data/repository';
import { requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { IProduct, IRepository } from '../core/interfaces';
import { ProductMapper } from '../infrastructure/data/Mappers/ProductMapper';
import { GetProductsUseCase } from '../core/usecases/products/GetProductsUseCase';

const router: Router = express.Router();
const productRepository: IRepository<IProduct> = new BaseRepository<IProduct>(
  'Product',
  new ProductMapper()
);

router.get(
  '/products',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {page, limit, search} = req.query;

      const getProductsUseCase = new GetProductsUseCase(productRepository);
      res.status(200).send((await getProductsUseCase.execute({page, limit, search})).data);
    } catch (error) {
      next(error);
    }
  }
);

export { router as products };
