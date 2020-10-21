import { BaseRepository } from '../infrastructure/data/repository';
import { requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { IProduct, IRepository, IScrapper } from '../core/interfaces';
import { PopulateDatabaseUseCase } from '../core/usecases';
import { Scrapper } from '../infrastructure/scrapper/Scrapper';
import {ProductMapper} from '../infrastructure/data/Mappers/ProductMapper';

const router: Router = express.Router();
const scraperRepository: IRepository<IProduct> = new BaseRepository<IProduct>(
  'Product',
  new ProductMapper()
);

const scrapper: IScrapper = new Scrapper(
  'https://es.openfoodfacts.org/marca/mercadona',
  63
);

router.get(
  '/scrap',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const populateDbUseCase = new PopulateDatabaseUseCase(
        scraperRepository,
        scrapper
      );
      res.status(200).send((await populateDbUseCase.execute()).data);
    } catch (error) {
      next(error);
    }
  }
);

export { router as scrapping };
