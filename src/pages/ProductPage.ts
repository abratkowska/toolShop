import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly productCard = this.page.locator('[class="card-title"]');
  readonly addToCart = this.page.locator('[data-test="add-to-cart"]');
  readonly navigationCart = this.page.locator('[data-test="nav-cart"]');
  readonly increaseProductItemButton = this.page.locator(
    '[data-test="increase-quantity"]',
  );

  async clickOnProductCard(productName: string): Promise<void> {
    await this.productCard.filter({ hasText: productName }).click();
  }

  async addProductToCart(): Promise<void> {
    await this.addToCart.click();
  }

  async addProductToCartMultipleTimes(count: number = 1): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.increaseProductItemButton.click();
    }
  }

  async verifyProductInShoppingCart(
    productNames: string[],
    isVisible: boolean,
  ): Promise<void> {
    for (const name of productNames) {
      const locator = this.page.locator(
        `[data-test="product-title"]:has-text("${name}")`,
      );

      if (isVisible) {
        await expect(locator).toBeVisible();
      } else {
        await expect(locator).not.toBeVisible();
      }
    }
  }
  async navigateToShoppingCart(): Promise<void> {
    await this.navigationCart.click();
  }

  async getProductQuantityLocator(productName: string): Promise<Locator> {
    const quantityLocator = this.page.locator(`
      tr:has-text("${productName}") >> [data-test="product-quantity"]
    `);
    await quantityLocator.waitFor({ state: 'visible', timeout: 5000 });
    return quantityLocator;
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const removeButton = this.page.locator(`
      tr:has-text("${productName}") >> .btn-danger
    `);
    await removeButton.click();
  }
}
