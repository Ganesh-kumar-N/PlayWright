const { test, expect } = require ('@playwright/test');


test.skip('tables', async({page})=>{
await page.goto("https://the-internet.herokuapp.com/");
await page.waitForLoadState('networkidle');
const title= page.locator('h1');
await expect(title).toBeVisible();
console.log(await title.textContent());
const table=page.locator('text=Sortable Data Tables');
await table.scrollIntoViewIfNeeded();
await table.click();
await page.pause();

})

test.skip('testing demo qa website', async({page})=>{
await page.goto("https://demoqa.com/");
console.log(await page.title());
//await page.waitForLoadState('networkidle');
const elementcard= page.getByText('Elements');
await expect(elementcard).toBeVisible();
await elementcard.click();
await page.pause();
await page.locator('text=Web Tables').click();
const titlecard=page.locator('h1');
await expect(titlecard).toBeVisible();
const testheder=await titlecard.textContent();
console.log("totel card is ",testheder);
const table= page.locator('.ReactTable.-striped.-highlight');
await expect(table).toBeVisible();
//count rows
const rows=page.locator('.ReactTable .rt-tbody .rt-tr-group')
const rowcount= await rows.count();
console.log("total rows are", rowcount);

//print table data
for(let i=0;i<rowcount;i++)
{
  //const cells=rows.nth(i).locator('.rt-td', {hasText:'Cierra'});
  const cells=rows.nth(i).locator('.rt-td');
  const texts =await cells.allTextContents();
  if(texts.length>0)
  {
  console.log("data is:",texts);
  }

}

// console.log("--table data---")
// for(let i=0; i<rowcount;i++)
// {
//     const cells = rows.nth(i).locator('.rt-td');
//     const rowData = await cells.allInnerTexts();
//     console.log(`Row ${i + 1}:`, rowData);
// }
// // 6️⃣ Find row by condition (First Name = Cierra)
//   const targetRow = page.locator(
//     '.ReactTable .rt-tbody .rt-tr-group',
//     { hasText: 'Cierra' }
//   );

//   await expect(targetRow).toBeVisible();

//   // 7️⃣ Validate Salary column for Cierra
//   const salary = await targetRow
//     .locator('.rt-th')
//     .nth(5)
//      .textContent();

//   console.log('Cierra Salary:', salary);
//   expect(salary).toBe('10000');

  //const table=await page.locator('.table');
  
})
test.skip('testing on tables',async({page})=>{
    await page.goto("https://demoqa.com/");
    expect(await page.title());
    const elementcard= page.getByText('Elements');
await expect(elementcard).toBeVisible();
await elementcard.click();
await page.pause();
//  
    await page.locator('text=Book Store Application').click();
    // const rows=table.count();
    // for(let i=0; i<rows;i++)
    // {

    // }
    await page.locator('text="Book Store"').click();

    const table=page.locator('.rt-table');
    await expect(table).toBeVisible();
    const tablerows=page.locator('.rt-table .rt-tr-group');
    const rowscount=await tablerows.count()
    console.log(rowscount);

    for(let i=0;i<rowscount;i++)
    {
      const row= tablerows.nth(i);
      const titleheader=await row.locator('.rt-td').filter({hasText:'Speaking JavaScript'}).count();
      if(titleheader>0)
      {
        const bookauthor= await row.nth(3).innerText();
      console.log(`${bookauthor}`);
      }
      // const bookauthor= await cells.nth(3).innerText();
      // console.log(`${bookauthor}`);
      // const booktitle= await cells.nth(1).innerText();
      // const author= await cells.nth(2).innerText();
      //const tbdata=await rows.allTextContents();
      //console.log("table data are:",tbdata);

      //console.log(`${booktitle},${author}`);
    }
  })

  test.only('testing for betby',async({page})=>{
    await page.goto("https://demoqa.com/");
    expect(await page.title());
    const elementcard= page.getByText('Forms');
await expect(elementcard).toBeVisible();
await elementcard.click();
// await page.pause();
const pageform= await page.getByText('Practice Form').click();
await page.getByPlaceholder('First Name').fill("ganesh");
await page.locator('#userEmail').fill("rhfhe@example.com");
await page.getByPlaceholder('Current Address').fill("djh hfiidwi euewhw");
const  radiobt=page.getByRole('radio',{name:'Male',exact:true});
await expect(radiobt).not.toBeChecked();
await radiobt.check();
await expect(radiobt).toBeChecked();

  })