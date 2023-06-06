import { expect } from '@playwright/test';

export class SignPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.signInHeader = page.locator('h1', { hasText: 'Sign In' });
    this.needAnAccount = page.locator('a', { hasText: 'Need an account?' });
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
    this.signedUser = page.getByRole('listitem');
    this.loginErrorMessage = page.locator('h1');
  }

  async gotoPage() {
    await this.page.goto('/login');
  }

  async gotoPageWithPath(path) {
    await this.page.goto(path);
  }

  async signIn(email, password) {
    await this.emailField.type(email);
    await this.passwordField.type(password);
    await this.submitButton.click();
  }

  async isSignedIn(user) {
    await expect(this.signedUser.filter({ hasText: user })).toBeAttached();
    return await this.signedUser.filter({ hasText: user }).isVisible();
  }
}