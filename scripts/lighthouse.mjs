/**
 * Lighthouse CLI スクリプト
 * preview サーバーを起動し、全ページの Lighthouse スコアを取得してスクリーンショットを生成する
 */
import { execSync, spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

async function runLighthouse() {
  // ビルド
  console.log('🔨 Building...');
  execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });

  // preview サーバー起動
  console.log('🚀 Starting preview server...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4322'], {
    cwd: ROOT,
    stdio: 'pipe',
  });

  // サーバー起動待ち
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Server start timeout')), 15000);
    server.stdout.on('data', (data) => {
      const msg = data.toString();
      if (msg.includes('4322')) {
        clearTimeout(timeout);
        resolve();
      }
    });
    server.stderr.on('data', (data) => {
      const msg = data.toString();
      if (msg.includes('4322')) {
        clearTimeout(timeout);
        resolve();
      }
    });
  });

  console.log('✅ Preview server ready');

  const url = 'http://localhost:4322/kuro-coffee/';

  try {
    // Lighthouse を動的 import
    const { default: lighthouse } = await import('lighthouse');
    const puppeteer = await import('puppeteer');

    const browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-gpu'],
    });

    const page = await browser.newPage();

    // Lighthouse 実行
    console.log(`🔍 Running Lighthouse on ${url}`);
    const result = await lighthouse(url, {
      port: new URL(browser.wsEndpoint()).port,
      output: ['html', 'json'],
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    });

    const { lhr } = result;

    // スコア抽出
    const scores = {
      Performance: Math.round(lhr.categories.performance.score * 100),
      Accessibility: Math.round(lhr.categories.accessibility.score * 100),
      'Best Practices': Math.round(lhr.categories['best-practices'].score * 100),
      SEO: Math.round(lhr.categories.seo.score * 100),
    };

    console.log('\n📊 Lighthouse Scores:');
    for (const [key, val] of Object.entries(scores)) {
      const emoji = val >= 90 ? '🟢' : val >= 50 ? '🟠' : '🔴';
      console.log(`  ${emoji} ${key}: ${val}`);
    }

    // HTML レポート保存
    mkdirSync(join(ROOT, 'docs'), { recursive: true });
    writeFileSync(join(ROOT, 'docs', 'lighthouse-report.html'), result.report[0]);
    console.log('\n📄 HTML report saved to docs/lighthouse-report.html');

    // JSON スコアも保存
    writeFileSync(
      join(ROOT, 'docs', 'lighthouse-scores.json'),
      JSON.stringify(scores, null, 2)
    );

    // Puppeteer でスクリーンショット生成（スコアバッジ画像）
    // HTML レポートをブラウザで開いてスクリーンショット
    const reportPage = await browser.newPage();
    await reportPage.setViewport({ width: 1200, height: 900 });
    await reportPage.setContent(result.report[0]);
    await reportPage.waitForSelector('.lh-scores-container', { timeout: 10000 });

    // スコア部分だけスクリーンショット
    const scoresEl = await reportPage.$('.lh-scores-container');
    if (scoresEl) {
      await scoresEl.screenshot({ path: join(ROOT, 'docs', 'lighthouse-score.png') });
      console.log('📸 Screenshot saved to docs/lighthouse-score.png');
    } else {
      // フォールバック: ページ上部をスクリーンショット
      await reportPage.screenshot({
        path: join(ROOT, 'docs', 'lighthouse-score.png'),
        clip: { x: 0, y: 0, width: 1200, height: 500 },
      });
      console.log('📸 Screenshot (fallback) saved to docs/lighthouse-score.png');
    }

    await browser.close();
  } catch (err) {
    console.error('❌ Lighthouse error:', err);
    process.exit(1);
  } finally {
    server.kill();
    console.log('\n🛑 Preview server stopped');
  }
}

runLighthouse();
