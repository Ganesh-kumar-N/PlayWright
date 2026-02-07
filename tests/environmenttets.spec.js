import{test,expect} from '@playwright/test';

test("environmnet tests",async ({page})=>{
    console.log(process.env.BASE_URL)
})