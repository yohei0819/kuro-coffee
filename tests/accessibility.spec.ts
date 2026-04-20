import { test, expect } from '@playwright/test';

const pages = ['./', './about', './products', './contact'];

test.describe('アクセシビリティ', () => {
  for (const path of pages) {
    test(`${path} — h1 が1つ`, async ({ page }) => {
      await page.goto(path);
      expect(await page.locator('h1').count()).toBe(1);
    });

    test(`${path} — 見出し階層に飛びがない`, async ({ page }) => {
      await page.goto(path);
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      let max = 0;
      for (const h of headings) {
        const lv = parseInt((await h.evaluate((el) => el.tagName)).replace('H', ''));
        if (lv > max) expect(lv).toBe(max + 1);
        if (lv > max) max = lv;
      }
    });

    test(`${path} — 全 img に alt`, async ({ page }) => {
      await page.goto(path);
      for (const img of await page.locator('img').all()) {
        expect(await img.getAttribute('alt')).not.toBeNull();
      }
    });
  }

  test('ハンバーガー — Escape で閉じる', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('./');
    const btn = page.locator('button[aria-controls="mobile-menu"]');
    await btn.click();
    await expect(btn).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  test('ハンバーガー — 閉じた後フォーカス戻り', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('./');
    const btn = page.locator('button[aria-controls="mobile-menu"]');
    await btn.click();
    await page.keyboard.press('Escape');
    await expect(btn).toBeFocused();
  });
});
