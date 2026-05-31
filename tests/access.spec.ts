import { test, expect } from '@playwright/test';

test.describe('アクセスページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./access');
  });

  test('店舗情報の見出しが表示される', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Access');
  });

  test('店舗情報の項目が表示される', async ({ page }) => {
    await expect(page.getByText('営業時間', { exact: true })).toBeVisible();
    await expect(page.getByText('定休日', { exact: true })).toBeVisible();
  });

  test('地図のiframeにアクセシブルなタイトルがある', async ({ page }) => {
    const frame = page.locator('iframe');
    await expect(frame).toHaveAttribute('title', /地図/);
  });
});
