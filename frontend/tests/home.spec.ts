import { test, expect } from '@playwright/test';

test.describe('Home Page Counter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('初始計數為 0', async ({ page }) => {
    const counter = page.locator('p');
    await expect(counter).toHaveText("You've clicked 0 times.");
  });

  test('點擊 Click me 按鈕可增加計數', async ({ page }) => {
    const clickBtn = page.getByRole('button', { name: 'Click me' });
    const counter = page.locator('p');

    await clickBtn.click();
    await expect(counter).toHaveText("You've clicked 1 times.");

    await clickBtn.click();
    await expect(counter).toHaveText("You've clicked 2 times.");
  });

  test('點擊 Reset 按鈕可重置計數', async ({ page }) => {
    const clickBtn = page.getByRole('button', { name: 'Click me' });
    const resetBtn = page.getByRole('button', { name: 'Reset' });
    const counter = page.locator('p');

    await clickBtn.click();
    await expect(counter).toHaveText("You've clicked 1 times.");

    await resetBtn.click();
    await expect(counter).toHaveText("You've clicked 0 times.");
  });
});
