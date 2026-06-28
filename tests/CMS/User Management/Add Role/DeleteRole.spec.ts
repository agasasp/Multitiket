import { test, expect } from '@playwright/test';

test('Delete Role Successfully', async ({ page }) => {

  // Login
  await page.goto('http://103.196.155.10/multiket/cms/');
  await page.getByPlaceholder('email').fill('admin@local.com');
  await page.getByPlaceholder('password').fill('Qwerty123!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Masuk ke User Management -> Role
  await page.getByText('User Management').click();
  await page.getByRole('link', { name: 'Role' }).click();

  const roleName = 'QA Tester Playwright';

  // Cari role berdasarkan nama
  await page.getByPlaceholder(/search/i).fill(roleName);
  await page.getByPlaceholder(/search/i).press('Enter');
  await page.waitForTimeout(1000);

  // Hitung jumlah row sebelum delete
  const rowsBefore = await page.locator(`tr:has-text("${roleName}")`).count();
  expect(rowsBefore).toBeGreaterThan(0);

  // Tangani dialog konfirmasi delete
  page.once('dialog', dialog => dialog.accept());

  // Klik tombol delete pada row pertama yang ditemukan (tombol terakhir = delete)
  await page.locator(`tr:has-text("${roleName}")`).first().getByRole('button', { name: 'Icon Minus' }).last().click();

  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Verifikasi jumlah row berkurang
  const rowsAfter = await page.locator(`tr:has-text("${roleName}")`).count();
  expect(rowsAfter).toBeLessThan(rowsBefore);

});
