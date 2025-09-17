import { userData } from '../../test.data/user.data';
import { BasePage } from '../../pages/BasePage';
import { DashboardPage } from '../../pages/DashboardPage';
import { test } from '@playwright/test';

test.describe('Sign In to Dashboard', () => {
  let basePage: BasePage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    dashboardPage = new DashboardPage(page);
    await basePage.goto('/learning/welcome.html');
  });

  test('Sign In to Dashboard ', async ({}) => {
    await dashboardPage.clickSignIn(userData.test_user);
  });
});
