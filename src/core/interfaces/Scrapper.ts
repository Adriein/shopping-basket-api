import { Product } from "../entities/Product";

export interface Scrapper {
  scrap(): Promise<Product[]>;
}
