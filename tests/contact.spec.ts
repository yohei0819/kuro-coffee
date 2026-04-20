import { test, expect } from '@playwright/test';

test.describe('Contact', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./contact');
    await page.waitForLoadState('networkidle');
  });

  test('空送信でバリデーションエラー', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('#name-error')).not.toBeEmpty();
  });

  test('名前未入力エラー', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('#name-error')).toHaveText('お名前を入力してください');
  });

  test('不正メールアドレスエラー', async ({ page }) => {
    await page.fill('#name', 'テスト太郎');
    await page.fill('#email', 'invalid');
    await page.fill('#message', 'テスト');
    await page.click('button[type="submit"]');
    await expect(page.locator('#email-error')).toHaveText('有効なメールアドレスを入力してください');
  });

  test('送信シミュレーション成功', async ({ page }) => {
    await page.fill('#name', 'テスト太郎');
    await page.fill('#email', 'test@example.com');
    await page.fill('#message', 'テストメッセージです。');
    await page.click('button[type="submit"]');
    await expect(page.locator('#form-success')).toBeVisible({ timeout: 5000 });
  });

  test('成功後フォーム非表示', async ({ page }) => {
    await page.fill('#name', 'テスト太郎');
    await page.fill('#email', 'test@example.com');
    await page.fill('#message', 'テスト');
    await page.click('button[type="submit"]');
    await expect(page.locator('#form-success')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#contact-form')).toHaveAttribute('hidden', '');
  });
});
