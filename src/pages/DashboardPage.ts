import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { IUserCredentials } from '../interfaces/UserModel';

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
    await expect(this.dashboardHeader).toBeVisible();
  }


  async clickOnLevelFilter(level:string): Promise<void> {
    await this.page.locator(`[data-level=${level}]`).click();
  }
}
