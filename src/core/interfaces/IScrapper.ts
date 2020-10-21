import { Product } from "../entities/Product";

export interface IScrapper {
  scrap(): Promise<Product[]>;
}
