import { test, expect } from '@playwright/test';

test.describe('テーマ切替（ダーク/ライト）', () => {
  test('初期状態でdata-themeが設定される', async ({ page }) => {
    await page.goto('./');
    const theme = await page.locator('html').getAttribute('data-theme');
    expect(['light', 'dark']).toContain(theme);
  });

  test('トグルでテーマが切り替わる', async ({ page }) => {
    await page.goto('./');
    const html = page.locator('html');
    const before = await html.getAttribute('data-theme');

    await page.locator('.nav-desktop .theme-toggle').click();
    const after = await html.getAttribute('data-theme');
    expect(after).not.toBe(before);
  });

  test('選択したテーマがリロード後も保持される', async ({ page }) => {
    await page.goto('./');
    await page.locator('.nav-desktop .theme-toggle').click();
    const chosen = await page.locator('html').getAttribute('data-theme');

    await page.reload();
    const afterReload = await page.locator('html').getAttribute('data-theme');
    expect(afterReload).toBe(chosen);
  });

  test('トグルボタンのaria-pressedが状態を反映する', async ({ page }) => {
    await page.goto('./');
    const toggle = page.locator('.nav-desktop .theme-toggle');
    await toggle.click();
    const theme = await page.locator('html').getAttribute('data-theme');
    const pressed = await toggle.getAttribute('aria-pressed');
    expect(pressed).toBe(String(theme === 'light'));
  });
});

test.describe('RSSフィード', () => {
  test('日本語RSSが配信される', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}rss.xml`);
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('<rss');
    expect(body).toContain('KURO COFFEE Journal');
    expect(body).toContain('<language>ja</language>');
  });

  test('英語RSSが配信される', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}en/rss.xml`);
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('<language>en</language>');
  });

  test('ブログ一覧にRSS購読リンクがある', async ({ page }) => {
    await page.goto('./blog');
    await expect(page.locator('a.rss-link')).toBeVisible();
  });
});
