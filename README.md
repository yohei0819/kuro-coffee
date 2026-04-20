# KURO COFFEE

架空のスペシャルティコーヒーブランド **KURO COFFEE** のブランドサイトです。

**Live:** https://yohei0819.github.io/kuro-coffee

---

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Astro 5 + React 18 |
| アニメーション | GSAP 3 + ScrollTrigger |
| 言語 | TypeScript 5（strict モード） |
| スタイリング | Astro Scoped CSS + CSS Modules |
| CI/CD | GitHub Actions → GitHub Pages |

## Lighthouse スコア

![Lighthouse Score](docs/lighthouse-score.png)

## 特徴

- **Lighthouse 全カテゴリ 100 点** — Performance / Accessibility / Best Practices / SEO
- **axe 全ページ violations 0 件**
- **View Transitions** — ページ遷移時のスムーズなアニメーション（Astro ClientRouter）
- **Canvas パーティクル** — ヒーローセクションの蒸気エフェクト（マウス/タッチ追従）
- **3D 傾斜エフェクト** — 商品カードの `perspective` + `rotateX/Y` + 光沢オーバーレイ
- **GSAP スクロールアニメーション** — フェードイン / 時差表示 / テキスト分割
- **レスポンシブ対応** — モバイルハンバーガーメニュー + フォーカストラップ
- **reduced-motion 対応** — `prefers-reduced-motion: reduce` で全アニメーション停止
- **アクセシビリティ** — セマンティック HTML / スキップリンク / ARIA 属性 / フォーカス管理

## ページ構成

| パス | ページ | 内容 |
|---|---|---|
| `/` | Home | ヒーロー / ストーリー / こだわり / 注目商品 / CTA |
| `/about` | About | ブランドの歴史とストーリー |
| `/products` | Products | 全商品一覧 + カテゴリフィルター |
| `/products/[id]` | Product Detail | 商品詳細（View Transitions 対応） |
| `/contact` | Contact | お問い合わせフォーム（Formspree） |

## アクセシビリティ対応

| 項目 | 実装内容 |
|---|---|
| 言語属性 | `<html lang="ja">` |
| スキップリンク | `#main-content` へのスキップナビゲーション |
| ナビゲーション | `<nav aria-label="メインナビゲーション">` |
| ハンバーガーメニュー | `aria-expanded` / `aria-controls` / `aria-label` 切替 / Escape 閉じ / フォーカストラップ |
| 現在ページ | `aria-current="page"` で現在地を明示 |
| フォーカス管理 | `:focus-visible` カスタムリング / `outline: none` 不使用 |
| フォーム | `<label for>` ↔ `<input id>` 紐付け / `aria-describedby` + `aria-live="polite"` |
| フィルター | `role="tablist"` + `role="tab"` + `aria-selected` + `aria-live="polite"` |
| 画像 | 意味のある画像は説明的 `alt` / 装飾画像は `alt=""` |
| Canvas | `aria-hidden="true"` |
| reduced-motion | `prefers-reduced-motion: reduce` で全アニメーション停止・即表示 |
| 見出し階層 | 各ページ `h1` は1つ / `h1→h2→h3` 順守 |

## テスト

| 種類 | ツール | 内容 |
|---|---|---|
| E2E | Playwright | ナビゲーション / 商品フィルター / お問い合わせフォーム / アクセシビリティ（28テスト） |
| Lighthouse | Lighthouse CLI + Puppeteer | Performance / Accessibility / Best Practices / SEO 全カテゴリ 100 点 |

```bash
npm run test:e2e    # Playwright E2E テスト実行
npm run lighthouse  # Lighthouse スコア取得 + スクリーンショット生成
```

## プロジェクト構造

```
src/
├── assets/              # SVG 画像（ヒーロー / 商品 / こだわり）
├── components/
│   ├── common/          # Astro 共通コンポーネント（Header / Footer / Button）
│   ├── home/            # Astro ホームセクション（Hero / Story / Commitment）
│   └── products/        # React コンポーネント（ProductFilter / ProductCard）
├── data/                # 商品データ / ナビゲーション定義
├── layouts/             # Layout.astro（共通レイアウト）
├── pages/               # ルーティング（index / about / products / contact）
├── styles/              # variables.css / global.css
├── types/               # TypeScript 型定義
└── utils/               # path / animation / a11y / canvas ユーティリティ
```

## セットアップ

```bash
npm install
npm run dev       # 開発サーバー起動（http://localhost:4321）
npm run build     # 本番ビルド
npm run preview   # ビルド結果プレビュー
```

## デプロイ

`main` ブランチへの push で GitHub Actions が自動実行されます。

1. **build** — `npm run build` で静的ファイル生成
2. **deploy** — GitHub Pages へデプロイ
3. **lighthouse** — Lighthouse CI でパフォーマンス検証

## コーディング規約

[.github/copilot-instructions.md](.github/copilot-instructions.md) に全ルール（R1〜R14）を定義しています。

- `.astro` → Astro `<style>` スコープ / `.tsx` → CSS Modules
- 画像: `.astro` は `<Image>` / `.tsx` は `<img>` + props 経由
- リンク: `getBasePath()` 経由
- デザイントークン: CSS カスタムプロパティのみ
- アクセシビリティ最優先（判断優先順位: アクセシビリティ > パフォーマンス > 保守性 > 表現力）

## ライセンス

このプロジェクトはポートフォリオ用のデモサイトです。
