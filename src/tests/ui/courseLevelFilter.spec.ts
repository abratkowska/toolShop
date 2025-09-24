import { userData } from '../../test.data/user.data';
import { BasePage } from '../../pages/BasePage';
import { DashboardPage } from '../../pages/DashboardPage';
import { expect, test } from '@playwright/test';

test.describe('Course Level Filtering', () => {
  let basePage: BasePage;
  let dashboardPage: DashboardPage;
  const levels = ['Beginner', 'Intermediate', 'Advanced'] as const;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    dashboardPage = new DashboardPage(page);
    await basePage.goto('/learning/welcome.html');
    await dashboardPage.clickSignIn(userData.test_user);
  });

  test('Filter courses by beginner level', async () => {
    await dashboardPage.filterCoursesByLevel('Beginner');
    await dashboardPage.verifyCourseLevelFilter('Beginner');
    const beginnerCourseCount =
      await dashboardPage.getCourseCountByLevel('Beginner');
    expect(beginnerCourseCount).toBeGreaterThan(0);
  });

  test('Filter courses by intermediate level', async () => {
    await dashboardPage.filterCoursesByLevel('Intermediate');
    await dashboardPage.verifyCourseLevelFilter('Intermediate');
    const intermediateCourseCount =
      await dashboardPage.getCourseCountByLevel('Intermediate');
    expect(intermediateCourseCount).toBeGreaterThan(0);
  });

  test('Filter courses by advanced level', async () => {
    await dashboardPage.filterCoursesByLevel('Advanced');
    await dashboardPage.verifyCourseLevelFilter('Advanced');
    const advancedCourseCount =
      await dashboardPage.getCourseCountByLevel('Advanced');
    expect(advancedCourseCount).toBeGreaterThan(0);
  });

  test('Filter courses by all levels then verify results for each', async () => {
    for (const level of levels) {
      await dashboardPage.filterCoursesByLevel(level);
      await dashboardPage.verifyCourseLevelFilter(level);
      expect(await dashboardPage.getCourseCountByLevel(level)).toBeGreaterThan(
        0,
      );
    }
  });
});
