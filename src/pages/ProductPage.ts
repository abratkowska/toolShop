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
  async selectSortOption(optionLabel: string): Promise<void> {
    const sortDropdown = this.page.locator('select[data-test="sort"]');
    await sortDropdown.selectOption({ label: optionLabel });
  }

  async getProductNames(): Promise<string[]> {
    const productTitles = this.page.locator(
      '[data-test="sorting_completed"] [data-test="product-name"]',
    );
    await productTitles.first().waitFor({ state: 'visible' });
    const names = await productTitles.allTextContents();
    return names;
  }

  async getProductPrices(): Promise<number[]> {
    const priceLocators = this.page.locator(
      '[data-test="sorting_completed"] [data-test="product-price"]',
    );

    await priceLocators.first().waitFor({ state: 'visible' });
    const priceStrings = await priceLocators.allTextContents();
    const prices = priceStrings.map((price) => Number(price.replace('$', '')));

    return prices;
  }

  async checkCategory(categoryProductNumber: string): Promise<void> {
    const click = this.page.locator(
      `[data-test="category-${categoryProductNumber}"]`,
    );
    await click.click();
  }

  async hasProductWithName(expectedName: string): Promise<boolean> {
    const names = await this.getProductNames();
    return names.some((name) => name.includes(expectedName));
  }

  async isProductCardVisible(productName: string): Promise<boolean> {
    const locator = this.page.locator(`text="${productName}"`);
    return await locator.isVisible().catch(() => false);
  }

  async tryAddNonExistentProduct(productName: string): Promise<boolean> {
    const isVisible = await this.isProductCardVisible(productName);
    if (isVisible) {
      await this.clickOnProductCard(productName);
      await this.addProductToCart();
      // Optionally: check for toast notification or error message
      return true;
    }
    return false;
  }
}
