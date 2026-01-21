const { test, expect } = require('@playwright/test');

test.describe('Dynamic Dropdown Scenarios – Complete Coverage', () => {

  /* -------------------------------------------------------
     TEST 1: Print ALL values from a dynamic dropdown
     ------------------------------------------------------- */
  test('Print all dropdown values', async ({ page }) => {

    await page.goto('https://www.tutorialspoint.com/selenium/practice/select-menu.php');

    // Open dynamic dropdown
    await page.locator('.mbsc-textfield-tags-placeholder').click();

    // Actual dropdown options (Mobiscroll items)
    const options = page.locator('.mbsc-scroller-wheel-item');

    // Wait until options are loaded
    await options.first().waitFor();

    const count = await options.count();
    console.log('Total dropdown values:', count);

    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).innerText();
      console.log(text.trim());
    }
  });

  /* -------------------------------------------------------
     TEST 2: Select ONE value from dynamic dropdown
     ------------------------------------------------------- */
  test('Select single value from dynamic dropdown', async ({ page }) => {

    await page.goto('https://www.tutorialspoint.com/selenium/practice/select-menu.php');
    await page.locator('.mbsc-textfield-tags-placeholder').click();

    const options = page.locator('.mbsc-scroller-wheel-item');
    await options.first().waitFor();

    const valueToSelect = 'Books';

    for (let i = 0; i < await options.count(); i++) {
      const text = await options.nth(i).innerText();

      if (text.trim() === valueToSelect) {
        await options.nth(i).click();
        break;
      }
    }

    // Assertion – selected chip visible
    await expect(page.locator('.mbsc-chip')).toContainText(valueToSelect);
  });

  /* -------------------------------------------------------
     TEST 3: Select MULTIPLE values from dynamic dropdown
     ------------------------------------------------------- */
  test('Select multiple values from dynamic dropdown', async ({ page }) => {

    await page.goto('https://www.tutorialspoint.com/selenium/practice/select-menu.php');
    await page.locator('.mbsc-textfield-tags-placeholder').click();

    const options = page.locator('.mbsc-scroller-wheel-item');
    await options.first().waitFor();

    const valuesToSelect = ['Books', 'Electronics & Computers'];

    for (let i = 0; i < await options.count(); i++) {
      const text = await options.nth(i).innerText();

      if (valuesToSelect.includes(text.trim())) {
        await options.nth(i).click();
      }
    }

    // Assertion – all selected values visible
    for (const value of valuesToSelect) {
      await expect(page.locator('.mbsc-chip')).toContainText(value);
    }
  });

  /* -------------------------------------------------------
     TEST 4: Validate dropdown COUNT
     ------------------------------------------------------- */
  test('Validate dropdown options count', async ({ page }) => {

    await page.goto('https://www.tutorialspoint.com/selenium/practice/select-menu.php');
    await page.locator('.mbsc-textfield-tags-placeholder').click();

    const options = page.locator('.mbsc-scroller-wheel-item');
    await options.first().waitFor();

    const count = await options.count();
    console.log('Dropdown count:', count);

    expect(count).toBeGreaterThan(0);
  });

  /* -------------------------------------------------------
     TEST 5: Auto-suggest dynamic dropdown (Generic example)
     ------------------------------------------------------- */
  test('Auto-suggest dynamic dropdown selection', async ({ page }) => {

    await page.goto('https://www.google.com');

    await page.locator('textarea[name="q"]').fill('playwright');

    const suggestions = page.locator('li[role="presentation"]');
    await suggestions.first().waitFor();

    for (let i = 0; i < await suggestions.count(); i++) {
      const text = await suggestions.nth(i).innerText();

      if (text.toLowerCase().includes('playwright tutorial')) {
        await suggestions.nth(i).click();
        break;
      }
    }

    await expect(page).toHaveURL(/playwright/i);
  });

  /* -------------------------------------------------------
     TEST 6: Table-based dynamic dropdown
     ------------------------------------------------------- */
  test('Table based dropdown – print and select value', async ({ page }) => {

    await page.goto('https://example.com'); // replace with real table-dropdown site

    const rows = page.locator('table tr');
    await rows.first().waitFor();

    for (let i = 0; i < await rows.count(); i++) {
      const text = await rows.nth(i).locator('td').innerText();
      console.log(text);

      if (text.trim() === 'Books') {
        await rows.nth(i).click();
        break;
      }
    }
  });

  /* -------------------------------------------------------
     TEST 7: Keyboard-based dynamic dropdown selection
     ------------------------------------------------------- */
  test('Keyboard navigation on dynamic dropdown', async ({ page }) => {

    await page.goto('https://www.tutorialspoint.com/selenium/practice/select-menu.php');
    await page.locator('.mbsc-textfield-tags-placeholder').click();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // At least one selection should be made
    await expect(page.locator('.mbsc-chip')).toBeVisible();
  });

  /* -------------------------------------------------------
     TEST 8: No-results scenario in dynamic dropdown
     ------------------------------------------------------- */
  test('Handle no results in dynamic dropdown', async ({ page }) => {

    await page.goto('https://example.com'); // search-based dropdown site

    await page.locator('#search').fill('zzzz');

    await expect(page.locator('.no-results')).toBeVisible();
  });

  /* -------------------------------------------------------
     TEST 9: Reusable function usage
     ------------------------------------------------------- */
  test('Reusable function – select from dynamic dropdown', async ({ page }) => {

    async function selectFromDropdown(locator, value) {
      const options = page.locator(locator);
      await options.first().waitFor();

      for (let i = 0; i < await options.count(); i++) {
        const text = await options.nth(i).innerText();
        if (text.trim() === value) {
          await options.nth(i).click();
          break;
        }
      }
    }

    await page.goto('https://www.tutorialspoint.com/selenium/practice/select-menu.php');
    await page.locator('.mbsc-textfield-tags-placeholder').click();

    await selectFromDropdown('.mbsc-scroller-wheel-item', 'Books');

    await expect(page.locator('.mbsc-chip')).toContainText('Books');
  });

});
