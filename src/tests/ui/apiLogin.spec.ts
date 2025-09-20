import { userData } from '../../test.data/user.data';
import { BasePage } from '../../pages/BasePage';
import { DashboardPage } from '../../pages/DashboardPage';
import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('API Login Tests', () => {
  let basePage: BasePage;
  let dashboardPage: DashboardPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    dashboardPage = new DashboardPage(page);
    loginPage = new LoginPage(page);
    await basePage.goto('/learning/welcome.html');
  });

  test('Login via API with correct credentials', async ({ page }) => {
    // Step 1: Login via API
    const { test_user } = userData;

    await loginPage.loginViaAPI(page, test_user);
    await basePage.goto('/learning/welcome.html');

    await expect(dashboardPage.dashboardHeader).toBeVisible();
  });
});
