import { test, expect } from '@playwright/test';

test('Create User Successfully', async ({ page }) => {

  // Login
  await page.goto('http://103.196.155.10/multiket/cms/');

  await page.getByPlaceholder('email').fill('admin@local.com');
  await page.getByPlaceholder('password').fill('Qwerty123!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Masuk ke User Management -> User
  await page.getByText('User Management').click();
  await page.getByRole('link', { name: 'User' }).click();

  
  await page.getByRole('button', { name: '+ Add New' }).click();
  await page.getByPlaceholder('Full Name').fill('Playwright');
  await page.getByPlaceholder('Email Address').fill('john.doe@test.com');
  await page.locator('select').selectOption({ label: 'Super Admin' });
  await page.getByPlaceholder('Password').fill('Password123!');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText(/success/i)).toBeVisible();

});