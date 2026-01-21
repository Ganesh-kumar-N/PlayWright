const { test, expect } = require('@playwright/test');

test('lhome page',async({page})=>{
   // const context=await  browser.context();
    //const page=await  context.page();
    await page.goto("");
    await page.waitForLoadState('networkidle');
    page.on('dialog',async dialog=>{
console.log(dialog.message());
await dialog.accept();
    });
});