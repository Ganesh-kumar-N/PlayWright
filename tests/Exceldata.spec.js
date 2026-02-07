import { test, expect } from '@playwright/test';
import fs from 'fs';
import * as XLSX from 'xlsx';
const excelpath="utils/testingdata.xlsx";
const workbook=XLSX.readFile(excelpath);
const SheetNames=workbook.SheetNames[0];
const worksheet=workbook.Sheets[SheetNames];

const logindata=XLSX.utils.sheet_to_json(worksheet);

test.describe('Login – Data Driven Tests', () => {

  for (const data of logindata) {

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
