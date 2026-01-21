const{test,expect}=require('@playwright/test');

test('dropdown test',async({page})=>{

    await page.goto("https://www.tutorialspoint.com/selenium/practice/select-menu.php");
    await page.locator('.mbsc-textfield-tags-placeholder.mbsc-ios').click();
    await page.pause();
    const options=page.locator('.mbsc-scroller-wheel-item');
      // Wait until at least one option is visible
  await options.first().waitFor();
    const dataintabl=await options.count();
    console.log("the dropdown table are :",dataintabl);

    for(let i=0;i<dataintabl;i++)
    {
       const text=await  options.nth(i).innerText();
       console.log(text.trim());
    }
});

test('Select dropdown by value', async ({ page }) => {

    // HTML: <option value="audi">Audi</option>
    await page.selectOption('#cars', { value: 'audi' });

    const selectedValue = await page.locator('#cars').inputValue();
    expect(selectedValue).toBe('audi');
  });

  // --------------------------------------------------
  // 2️⃣ Select dropdown by LABEL (Visible Text)
  // --------------------------------------------------
  test('Select dropdown by label', async ({ page }) => {

    // Visible text shown to user
    await page.selectOption('#cars', { label: 'Opel' });

    const selectedValue = await page.locator('#cars').inputValue();
    expect(selectedValue).toBe('opel');
  });

  // --------------------------------------------------
  // 3️⃣ Select dropdown by INDEX
  // --------------------------------------------------
  test('Select dropdown by index', async ({ page }) => {

    // Index starts from 0
    await page.selectOption('#day', { index: 4 }); // Friday

    const selectedDay = await page.locator('#day').inputValue();
    expect(selectedDay).toBe('friday');
  });

  