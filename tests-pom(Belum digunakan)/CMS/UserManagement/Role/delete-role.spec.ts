import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { RolePage } from '../../../pages/RolePage';

test('Delete Role Successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const rolePage = new RolePage(page);

  const roleName = 'QA Tester Playwright';

  await loginPage.goto();
  await loginPage.login('admin@local.com', 'Qwerty123!');

  await rolePage.goto();
  await rolePage.deleteRole(roleName);

  // Verifikasi role sudah terhapus
  await expect(page.locator(`tr:has-text("${roleName}")`).first()).not.toBeVisible({ timeout: 10000 });
});
