import { expect, request } from '@playwright/test';
import { BasePage } from './BasePage';
import { ILoginData, IUserCredentials } from '../interfaces/UserModel';

export class DashboardPage extends BasePage {
  readonly signInButton = this.page.locator('[name="login"]');
  readonly userNameInput = this.page.locator('[id="usernameInput"]');
  readonly passwordInput = this.page.locator('[id="passwordInput"]');
  readonly submitButton = this.page.locator('[type="submit"]');
  readonly dashboardHeader = this.page.locator('[class="dashboard-header"]');

  async logIn(loginUser: IUserCredentials): Promise<void> {
    await this.clickSignIn();
    await this.userNameInput.fill(loginUser.email);
    await this.passwordInput.fill(loginUser.password);
    await this.submitButton.click();
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async clickOnTags(tag: string): Promise<void> {
    await this.clickShowMoreForTags();
    const tagElement = this.page.locator(`[data-tag="${tag}"]`);
    await tagElement.click();
    await expect(tagElement).toBeVisible();
  }

  async verifyCourseTag(): Promise<void> {
    const courseTags = this.page.locator('div.course-tags span');
    expect(await courseTags.count()).toBeGreaterThan(0);
    const count = await courseTags.count();
    await Promise.all(
      Array.from({ length: count }).map(async (_, i) => {
        const tag = courseTags.nth(i);
        const text = (await tag.textContent())?.trim() || '';
        await expect(tag).toHaveAttribute('title', text);
      }),
    );
  }

  async clickShowMoreForTags(): Promise<void> {
    await this.page.locator('.show-more-tags').click();
  }

  async verifyCourseLevelForTag(tagName: string): Promise<void> {
    const tagElements = this.page
      .locator('div.course-tags span')
      .filter({ hasText: tagName });
    const count = await tagElements.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(tagElements.nth(i)).toHaveAttribute('title', tagName);
    }
  }

  async filterCoursesByLevel(level: string): Promise<void> {
    await this.page
      .locator(
        `[data-level="${level}"]
      `,
      )
      .click();
    await this.page.waitForTimeout(500);
  }

  async verifyCourseLevelFilter(level: string): Promise<void> {
    await expect(
      this.page
        .locator(
          `[data-level="${level}"].active, [data-filter="${level}"].active, .level-filter.active`,
        )
        .first(),
    ).toBeVisible();
    const matchingCourses = this.page
      .locator(`.course-card, .course-item, [class*="course"]`)
      .filter({ hasText: level });

    expect(await matchingCourses.count()).toBeGreaterThan(0);
  }

  async getCourseCountByLevel(level: string): Promise<number> {
    return this.page
      .locator('.course-card, .course-item, [class*="course"]')
      .filter({ hasText: level })
      .count();
  }

  async getTotalCourseCount(): Promise<number> {
    return this.page
      .locator('.course-card, .course-item, [class*="course"]')
      .count();
  }
}
