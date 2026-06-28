import { test } from '@playwright/test';

test('Debug Role List Page', async ({ page }) => {

  // Login
  await page.goto('http://103.196.155.10/multiket/cms/');
  await page.getByPlaceholder('email').fill('admin@local.com');
  await page.getByPlaceholder('password').fill('Qwerty123!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Masuk ke User Management -> Role
  await page.getByText('User Management').click();
  await page.getByRole('link', { name: 'Role' }).click();

  await page.waitForSelector('table');
  const html = await page.locator('table').innerHTML();
  console.log(html.substring(0, 3000));

});
