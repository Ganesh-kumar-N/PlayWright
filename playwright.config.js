// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';


dotenv.config({
  path:`config/.env.${process.env.TEST_ENV}`
})
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  //globalSetup:require.resolve('./auth.setup.js'),
  testDir: './tests',
  //retries:1,
  workers:2,
  retries:0,
  timeout: 40*1000,//-->this it an timeout for elements,by giving this it can applied to entire project level
  
  expect:{
timeout: 5*1000,//this is for assertion timeouts
  },
  reporter: [
  ['html'],
  ['allure-playwright']
],
  
  use: {
         browserName : 'chromium',
         
         headless : false,
         screenshot: 'on',
         trace: 'on-first-retry' ,//'retain-on-failure',
         viewport:{width:1920,height:1080},
         ignoreHTTPSErrors:true,
         video:'retain-on-failure',
         actionTimeout: 15 * 1000,      // click(), fill(), etc.
        navigationTimeout: 30 * 1000,  // page.goto(), reload()
         
    
  },
  // projects:[
  //   {
  //     name:'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name:'firefox',
  //     use: { ...devices['Desktop Chrome'] },
  //   }
  // ]
  
  });

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },


