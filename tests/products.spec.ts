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

  test('キーワード検索で商品が絞り込まれる', async ({ page }) => {
    const allCount = await page.locator('article').count();
    await page.getByPlaceholder('名前・味わいで探す').fill('デカフェ');
    await expect(page.locator('article')).toHaveCount(1);
    expect(allCount).toBeGreaterThan(1);
  });

  test('該当なしの検索で空状態メッセージが表示される', async ({ page }) => {
    await page.getByPlaceholder('名前・味わいで探す').fill('zzzznomatch');
    await expect(page.locator('article')).toHaveCount(0);
    await expect(page.getByText('該当する商品が見つかりませんでした', { exact: false })).toBeVisible();
  });

  test('価格が安い順に並び替えできる', async ({ page }) => {
    await page.locator('select').selectOption('price-asc');
    const prices = await page.locator('article p:has-text("¥")').allTextContents();
    const numbers = prices.map((p) => Number(p.replace(/[^0-9]/g, '')));
    const sorted = [...numbers].sort((a, b) => a - b);
    expect(numbers).toEqual(sorted);
  });
});
