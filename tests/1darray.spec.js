import { test, expect } from '@playwright/test';

const searchItems = ['laptop', 'Gift card', 'smartphone', 'monitor'];

test.describe('Search feature - data driven tests', () => {

  for (const item of searchItems) {

    test(`Search test for ${item}`, async ({ page }) => {

      await page.goto('https://demowebshop.tricentis.com/');

      await page.locator('#small-searchterms').fill(item);
      await page.locator("input[value='Search']").click();

      await expect
        .soft(page.locator('h2 a').first())
        .toContainText(item, { ignoreCase: true });
    });
  }
});
