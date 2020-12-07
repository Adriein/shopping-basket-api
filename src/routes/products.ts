import { BaseRepository } from '../infrastructure/data/repository';
import { requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { IRepository } from '../domain/interfaces';
import { ProductMapper } from '../infrastructure/data/Mappers/ProductMapper';
import { GetProductsUseCase } from '../domain/usecases/products/GetProductsUseCase';
import { Product } from '../domain/entities';

const router: Router = express.Router();
const productRepository: IRepository<Product> = new BaseRepository<Product>(
  'Product',
  new ProductMapper()
);

router.get(
  '/products',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, search } = req.query;

      const getProductsUseCase = new GetProductsUseCase(productRepository);
      res
        .status(200)
        .send((await getProductsUseCase.execute({ page, limit, search })).data);
    } catch (error) {
      next(error);
    }
  }
);

export { router as products };
