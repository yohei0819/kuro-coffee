import { test, expect } from '@playwright/test';

test.describe('ブログ', () => {
  test('一覧ページに記事カードが表示される', async ({ page }) => {
    await page.goto('./blog');
    await expect(page.locator('h1')).toHaveText('Journal');
    const posts = page.locator('.post-item');
    expect(await posts.count()).toBeGreaterThanOrEqual(1);
  });

  test('記事詳細に遷移して本文が表示される', async ({ page }) => {
    await page.goto('./blog');
    await page.locator('.post-card').first().click();
    await expect(page.locator('article h1')).toBeVisible();
    await expect(page.locator('.article-body')).toBeVisible();
  });

  test('記事一覧に戻れる', async ({ page }) => {
    await page.goto('./blog');
    await page.locator('.post-card').first().click();
    await page.getByRole('link', { name: '記事一覧に戻る' }).click();
    await expect(page.locator('h1')).toHaveText('Journal');
  });
});
