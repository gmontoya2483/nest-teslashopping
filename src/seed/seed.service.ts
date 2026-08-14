import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/see-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async runSeed() {
    await this.insertNewProducts();
    return 'Seed executed';
  }

  private async insertNewProducts() {
    await this.productService.deleteAllProducts();

    const insertPromises = initialData.products.map((product) =>
      this.productService.create(product),
    );
    await Promise.all(insertPromises);
    return true;
  }
}
