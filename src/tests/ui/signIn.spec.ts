import { userData } from '../../test.data/user.data';
import { BasePage } from '../../pages/BasePage';
import { DashboardPage } from '../../pages/DashboardPage';
import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Sign In to Dashboard', () => {
  let basePage: BasePage;
  let dashboardPage: DashboardPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    dashboardPage = new DashboardPage(page);
    loginPage = new LoginPage(page);

    await basePage.goto('/learning/welcome.html');
  });

  test('Sign In to Dashboard with correct credentials', async ({}) => {
    await dashboardPage.logIn(userData.test_user);
    await expect(dashboardPage.dashboardHeader).toBeVisible();
  });

  test('Sign In to Dashboard with incorrect credentials', async ({ page }) => {
    await dashboardPage.logIn(userData.nonExistingAccount);
    await loginPage.verifyInvalidLogin();
  });
});
