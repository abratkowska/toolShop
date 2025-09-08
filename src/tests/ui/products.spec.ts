import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/BasePage';
import { ProductPage } from '../../pages/ProductPage';

const nonExistentProducts = [
  'Invisible Hammer',
  'Ghost Wrench',
  'Phantom Screwdriver',
  'Magic Saw',
  'Unicorn Drill',
];

test.describe('Non-existent Products', () => {
  let basePage: BasePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    productPage = new ProductPage(page);
    await basePage.goto(basePage.baseUrl);
  });

  test('Try to add 5 non-existent products and make soft assertions', async () => {
    for (const productName of nonExistentProducts) {
      const added = await productPage.tryAddNonExistentProduct(productName);
      expect.soft(added).toBeFalsy();
    }
  });
  test('Try to add 5 non-existent products and make hard assertions', async () => {
    for (const productName of nonExistentProducts) {
      const added = await productPage.tryAddNonExistentProduct(productName);
      expect(added).toBeFalsy();
    }
  });

  test('Try to add 5 non-existent products and make soft assertions with Promise.all', async () => {
    await Promise.all(
      nonExistentProducts.map(async (productName) => {
        const added = await productPage.tryAddNonExistentProduct(productName);
        expect.soft(added).toBeFalsy();
      }),
    );
  });
});
