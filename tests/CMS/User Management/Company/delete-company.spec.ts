import { test, expect } from '@playwright/test';

test('Delete Company Successfully', async ({ page }) => {

  // Login
  await page.goto('http://103.196.155.10/multiket/cms/');
  await page.getByPlaceholder('email').fill('admin@local.com');
  await page.getByPlaceholder('password').fill('Qwerty123!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Masuk ke User Management -> Company
  await page.getByText('User Management').click();
  await page.getByRole('link', { name: 'Company', exact: true }).click();
  await page.waitForLoadState('networkidle');

  const companyName = 'PT QA Playwright';

  // Cari company berdasarkan nama
  await page.getByPlaceholder(/search/i).fill(companyName);
  await page.getByPlaceholder(/search/i).press('Enter');
  await page.waitForTimeout(1000);

  // Tangani dialog konfirmasi delete
  page.once('dialog', dialog => dialog.accept());

  // Klik tombol delete (Icon Trash) pada row yang ditemukan
  await page.locator(`tr:has-text("${companyName}")`).first()
    .getByRole('button', { name: 'Icon Trash' }).click();

  await page.waitForLoadState('networkidle');

  // Verifikasi company sudah terhapus
  await expect(page.locator(`tr:has-text("${companyName}")`).first())
    .not.toBeVisible({ timeout: 10000 });

});
