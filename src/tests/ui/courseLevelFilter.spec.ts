import { userData } from '../../test.data/user.data';
import { BasePage } from '../../pages/BasePage';
import { DashboardPage } from '../../pages/DashboardPage';
import { expect, test } from '@playwright/test';

test.describe('Course Level Filtering', () => {
  let basePage: BasePage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    dashboardPage = new DashboardPage(page);
    await basePage.goto('/learning/welcome.html');
    await dashboardPage.clickSignIn(userData.test_user);
  });

  test('Filter courses by beginner level', async () => {
    await dashboardPage.filterCoursesByLevel('beginner');
    await dashboardPage.verifyCourseLevelFilter('beginner');
    const beginnerCourseCount =
      await dashboardPage.getCourseCountByLevel('beginner');
    expect(beginnerCourseCount).toBeGreaterThan(0);
  });

  test('Filter courses by intermediate level', async () => {
    await dashboardPage.filterCoursesByLevel('intermediate');
    await dashboardPage.verifyCourseLevelFilter('intermediate');
    const intermediateCourseCount =
      await dashboardPage.getCourseCountByLevel('intermediate');
    expect(intermediateCourseCount).toBeGreaterThan(0);
  });

  test('Filter courses by advanced level', async () => {
    await dashboardPage.filterCoursesByLevel('advanced');
    await dashboardPage.verifyCourseLevelFilter('advanced');
    const advancedCourseCount =
      await dashboardPage.getCourseCountByLevel('advanced');
    expect(advancedCourseCount).toBeGreaterThan(0);
  });
});
