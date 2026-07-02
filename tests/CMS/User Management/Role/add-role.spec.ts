import { test, expect } from '@playwright/test';

test('Create Role Successfully', async ({ page }) => {

  // Login
  await page.goto('http://103.196.155.10/multiket/cms/');
  await page.getByPlaceholder('email').fill('admin@local.com');
  await page.getByPlaceholder('password').fill('Qwerty123!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Masuk ke User Management -> Role
  await page.getByText('User Management').click();
  await page.getByRole('link', { name: 'Role' }).click();

  // Klik tombol Add New
  await page.getByRole('button', { name: '+ Add New' }).click();

  // Isi form Create Role
  await page.getByPlaceholder('Name').clear();
  await page.getByPlaceholder('Name').fill('QA Tester Playwright');
  await page.getByPlaceholder('Description').clear();
  await page.getByPlaceholder('Description').fill('Role untuk tim QA');

  // Centang privileges - setiap item adalah button, klik untuk toggle
  // Dashboard -> View
  await page.getByRole('row', { name: /^Dashboard/ }).getByRole('button', { name: 'View' }).click();

  // User Management -> Role -> View & Add
  await page.getByRole('row', { name: /^Role/ }).getByRole('button', { name: 'View' }).click();
  await page.getByRole('row', { name: /^Role/ }).getByRole('button', { name: 'Add' }).click();

  // User Management -> User -> View
  await page.getByRole('row', { name: /^User/ }).getByRole('button', { name: 'View' }).click();

  // Simpan
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForLoadState('networkidle');

  // Kembali ke list Role
  await page.goto('http://103.196.155.10/multiket/cms/user/roles');
  await page.waitForLoadState('networkidle');

  // Verifikasi: pastikan role muncul di tabel
  await expect(page.locator('tr:has-text("QA Tester Playwright")')).toBeVisible({ timeout: 10000 });

});
