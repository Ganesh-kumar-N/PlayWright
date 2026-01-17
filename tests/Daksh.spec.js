import { test, expect } from '@playwright/test';

let user1Context;
let user1Page;

let user2Context;
let user2Page;

let recordId;

test.describe('Maker-Checker flow using multiple browser contexts', () => {

  // 🔴 MUST be serial because tests are dependent
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async ({ browser }) => {

    // ---------- USER 1 CONTEXT ----------
    user1Context = await browser.newContext();
    user1Page = await user1Context.newPage();

    await user1Page.goto('https://app.example.com');
    await user1Page.fill('#username', 'user1');
    await user1Page.fill('#password', 'password1');
    await user1Page.click('#login');

    // ---------- USER 2 CONTEXT ----------
    user2Context = await browser.newContext();
    user2Page = await user2Context.newPage();

    await user2Page.goto('https://app.example.com');
    await user2Page.fill('#username', 'user2');
    await user2Page.fill('#password', 'password2');
    await user2Page.click('#login');
  });

  test('User1 creates and submits a record', async () => {
    await user1Page.click('#createRecord');
    await user1Page.fill('#recordName', 'Test Record');
    await user1Page.click('#submitRecord');

    recordId = await user1Page.locator('#recordId').textContent();

    await expect(user1Page.locator('.status'))
      .toHaveText('Submitted');
  });

  test('User2 rejects the record', async () => {
    await user2Page.click(`#record-${recordId}`);
    await user2Page.fill('#rejectionReason', 'Invalid data');
    await user2Page.click('#rejectRecord');

    await expect(user2Page.locator('.status'))
      .toHaveText('Rejected');
  });

  test('User1 resubmits the rejected record', async () => {
    await user1Page.reload();

    await user1Page.click(`#record-${recordId}`);
    await user1Page.click('#resubmitRecord');

    await expect(user1Page.locator('.status'))
      .toHaveText('Resubmitted');
  });

  test.afterAll(async () => {
    await user1Context.close();
    await user2Context.close();
  });

});
