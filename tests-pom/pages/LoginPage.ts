import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('http://103.196.155.10/multiket/cms/');
  }

  async login(email: string, password: string) {
    await this.page.getByPlaceholder('email').fill(email);
    await this.page.getByPlaceholder('password').fill(password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }
}
