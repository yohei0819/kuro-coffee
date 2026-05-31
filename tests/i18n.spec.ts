import { test, expect } from '@playwright/test';

test.describe('多言語対応 (i18n)', () => {
  test('日本語トップから言語切替で英語ページに移動できる', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('link', { name: '言語を切り替え' }).first().click();
    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('英語ページに hreflang 代替リンクが存在する', async ({ page }) => {
    await page.goto('./en/');
    await expect(page.locator('link[hreflang="ja"]')).toHaveCount(1);
    await expect(page.locator('link[hreflang="en"]')).toHaveCount(1);
  });

  test('英語の商品ページが表示される', async ({ page }) => {
    await page.goto('./en/products');
    await expect(page.locator('h1')).toHaveText('Products');
    expect(await page.locator('.enp-card').count()).toBeGreaterThanOrEqual(6);
  });
});
