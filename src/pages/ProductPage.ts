import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly productCard = this.page.locator('[class="card-title"]');
  readonly addToCart = this.page.locator('[data-test="add-to-cart"]');
  readonly navigationCart = this.page.locator('[data-test="nav-cart"]')

  async clickOnProductCard(productName: string): Promise<void> {
    await this.productCard.filter({ hasText: productName }).click();
  }

  async addProductToCart(): Promise<void> {
    await this.addToCart.click();
  }

  async verifyProductInShoppingCart(productName: string): Promise<Locator> {
    return this.page.locator(
      `[data-test="product-title"]:has-text("${productName}")`,
    );
  }
  async navigateToShoppingCart():Promise<void>{
    await this.navigationCart.click()
  }

}
