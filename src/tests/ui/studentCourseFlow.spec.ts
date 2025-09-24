import { expect, test } from '@playwright/test';
import { BasePage } from '../../pages/BasePage';
import { DashboardPage } from '../../pages/DashboardPage';
import { CoursesPage } from '../../pages/CoursesPage';
import { userData } from '../../test.data/user.data';

test.describe('Student Course Flow', () => {
  let basePage: BasePage;
  let dashboardPage: DashboardPage;
  let coursesPage: CoursesPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    dashboardPage = new DashboardPage(page);
    await basePage.goto('/learning/welcome.html');
    await dashboardPage.clickSignIn(userData.test_user);
    coursesPage = new CoursesPage(page);
  });

  test('Student can browse courses list', async ({ page }) => {
    await coursesPage.expectAnyCourseVisible();
  });

  test('Student can access enrolled course content', async ({ page }) => {
    await coursesPage.goToMyCourses();
    await coursesPage.openFirstEnrolledCourse();
    await coursesPage.expectCourseContentVisible();
  });

  test('Student can enroll only specific course: AI in Testing', async ({}) => {
    const targetCourse = 'Playwright Automation Testing'
    await coursesPage.clickEnrollButtonForCourse(targetCourse);
    await coursesPage.goToMyCourses();
    await coursesPage.expectCourseVisibleInMyCourses(targetCourse);
  });
});
