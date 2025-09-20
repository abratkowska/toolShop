import { expect, request } from '@playwright/test';
import { BasePage } from './BasePage';
import { ILoginData, IUserCredentials } from '../interfaces/UserModel';

export class DashboardPage extends BasePage {
  readonly signInButton = this.page.locator('[name="login"]');
  readonly userNameInput = this.page.locator('[id="usernameInput"]');
  readonly passwordInput = this.page.locator('[id="passwordInput"]');
  readonly submitButton = this.page.locator('[type="submit"]');
  readonly dashboardHeader = this.page.locator('[class="dashboard-header"]');

  async clickSignIn(loginUser: IUserCredentials): Promise<void> {
    await this.signInButton.click();
    await this.userNameInput.fill(loginUser.email);
    await this.passwordInput.fill(loginUser.password);
    await this.submitButton.click();
  }

  async clickOnTags(tag: string): Promise<void> {
    await this.clickShowMoreForTags();
    const tagElement = this.page.locator(`[data-tag="${tag}"]`).first();
    await tagElement.click();
    await expect(tagElement).toBeVisible();
  }

  async verifyCourseTag(): Promise<void> {
    const courseTags = this.page.locator('div.course-tags span');
    const tagCount = await courseTags.count();
    expect(tagCount).toBeGreaterThan(0);
    for (let i = 0; i < tagCount; i++) {
      const tag = courseTags.nth(i);
      const tagText = await tag.textContent();
      if (tagText) {
        await expect(tag).toHaveAttribute('title', tagText.trim());
      }
    }
  }

  async clickShowMoreForTags(): Promise<void> {
    await this.page.locator('button').filter({ hasText: /show more/i });
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
    const levelFilter = this.page
      .locator(
        `[data-level="${level}"], [data-filter="${level}"], .level-filter`,
      )
      .filter({ hasText: new RegExp(level, 'i') });
    const levelFilterCount = await levelFilter.count();

    if (levelFilterCount > 0) {
      await levelFilter.first().click();
    } else {
      const alternativeSelectors = [
        this.page.locator(`button`).filter({ hasText: new RegExp(level, 'i') }),
        this.page
          .locator(`[class*="level"]`)
          .filter({ hasText: new RegExp(level, 'i') }),
        this.page
          .locator(`[class*="filter"]`)
          .filter({ hasText: new RegExp(level, 'i') }),
      ];

      for (const selector of alternativeSelectors) {
        const count = await selector.count();
        if (count > 0) {
          await selector.first().click();
          break;
        }
      }
    }

    await this.page.waitForTimeout(500);
  }
  async verifyCourseLevelFilter(level: string): Promise<void> {
    const activeLevelFilter = this.page
      .locator(
        `[data-level="${level}"].active, [data-filter="${level}"].active, .level-filter.active`,
      )
      .filter({ hasText: new RegExp(level, 'i') });
    const activeCount = await activeLevelFilter.count();

    if (activeCount > 0) {
      await expect(activeLevelFilter.first()).toBeVisible();
    }
    const courseCards = this.page.locator(
      '.course-card, .course-item, [class*="course"]',
    );
    const courseCount = await courseCards.count();

    if (courseCount > 0) {
      const levelCourses = courseCards.filter({
        hasText: new RegExp(level, 'i'),
      });
      const levelCourseCount = await levelCourses.count();
      expect(levelCourseCount).toBeGreaterThan(0);
    }
  }

  async getCourseCountByLevel(level: string): Promise<number> {
    const courseCards = this.page.locator(
      '.course-card, .course-item, [class*="course"]',
    );
    const allCourses = await courseCards.count();

    if (allCourses === 0) {
      return 0;
    }

    const levelCourses = courseCards.filter({
      hasText: new RegExp(level, 'i'),
    });
    return await levelCourses.count();
  }

  async getTotalCourseCount(): Promise<number> {
    const courseCards = this.page.locator(
      '.course-card, .course-item, [class*="course"]',
    );
    return await courseCards.count();
  }

  async clearLevelFilter(): Promise<void> {
    const clearButton = this.page
      .locator('button')
      .filter({ hasText: /clear|reset|all/i });
    const clearCount = await clearButton.count();

    if (clearCount > 0) {
      await clearButton.first().click();
    } else {
      const allButton = this.page
        .locator('button, a')
        .filter({ hasText: /all|show all/i });
      const allCount = await allButton.count();
      if (allCount > 0) {
        await allButton.first().click();
      }
    }

    await this.page.waitForTimeout(500);
  }

  async verifyNoLevelFilterActive(): Promise<void> {
    const activeFilters = this.page.locator(
      '.level-filter.active, [data-level].active, [data-filter].active',
    );
    const activeCount = await activeFilters.count();
    expect(activeCount).toBe(0);
  }

  async verifyCourseLevelAndTagFilter(
    level: string,
    tag: string,
  ): Promise<void> {
    await this.verifyCourseLevelFilter(level);

    await this.verifyCourseLevelForTag(tag);

    const courseCards = this.page.locator(
      '.course-card, .course-item, [class*="course"]',
    );
    const courseCount = await courseCards.count();

    if (courseCount > 0) {
      const filteredCourses = courseCards
        .filter({
          hasText: new RegExp(level, 'i'),
        })
        .filter({
          hasText: new RegExp(tag, 'i'),
        });

      const filteredCount = await filteredCourses.count();
      expect(filteredCount).toBeGreaterThan(0);
    }
  }
}
