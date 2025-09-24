import { expect, test } from '@playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { BasePage } from '../../pages/BasePage';
import { DashboardPage } from '../../pages/DashboardPage';
import { LoginPage } from '../../pages/LoginPage';
import { restoreDB } from '../../api/UserData';
import {
  generateEmail,
  generateFirstName,
  generateLastName,
  generatePassword,
  generateUsername,
} from '../../test.data/testHelpers';

test.describe('User Registration (UI)', () => {
  let basePage: BasePage;
  let registrationPage: RegistrationPage;
  let dashboardPage: DashboardPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    dashboardPage = new DashboardPage(page);
    registrationPage = new RegistrationPage(page);
    loginPage = new LoginPage(page);

    await basePage.goto('/learning/welcome.html');
  });

  test.afterEach(async () => {
    await restoreDB();
  });
  // not fully working yet
  test('User can register successfully via UI', async () => {
    await registrationPage.openRegistration();
    const email = generateEmail();
    const password = generatePassword();
    await registrationPage.fillRegistrationForm({
      username: generateUsername(),
      email,
      password,
      firstName: generateFirstName(),
      lastName: generateLastName(),
    });
    // // After registration, try login via UI using DashboardPage and verify
    await dashboardPage.logIn({ email, password });
    // await expect(dashboardPage.dashboardHeader).toBeVisible();
  });
});
