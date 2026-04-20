import { test, expect } from '@playwright/test';

test.describe('Products', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./products');
    await page.waitForSelector('[role="tab"]');
  });

  test('フィルタータブが表示される', async ({ page }) => {
    const tabs = page.locator('[role="tab"]');
    const count = await tabs.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('タブでフィルタリングされる', async ({ page }) => {
    const allCount = await page.locator('article').count();
    await page.locator('[role="tab"]').nth(1).click();
    const filteredCount = await page.locator('article').count();
    expect(filteredCount).toBeLessThan(allCount);
  });

  test('ArrowRight で次のタブに移動する', async ({ page }) => {
    await page.locator('[role="tab"]').first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('[role="tab"]:focus')).toHaveAttribute('aria-selected', 'true');
  });

  test('すべてタブで全商品が表示される', async ({ page }) => {
    const cards = page.locator('article');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('商品詳細ページに遷移できる', async ({ page }) => {
    const link = page.locator('a:has-text("詳細を見る")').first();
    if (await link.isVisible()) {
      await link.click();
      await expect(page.locator('h1')).toBeVisible();
    }
  });
});
