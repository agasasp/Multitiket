import { test, expect } from '@playwright/test';

test('Add Company PIC Successfully', async ({ page }) => {

  const picName = `Agas PIC ${Date.now()}`;
  const picEmail = `agas.pic.${Date.now()}@mailinator.com`;
  const password = 'Qwerty123!';

  // Login
  await page.goto('http://103.196.155.10/multiket/cms/');
  await page.getByPlaceholder('email').fill('admin@local.com');
  await page.getByPlaceholder('password').fill('Qwerty123!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Masuk ke User Management -> Company PIC
  await page.getByText('User Management').click();
  await page.getByRole('link', { name: 'Company PIC', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // Klik tombol Add New
  await page.getByRole('button', { name: '+ Add New' }).click();
  await page.waitForTimeout(500);

  // Isi form
  await page.getByPlaceholder('Full Name').fill(picName);
  await page.getByPlaceholder('Email Address').fill(picEmail);
  await page.getByPlaceholder('Password', { exact: true }).fill(password);
  await page.getByPlaceholder('Password Confirmation').fill(password);

  // Pilih Company dari dropdown
  const selectEl = page.locator('select');
  if (await selectEl.count() > 0) {
    await selectEl.selectOption({ index: 1 });
  } else {
    await page.getByText('Select Company').click();
    await page.getByRole('option').first().click();
  }

  // Simpan
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForLoadState('networkidle');

  // Verifikasi: data muncul di tabel list Company PIC
  await page.goto('http://103.196.155.10/multiket/cms/user/company-pics');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Cari data yang baru dibuat
  await page.getByPlaceholder(/search/i).fill(picName);
  await page.getByPlaceholder(/search/i).press('Enter');
  await page.waitForTimeout(1000);

  await expect(page.locator(`tr:has-text("${picName}")`)).toBeVisible({ timeout: 10000 });

});
