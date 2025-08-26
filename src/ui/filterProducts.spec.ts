import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Sort Products', () => {
  let basePage: BasePage;
  let productPage: ProductPage;
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    productPage = new ProductPage(page);
    await basePage.goto(basePage.baseUrl);
  });

  test('Sort products alphabetical A-Z and verify if they are sorted', async ({}) => {
    await productPage.selectSortOption('Name (A - Z)');
    const actualProductNames = await productPage.getProductNames();
    const sortedProductNames = [...actualProductNames].sort();
    expect(actualProductNames).toEqual(sortedProductNames);
  });

  test('Sort products alphabetical Z-A and verify if they are sorted', async ({}) => {
    await productPage.selectSortOption('Name (Z - A)');
    const actualProductNames = await productPage.getProductNames();
    const sortedProductNames = [...actualProductNames].sort().reverse();
    expect(actualProductNames).toEqual(sortedProductNames);
  });

  test('Sort products by price Price (High - Low) verify if they are sorted', async ({}) => {
    await productPage.selectSortOption('Price (High - Low)');
    const actualPrices = await productPage.getProductPrices();
    const expectedPrices = [...actualPrices].sort((a, b) => b - a);
    expect(actualPrices).toEqual(expectedPrices);
  });

  test('Sort products by price Price (Low - High) verify if they are sorted', async ({}) => {
    await productPage.selectSortOption('Price (Low - High)');
    const actualPrices = await productPage.getProductPrices();
    const expectedPrices = [...actualPrices].sort((a, b) => a - b);
    expect(actualPrices).toEqual(expectedPrices);
  });
// To jeszcze nie działa 
//   test('should show only Hammer products when sorted by category Hammer', async ({}) => {
//     await productPage.checkCategory('01K3E9G4DQ7XYEGVN993SNVZ1C');
//     const hasHammer = await productPage.hasProductWithName('Hammer');
//     expect(hasHammer).toBeTruthy();
//     const names = await productPage.getProductNames();
//     for (const name of names) {
//       expect(name).toContain('Hammer');
//     }
//   });
});
