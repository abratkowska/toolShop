import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Add Product to Shopping Cart', () => {
  let basePage: BasePage;
  let productPage: ProductPage;
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    productPage = new ProductPage(page);
    await basePage.goto(basePage.baseUrl);
  });

  test('Add Combination Pliers to shopping cart and verify if is added', async ({}) => {
    await productPage.clickOnProductCard('Combination Pliers');
    await productPage.addProductToCart();
    await basePage.verifyToastNotification();
    await expect(basePage.toastNotification).toHaveText(
      ' Product added to shopping cart.',
    );
    await expect(basePage.toastNotification).not.toBeVisible();
    await productPage.navigateToShoppingCart();
    const productTitle =
      await productPage.verifyProductInShoppingCart('Combination Pliers');
    await expect(productTitle).toBeVisible();
  });
});
