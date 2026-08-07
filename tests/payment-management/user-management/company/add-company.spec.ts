import { test, expect } from '@playwright/test';

test('Create Company Successfully', async ({ page }) => {

  // Login
  await page.goto('http://103.196.155.10/multiket/cms/');
  await page.getByPlaceholder('email').fill('admin@local.com');
  await page.getByPlaceholder('password').fill('Qwerty123!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Masuk ke User Management -> Company
  await page.getByText('User Management').click();
  await page.getByRole('link', { name: 'Company', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // Klik tombol Add New
  await page.getByRole('button', { name: '+ Add New' }).click();
  await page.waitForTimeout(500);

  // Isi form Create Company
  await page.getByPlaceholder('Name').fill('PT QA Playwright');
  await page.getByPlaceholder('Email Address').fill('qa.playwright@company.com');
  await page.getByPlaceholder('Phone Number').fill('08123456789');
  await page.getByPlaceholder('PIC').fill('John QA');

  // Simpan
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForLoadState('networkidle');

  // Verifikasi: pastikan company muncul di tabel
  await page.goto('http://103.196.155.10/multiket/cms/user/companies');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  await expect(page.locator('tr:has-text("PT QA Playwright")')).toBeVisible({ timeout: 10000 });

});
