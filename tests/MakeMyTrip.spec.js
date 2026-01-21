//const{test,expect }  require('@playwright/test');
const {test}=require('@playwright/test');

test.describe.configure({mode:'prallel'});

    test('basic test', async ({ page }) => {
  await page.goto('https://www.amazon.in/',{waitUntil:'domcontentloaded'});
  const web= page.locator('#nav_cs_grocery',{state:'visible'});
  await web.hover({force:true});
  await page.getByRole('link',{name:'freshmeat'}).click();

  // ...
})


