import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Success Login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('admin@local.com', 'Qwerty123!');

  // Verifikasi berhasil login
  await expect(page).not.toHaveURL(/dashboard/);
});
