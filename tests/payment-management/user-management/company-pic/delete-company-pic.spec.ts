import { test, expect } from '@playwright/test';

test('Delete Company PIC Successfully', async ({ page }) => {

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

  // Buat data baru dulu
  await page.getByRole('button', { name: '+ Add New' }).click();
  await page.waitForTimeout(500);
  await page.getByPlaceholder('Full Name').fill(picName);
  await page.getByPlaceholder('Email Address').fill(picEmail);
  await page.getByPlaceholder('Password', { exact: true }).fill(password);
  await page.getByPlaceholder('Password Confirmation').fill(password);
  const selectEl = page.locator('select');
  if (await selectEl.count() > 0) {
    await selectEl.selectOption({ index: 1 });
  }
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForLoadState('networkidle');

  // Kembali ke list Company PIC
  await page.goto('http://103.196.155.10/multiket/cms/user/company-pics');
  await page.waitForLoadState('networkidle');

  // Cari data yang baru dibuat
  await page.getByPlaceholder(/search/i).fill(picName);
  await page.getByPlaceholder(/search/i).press('Enter');
  await page.waitForTimeout(1000);

  // Pastikan data ada
  await expect(page.locator(`tr:has-text("${picName}")`).first()).toBeVisible({ timeout: 10000 });

  // Tangani native dialog jika ada
  page.once('dialog', dialog => dialog.accept());

  // Klik tombol delete (Icon Trash)
  await page.locator(`tr:has-text("${picName}")`).first()
    .getByRole('button', { name: 'Icon Trash' }).click();

  await page.waitForTimeout(500);

  // Cek apakah ada modal konfirmasi
  const confirmBtn = page.getByRole('button', { name: /yes|delete|ok|confirm|hapus/i });
  if (await confirmBtn.isVisible()) {
    await confirmBtn.click();
  }

  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Verifikasi data sudah terhapus
  await expect(page.locator(`tr:has-text("${picName}")`).first())
    .not.toBeVisible({ timeout: 10000 });

});
