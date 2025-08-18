import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Verify login', () => {
  let basePage: BasePage;
  let productPage: ProductPage;
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    productPage = new ProductPage(page);
    await basePage.goto(basePage.baseUrl);
  });

  test('Add Combination Pilers to shoping card and verify if is added', async ({
    page,
  }) => {
    await productPage.clickOnProductCard('Combination Pliers');
    await productPage.addProductToCard();
    await basePage.verifyToastNotification();
    await expect(basePage.toastNotification).toHaveText(
      ' Product added to shopping cart.',
    );
  });
});
