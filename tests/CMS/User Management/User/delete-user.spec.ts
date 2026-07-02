import { test, expect } from '@playwright/test';

test('Delete User Successfully', async ({ page }) => {
  // Login
  await page.goto('http://103.196.155.10/multiket/cms/');

  await page.getByPlaceholder('email').fill('admin@local.com');
  await page.getByPlaceholder('password').fill('Qwerty123!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Masuk ke User Management -> User
  await page.getByText('User Management').click();
  await page.getByRole('link', { name: 'User' }).click();

  const emailUser = 'john.doe@test.com';
  await page.getByPlaceholder(/search/i).fill(emailUser);
  await page.getByPlaceholder(/search/i).press('Enter');
  await page.waitForTimeout(1000);

  
  page.once('dialog', dialog => dialog.accept());

  
  await page.locator(`tr:has-text("${emailUser}")`).getByRole('button', { name: 'Icon Minus' }).click();

  
  await page.waitForLoadState('networkidle');

  // Verifikasi berhasil delete
  await expect(page.locator(`tr:has-text("${emailUser}")`)).not.toBeVisible({ timeout: 10000 });
});
