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
    const productsToCheck = ['Combination Pliers'];
    await productPage.verifyProductInShoppingCart(productsToCheck, true);

    const countProduct = await basePage.getBasketItemsCount();
    expect(countProduct).toBe(1);
  });

  test('Add 2 different products', async ({ page }) => {
    await productPage.clickOnProductCard('Pliers');
    await productPage.addProductToCart();
    await basePage.verifyToastNotification();
    await expect(basePage.toastNotification).toHaveText(
      ' Product added to shopping cart.',
    );
    await page.goBack();
    await productPage.clickOnProductCard('Bolt Cutter');
    await productPage.addProductToCart();
    await expect(basePage.toastNotification).not.toBeVisible();
    await productPage.navigateToShoppingCart();
    const productsToCheck = ['Combination Pliers', 'Bolt Cutter'];
    await productPage.verifyProductInShoppingCart(productsToCheck, true);

    const countProduct = await basePage.getBasketItemsCount();
    expect(countProduct).toBe(2);
  });

  test('Add same product multiple times', async ({}) => {
    await productPage.clickOnProductCard('Combination Pliers');
    await productPage.addProductToCartMultipleTimes(2);
    await productPage.addProductToCart();
    await basePage.verifyToastNotification();
    await expect(basePage.toastNotification).toHaveText(
      ' Product added to shopping cart.',
    );
    await productPage.navigateToShoppingCart();
    const quantityLocator =
      await productPage.getProductQuantityLocator('Combination Pliers');
    await expect(quantityLocator).toHaveValue('3');
  });

  test('Remove product from cart', async ({}) => {
    await productPage.clickOnProductCard('Slip Joint Pliers');
    await productPage.addProductToCart();
    await basePage.verifyToastNotification();
    await expect(basePage.toastNotification).toHaveText(
      ' Product added to shopping cart.',
    );
    await productPage.navigateToShoppingCart();
    const productsToCheck = ['Slip Joint Pliers'];
    await productPage.verifyProductInShoppingCart(productsToCheck, true);

    const countProduct = await basePage.getBasketItemsCount();
    expect(countProduct).toBe(1);
    await productPage.removeProductFromCart('Slip Joint Pliers');
    await expect(basePage.toastNotification).toHaveText(' Product deleted.');
    await productPage.verifyProductInShoppingCart(productsToCheck, false);
  });
});
