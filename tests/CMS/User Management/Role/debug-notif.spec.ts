import { test } from '@playwright/test';

test('Debug role list page', async ({ page }) => {

  await page.goto('http://103.196.155.10/multiket/cms/');
  await page.getByPlaceholder('email').fill('admin@local.com');
  await page.getByPlaceholder('password').fill('Qwerty123!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.goto('http://103.196.155.10/multiket/cms/user/roles');
  await page.waitForLoadState('networkidle');

  // Cek URL aktual
  console.log('URL:', page.url());

  // Cek semua input/placeholder yang ada
  const inputs = await page.locator('input').all();
  for (const input of inputs) {
    const placeholder = await input.getAttribute('placeholder');
    console.log('INPUT placeholder:', placeholder);
  }

  // Cek semua row di tabel
  const rows = await page.locator('table tr').allInnerTexts();
  console.log('ROWS:', JSON.stringify(rows));

});
