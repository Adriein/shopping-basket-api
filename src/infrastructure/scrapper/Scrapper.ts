import puppeteer from 'puppeteer';
import { Product } from '../../domain/entities/Product';
import { IScrapper } from '../../domain/interfaces';

export class Scrapper implements IScrapper {
  private readonly URL: string;
  private readonly MAX_PAGE: number;
  private pageNumber: number = 1;

  constructor(url: string, maxPage: number) {
    this.URL = url;
    this.MAX_PAGE = maxPage;
  }
  
  public async scrap(): Promise<Product[]> {
    const browser = await puppeteer.launch();
    const page = await this.gotoStart(browser);

    const result: Product[] = [];

    while (this.pageNumber <= this.MAX_PAGE) {
      const products: Product[] = (await this.scrapProducts(page)).map(
        ({ title, img }) => Product.create(title, img, 'mercadona')
      );

      result.push(...products);

      await page.goto(`${this.URL}/${(await this.currentPage(page)) + 1}`);
      await page.waitForSelector('ul.products');
      this.pageNumber++;
    }
    await browser.close();
    return result;
  }
  
  private async gotoStart(browser: puppeteer.Browser): Promise<puppeteer.Page> {
    const page = await browser.newPage();
    await page.goto(this.URL);
    await page.waitForSelector('ul.products');

    return page;
  }

  private async scrapProducts(
    page: puppeteer.Page
  ): Promise<{ title: string; img: string }[]> {
    return await page.evaluate(() => {
      const products: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
        'ul.products li a'
      );
      const data: { title: string; img: string }[] = [];
      for (let product of products) {
        const img: HTMLImageElement | null = product.querySelector('div img');
        data.push({ title: product.title, img: img!.src });
      }

      return data;
    });
  }

  private async currentPage(page: puppeteer.Page): Promise<number> {
    return await page.evaluate(() => {
      const pages: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
        'ul.pagination li.current a'
      );

      return parseInt(pages[0].innerHTML);
    });
  }
}
