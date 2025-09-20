import { expect, Page } from "@playwright/test";
import { getToken } from "../api/UserData";
import { ILoginData, IUserCredentials } from "../interfaces/UserModel";
 import { BasePage } from './BasePage';


export class LoginPage extends BasePage {
 readonly notificationError = this.page.locator('[class="notification error"]')
 async  loginViaAPI(
  page: Page,
  loginUser: IUserCredentials
): Promise<void> {
  const { token } = await getToken(loginUser);

  await page.addInitScript((t: string) => {
    window.localStorage.setItem("token", t);
  }, token);

  await page.goto("/learning/welcome.html");
}

async verifyInvalidLogin(): Promise<void> {
    await expect(this.notificationError).toBeVisible();
}
}
