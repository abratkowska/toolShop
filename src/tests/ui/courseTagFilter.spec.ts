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
    await dashboardPage.logIn(userData.test_user);
  });

  test('Verify all course with tag API', async ({}) => {
    await dashboardPage.clickOnTags('API');
    await dashboardPage.verifyCourseTag();
  });

  test('Verify all course with tag Basics', async ({}) => {
    await dashboardPage.clickOnTags('Basics');
    await dashboardPage.verifyCourseTag();
  });

  test('Filters by single tag shows matching courses', async ({}) => {
    await dashboardPage.clickOnTags('JavaScript');
    await dashboardPage.verifyCourseLevelForTag('JavaScript');
    const total = await dashboardPage.getTotalCourseCount();
    test.expect(total).toBeGreaterThan(0);
  });

  test('Deselecting a tag increases or restores course count', async ({}) => {
    await dashboardPage.clickOnTags('API');
    const countWithTag = await dashboardPage.getTotalCourseCount();
    await dashboardPage.clickOnTags('API');
    const countAfterToggle = await dashboardPage.getTotalCourseCount();
    test.expect(countAfterToggle).toBeGreaterThanOrEqual(countWithTag);
  });

  test('Click multiple tags then verify each tag is present', async ({}) => {
    const tags = ['API', 'Basics', 'JavaScript'];
    for (const tag of tags) {
      await dashboardPage.clickOnTags(tag);
    }
    for (const tag of tags) {
      await dashboardPage.verifyCourseLevelForTag(tag);
    }
  });

  test('Verify courses after selecting multiple tags', async ({}) => {
    const tags = ['API', 'Basics'];
    for (const tag of tags) {
      await dashboardPage.clickOnTags(tag);
    }
    for (const tag of tags) {
      await dashboardPage.verifyCourseLevelForTag(tag);
    }
  });
});
