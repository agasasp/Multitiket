import { Page } from '@playwright/test';

export class RolePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.getByText('User Management').click();
    await this.page.getByRole('link', { name: 'Role' }).click();
  }

  async addRole(name: string, description: string) {
    await this.page.getByRole('button', { name: '+ Add New' }).click();
    await this.page.getByPlaceholder('Name').fill(name);
    await this.page.getByPlaceholder('Description').fill(description);

    // Centang privileges
    await this.page.getByRole('row', { name: /^Dashboard/ }).getByRole('button', { name: 'View' }).click();
    await this.page.getByRole('row', { name: /^Role/ }).getByRole('button', { name: 'View' }).click();
    await this.page.getByRole('row', { name: /^Role/ }).getByRole('button', { name: 'Add' }).click();
    await this.page.getByRole('row', { name: /^User/ }).getByRole('button', { name: 'View' }).click();

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async deleteRole(name: string) {
    await this.page.getByPlaceholder(/search/i).fill(name);
    await this.page.getByPlaceholder(/search/i).press('Enter');
    await this.page.waitForTimeout(1000);

    this.page.once('dialog', dialog => dialog.accept());
    await this.page.locator(`tr:has-text("${name}")`).first()
      .getByRole('button', { name: 'Icon Minus' }).last().click();

    await this.page.waitForLoadState('networkidle');
  }
}
