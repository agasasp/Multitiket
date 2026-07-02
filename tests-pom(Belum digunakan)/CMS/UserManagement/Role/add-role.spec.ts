import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { RolePage } from '../../../pages/RolePage';

test('Create Role Successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const rolePage = new RolePage(page);

  await loginPage.goto();
  await loginPage.login('admin@local.com', 'Qwerty123!');

  await rolePage.goto();
  await rolePage.addRole('QA Tester Playwright', 'Role untuk tim QA');

  // Verifikasi berhasil
  await expect(page.getByText(/success/i)).toBeVisible();
});
