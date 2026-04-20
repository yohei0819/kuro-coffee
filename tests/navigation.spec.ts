import { test, expect } from '@playwright/test';

test.describe('ナビゲーション', () => {
  test('トップページが表示される', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('全ページにナビで遷移できる', async ({ page }) => {
    await page.goto('./');
    for (const path of ['about', 'products', 'contact']) {
      await page.click(`a[href*="/${path}"]`);
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('スキップリンクが存在する', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('a[href="#main-content"]')).toBeAttached();
  });

  test('キーボードでナビリンクにアクセスできる', async ({ page }) => {
    await page.goto('./');
    for (let i = 0; i < 3; i++) await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });
});
