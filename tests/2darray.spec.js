import { test, expect } from '@playwright/test';

const loginTestData = [
  ["laura.taylor1234@example.com", "test123", "valid"],
  ["invaliduser@example.com", "test321", "invalid"],
  ["validuser@example.com", "testxyz", "invalid"],
  ["", "", "invalid"]
];

test.describe('Login – Data Driven Tests', () => {

  for (const [email, password, validity] of loginTestData) {

    test(`Login test | Email: ${email || 'empty'} | Expected: ${validity}`, async ({ page }) => {

      await page.goto('https://demowebshop.tricentis.com/login');

      await page.locator('#Email').fill(email);
      await page.locator('#Password').fill(password);
      await page.locator('input[value="Log in"]').click();

      if (validity === 'valid') {
        await expect(page.locator('a.account')).toBeVisible();
      } else {
        await expect(page.locator('.validation-summary-errors')).toBeVisible();
      }
    });
  }
});
