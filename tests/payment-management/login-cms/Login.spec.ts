import { test, expect } from '@playwright/test';

test('Success Login', async ({ page }) => {
  // Ganti dengan URL login aplikasi
  await page.goto('http://103.196.155.10/multiket/cms/');

  // Input email
  await page.getByPlaceholder('email').fill('admin@local.com');

  // Input password
  await page.getByPlaceholder('password').fill('Qwerty123!');

  // Klik tombol Sign In
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Verifikasi berhasil login
  // Sesuaikan dengan kondisi setelah login
  await expect(page).not.toHaveURL(/dashboard/);

  });