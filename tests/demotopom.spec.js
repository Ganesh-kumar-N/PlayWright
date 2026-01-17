 const {test, expect} = require('@playwright/test');
 const {POManager} = require('../PageObjects/POManager');
 //json->string->js object
 const dataset=JSON.parse(JSON.stringify(require('../utils/demotopomdata.json')));

for(const data of dataset ){
 test(`Client App login ${data.productName}`, async ({page})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
    //  const username = "hfufbeu@gmail.com";
    //  const password = "Password@789"
    //  const productName = 'Zara Coat 3';
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goto();
     await loginPage.validlogin(data.username,data.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchproduct(data.productName);
     await dashboardPage.navigateto();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});
}

 

 



 

