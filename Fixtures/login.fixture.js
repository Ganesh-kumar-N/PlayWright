import { test as base, expect } from '@playwright/test';

export const test = base.extend({

  loginPage: async ({ browser }, use) => {   // ✅ use added here

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("hfufbeu@gmail.com");
    await page.locator("#userPassword").fill("password123");
    await page.locator("[value='Login']").click();

    

    // ✅ this is where Playwright injects the fixture
    await use(page);

    // cleanup
    await context.close();
  }
});

export { expect };
