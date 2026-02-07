
const {test, expect}=require('@playwright/test');


test.describe.configure({mode:'parallel'});//this will hep to run the multiple tests in parallel of a same file

test('@smoke Browser context Playwrighttest',async ({browser})=>
     {
    //chrome-plugins/cookies
    //follow line is for creation/open for browser in background
    const context=await browser.newContext();
    //follow code will help to create a new page on the selective browser.
     const page= await context.newPage();
     //openong url
     await page.goto("https://www.amazon.in/");//https://rahulshettyacademy.com/loginpagePractise/
})

test.skip('@UI First Playwrighttest',async ({browser,page})=>
     {
    //we donot require brower.newContext and new page-->by default playwright will automatically
    //make them avaiable if we do async({browser,page})
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log (await page.title());
    //await expect(page).toHaveTitle("Google");
    await page.locator("#usernameuy").fill("rahulshettyacademy"); //rahulshettyacademy
    await page.locator("[type='password']").fill("learning");
    const dropdown=page.locator("select.form-control");
    await dropdown.selectOption("teach");
    await page.locator(".radiotextsty").last().click();//okayBtn
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    const blinktitle=page.locator("[href*='documents-request']");
    await expect(blinktitle).toHaveAttribute("class","blinkingText");
    await page.locator("#signInBtn").click();
    //console.log(await page.locator("[style*='block']").textContent());
    //await const exp= page.locator("[style*='block']");
    //await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password');
})

test.only('child window handtest',async ({browser})=>
     {
    const context =await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     const blinktitle=page.locator("[href*='documents-request']");

const [newpage]=await Promise.all([
     context.waitForEvent('page'),
     await page.pause(),
     blinktitle.click()
])

const text= await newpage.locator(".red").textContent();
console.log(text);
const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
    await newpage.close();
    await page.bringToFront();

  // Continue working on parent page
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('learning');

})


test.skip('Flipcart Playwrighttest',async ({browser,page})=>
     {
    //we donot require brower.newContext and new page-->by default playwright will automatically
    //make them avaiable if we do async({browser,page})
     await page.goto("https://www.flipkart.com/");

    const alltitles= await page.locator(".vpQU2r span").allTextContents();
    console.log(alltitles);
    await page.locator(".vpQU2r span").nth(1).click();
    await page.pause();
})

test.skip('practise',async ({browser,page})=>
     {
    //we donot require brower.newContext and new page-->by default playwright will automatically
    //make them avaiable if we do async({browser,page})
     await page.goto("https://rahulshettyacademy.com/client/");
await page.locator("#userEmail").fill("hfufbeu@gmail.com"); //rahulshettyacademy
    await page.locator("#userPassword").fill("Password@789");
    await page.locator("#login").click();
      await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
    await page.pause();
})