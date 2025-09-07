import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/BasePage';
import { ProductPage } from '../../pages/ProductPage';

const productsToCheck = ['Slip Joint Pliers'];

test.describe('Add Products to Shopping Cart', () => {
  let basePage: BasePage;
  let productPage: ProductPage;
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    productPage = new ProductPage(page);
    await basePage.goto(basePage.baseUrl);
  });

  test('Add Combination Pliers to shopping cart and verify if is added', async () => {
    const productName = 'Combination Pliers';
    await productPage.clickOnProductCard(productName);
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
    const productName = 'Bolt Cutter';

    await productPage.clickOnProductCard('Combination Pliers');
    await productPage.addProductToCart();
    await basePage.verifyToastNotification();
    await expect(basePage.toastNotification).toHaveText(
      ' Product added to shopping cart.',
    );
    await page.goBack();
    await productPage.clickOnProductCard(productName);
    await productPage.addProductToCart();
    await expect(basePage.toastNotification).not.toBeVisible();
    await productPage.navigateToShoppingCart();
    const productsToCheck = ['Combination Pliers', 'Bolt Cutter'];
    await productPage.verifyProductInShoppingCart(productsToCheck, true);

    const countProduct = await basePage.getBasketItemsCount();
    expect(countProduct).toBe(2);
  });

  test('Add same product multiple times', async ({}) => {
    const productName = 'Combination Pliers';
    await productPage.clickOnProductCard(productName);
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
    const productName = 'Slip Joint Pliers';

    await productPage.clickOnProductCard(productName);
    await productPage.addProductToCart();
    await basePage.verifyToastNotification();
    await expect(basePage.toastNotification).toHaveText(
      ' Product added to shopping cart.',
    );
    await productPage.navigateToShoppingCart();
    await productPage.verifyProductInShoppingCart(productsToCheck, true);

    const countProduct = await basePage.getBasketItemsCount();
    expect(countProduct).toBe(1);
    await productPage.removeProductFromCart('Slip Joint Pliers');
    await expect(basePage.toastNotification).toHaveText(' Product deleted.');
    await productPage.verifyProductInShoppingCart(productsToCheck, false);
  });
});
