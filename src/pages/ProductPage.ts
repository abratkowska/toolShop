import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly ProductCard = this.page.locator('[class="card-title"]');
  readonly addToCard = this.page.locator('[data-test="add-to-cart"]');

  async clickOnProductCard(productName: string): Promise<void> {
    await this.ProductCard.filter({ hasText: productName }).click();
  }

  async addProductToCard(): Promise<void> {
    await this.addToCard.click();
  }
}
