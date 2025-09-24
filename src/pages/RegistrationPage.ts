import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

type RegistrationData = {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export class RegistrationPage extends BasePage {
  readonly firstNameInput = this.page.getByRole('textbox', {
    name: 'First name',
  });
  readonly usernameInput = this.page.getByRole('textbox', { name: 'Username' });
  readonly lastNameInput = this.page.getByRole('textbox', {
    name: 'Last name',
  });
  readonly emailInput = this.page.getByRole('textbox', {
    name: 'Email address',
  });
  readonly passwordInput = this.page.getByRole('textbox', {
    name: 'Password',
    exact: true,
  });
  readonly confirmPasswordInput = this.page.getByRole('textbox', {
    name: 'Confirm password',
  });
  readonly registerButton = this.page.getByRole('button', {
    name: 'Create Account',
  });

  async openRegistration(): Promise<void> {
    await this.page.locator('[href="register.html"]').click();
  }

  async fillRegistrationForm(data: RegistrationData): Promise<void> {
    await this.firstNameInput.fill(data.firstName || '');
    await this.lastNameInput.fill(data.lastName || '');
    await this.usernameInput.fill(data.username);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.password);
    await expect(this.registerButton).toBeEnabled();
    await this.registerButton.click();
  }
}
