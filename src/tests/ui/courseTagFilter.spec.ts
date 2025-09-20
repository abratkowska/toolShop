import { userData } from '../../test.data/user.data';
import { BasePage } from '../../pages/BasePage';
import { DashboardPage } from '../../pages/DashboardPage';
import { test } from '@playwright/test';

test.describe('Filter Courses by Tag', () => {
  let basePage: BasePage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    dashboardPage = new DashboardPage(page);
    await basePage.goto('/learning/welcome.html');
    await dashboardPage.clickSignIn(userData.test_user);
  });

  test('Display only beginner-level courses when filtered', async ({}) => {
    await dashboardPage.clickOnTags('API');
    await dashboardPage.verifyCourseTag();
  });

  test('Verify all course tags have proper attributes', async ({}) => {
    await dashboardPage.clickShowMoreForTags();
    await dashboardPage.verifyCourseTag();
    await dashboardPage.clickOnTags('API');
    await dashboardPage.verifyCourseLevelForTag('API');
  });
});
