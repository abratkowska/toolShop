import { expect, Page } from '@playwright/test';
import { getToken } from '../api/UserData';
import { ILoginData, IUserCredentials } from '../interfaces/UserModel';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly notificationError = this.page.locator(
    '[class="notification error"]',
  );
  readonly loginLink = this.page.getByRole('link', { name: /sign in|login/i });
  readonly usernameField = this.page.getByLabel(/email|username/i);
  readonly passwordField = this.page.getByLabel(/password/i);
  readonly submitButton = this.page.getByRole('button', { name: /sign in|login/i });
  readonly dashboardHeading = this.page.getByRole('heading', { name: /dashboard|courses|welcome/i });

  async loginViaAPI(page: Page, loginUser: IUserCredentials): Promise<void> {
    const { token, id, username, avatar, firstName } =
      await getToken(loginUser);

    await page.addInitScript((t: string) => {
      document.cookie = `learning_access_token=${t}; path=/;`;
    }, token);

    await page.addInitScript((userId: string) => {
      document.cookie = `learning_user_id=${userId}; path=/;`;
    }, String(id));

    await page.addInitScript((u: string) => {
      document.cookie = `learning_username=${u}; path=/;`;
    }, username);

    await page.addInitScript((a: string) => {
      document.cookie = `learning_avatar=${a}; path=/;`;
    }, avatar);

    await page.addInitScript((fn: string) => {
      document.cookie = `learning_first_name=${fn}; path=/;`;
    }, firstName);

    await page.goto('/learning/dashboard.html');
  }

  async verifyInvalidLogin(): Promise<void> {
    await expect(this.notificationError).toBeVisible();
  }


}
