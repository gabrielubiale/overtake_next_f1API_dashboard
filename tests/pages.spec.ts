import { test, expect } from '@playwright/test';

test('Home page loads and displays header', async ({ page }) => {  
  await page.goto('http://localhost:3000');

  await expect(page.locator('h1')).toHaveText('Formula 1');

});

test('Search for the 3 titles (h2) on cards', async ({ page }) => {  
  await page.goto('http://localhost:3000');

  await expect(page.locator('h2')).toContainText(['Next race', 'Championship leader', 'Team leader']);

});