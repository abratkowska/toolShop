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

  // async verifyToastNotification(): Promise<string> {
  //   await this.toastNotification.waitFor({ state: 'visible' });
  //   const toastMessage = await this.toastNotification.innerText();
  //   return toastMessage;
  // }

  // async getBasketItemsCount(): Promise<number> {
  //   const basketItems = this.page.locator('table.table-hover tbody tr');
  //   return await basketItems.count();
  // }
}
