import { test } from '@playwright/test';

let context;
let page;

test.describe('All tests share same page', () => {

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://example.com');
  });

  test('Test 1 - login', async () => {
    await page.fill('#username', 'admin');
    await page.fill('#password', 'password');
    await page.click('#login');
  });

  test('Test 2 - verify dashboard', async () => {
    await page.waitForSelector('#dashboard');
  });

  test('Test 3 - logout', async () => {
    await page.click('#logout');
  });

  test.afterAll(async () => {
    await context.close();
  });

});
