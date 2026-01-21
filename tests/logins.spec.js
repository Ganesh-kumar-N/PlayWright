import{test,expect} from '../Fixtures/login.fixture';

//const page=new loginpage();
test.beforeAll(async()=>{
    console.log("test suite started")
})


test.beforeEach(async({loginPage })=>{
await loginPage.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
 

})

test('dashboard', async({loginPage })=>{
    const page=loginPage ;
await page.waitForLoadState('networkidle',{ timeout: 120000 });//explicit waits
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
})