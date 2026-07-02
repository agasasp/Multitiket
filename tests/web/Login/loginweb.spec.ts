import { test, expect } from '@playwright/test';

test('User harus berhasil login dengan kredensial yang valid', async ({ page }) => {
  
  await page.goto('http://103.196.155.10/multiket/web/login');

  
  const emailInput = page.getByPlaceholder('Input email address');
  await expect(emailInput).toBeVisible();
  await emailInput.fill('agas@mailinator.com'); 

  
  const passwordInput = page.getByPlaceholder('Input Password');
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill('agas1234'); 

  const loginButton = page.locator('form').getByRole('button', { name: 'Login' });
  await loginButton.click();

  
  await expect(page).not.toHaveURL('http://103.196.155.10/multiket/web/login');
  
 });