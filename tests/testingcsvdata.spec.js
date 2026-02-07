import { test, expect } from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';
const csvPath='utils/data.csv';
const filedata=fs.readFileSync(csvPath,'utf-8');
const records=parse(filedata,{columns:true,skip_empty_lines:true});

test.describe('Login – Data Driven Tests', () => {

  for (const data of records) {

    test(`Login test | Email: ${data.email || 'empty'} | Expected: ${data.validity}`, async ({ page }) => {

      await page.goto('https://demowebshop.tricentis.com/login');

      await page.locator('#Email').fill(data.email);
      await page.locator('#Password').fill(data.password);
      await page.locator('input[value="Log in"]').click();

      if (data.validity === 'valid') {
        await expect(page.locator('a.account')).toBeVisible();
      } else {
        await expect(page.locator('.validation-summary-errors')).toBeVisible();
      }
    });
  }
});
