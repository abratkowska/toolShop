import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly baseUrl = '/';

  readonly navigationCard: Locator;
  readonly toastNotification: Locator;

  constructor(readonly page: Page) {
    this.navigationCard = this.page.locator('[data-test="nav-cart"]');
    this.toastNotification = this.page.locator('[id="toast-container"]');
  }

  async goto(url?: string): Promise<void> {
    await this.page.goto(url ? url : this.baseUrl);
  }
}
