import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CoursesPage extends BasePage {
  readonly courseCardsRoot = this.page.locator(
    '.course-card, .course-item, [class*="course"]',
  );
  readonly myCoursesLink = this.page.locator('[name="my-courses"]');

  async expectAnyCourseVisible(): Promise<void> {
    const list = this.page.locator(
      '.course-card, .course-item, [class*="course"]',
    );
    await expect(list.first()).toBeVisible();
    expect(await list.count()).toBeGreaterThan(0);
  }

  async enrollFirstCourse(): Promise<void> {
    const course = this.courseCardsRoot.first();
    await expect(course).toBeVisible();
    await course.getByRole('button', { name: /enroll/i }).click();
  }

  async expectEnrollSuccess(): Promise<void> {
    await expect(
      this.page.getByRole('status', { name: /enrolled/i }),
    ).toBeVisible();
  }

  async goToMyCourses(): Promise<void> {
    await this.myCoursesLink.click();
  }

  async openFirstEnrolledCourse(): Promise<void> {
    await this.page.locator('div.course-card').first().click();
  }

  async expectCourseContentVisible(): Promise<void> {
    const content = this.page
      .getByRole('heading', { name: /lesson|chapter|course/i })
      .or(this.page.getByTestId('course-player'));
    await expect(content).toBeVisible();
  }

  async expectCourseVisibleInMyCourses(courseName: string): Promise<void> {
    const courseCard = this.page.locator('div.course-card', {
      hasText: courseName,
    });
    await expect(courseCard).toBeVisible();
  }

  async clickEnrollButtonForCourse(courseName: string): Promise<void> {
    const courseCard = this.page.locator('div.course-card', {
      hasText: courseName,
    });
    const enrollButton = courseCard.locator('button.enroll-button');
    await enrollButton.click();
  }
}
