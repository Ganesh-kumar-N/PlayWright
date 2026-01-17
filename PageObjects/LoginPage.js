class LoginPage{

constructor(page)
{
    this.page=page;
    this.signInbutton=page.locator("[value='Login']");
    this.username= page.locator("#userEmail");
    this.password=page.locator("#userPassword");

}


async goto(){
    await this.page.goto("https://rahulshettyacademy.com/client")
}

async validlogin(username,password)
{
    await this.username.type(username);
    await this.password.type(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState('load');
}
}
module.exports={LoginPage}