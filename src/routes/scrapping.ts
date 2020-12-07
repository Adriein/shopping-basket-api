import { BaseRepository } from '../infrastructure/data/repository';
import { requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { IRepository, IScrapper } from '../domain/interfaces';
import { PopulateDatabaseUseCase } from '../domain/usecases';
import { Scrapper } from '../infrastructure/scrapper/Scrapper';
import { ProductMapper } from '../infrastructure/data/Mappers/ProductMapper';
import { Product } from '../domain/entities';

const router: Router = express.Router();
const productRepository: IRepository<Product> = new BaseRepository<Product>(
  'Product',
  new ProductMapper()
);

const mercadonaScrapper: IScrapper = new Scrapper(
  'https://es.openfoodfacts.org/marca/mercadona',
  63
);

const hacendadoScrapper: IScrapper = new Scrapper(
  'https://es.openfoodfacts.org/marca/hacendado',
  209
);

router.get(
  '/scrap',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const populateMercadonaProducts = new PopulateDatabaseUseCase(
        productRepository,
        mercadonaScrapper
      );
      const populateHacendadoProducts = new PopulateDatabaseUseCase(
        productRepository,
        hacendadoScrapper
      );

      const [mercadonaResults] = (
        await populateMercadonaProducts.execute()
      ).data;
      const [hacendadoResults] = (
        await populateHacendadoProducts.execute()
      ).data;

      const result = mercadonaResults + hacendadoResults;
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router as scrapping };
