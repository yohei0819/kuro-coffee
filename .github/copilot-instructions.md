# KURO COFFEE — Copilot プロジェクト指示

<overview>
Astro 5 + React 18 の静的ブランドサイト。GitHub Pages デプロイ（base: /kuro-coffee）。
このルールはすべてのコード生成・編集時に常に適用すること。
判断優先順位: アクセシビリティ > パフォーマンス > 保守性 > 表現力
</overview>

---

<rules>

## R1. スタイリング
- `.astro` → Astro `<style>` スコープタグ
- `.tsx` → CSS Modules（`.module.css`）
- 禁止: .astro での CSS Modules / インラインstyle
- 例外（インラインstyle許可）:
  - `viewTransitionName` の指定 [R12]
  - JavaScript による動的 `transform` 操作（3D傾斜エフェクト等、onMouseMove での style.transform 変更）

## R2. 画像
- `.astro` → `import` 文 + `<Image>` コンポーネント（`import { Image } from 'astro:assets'`）
- `.tsx` → `<img>` タグ + props 経由の URL 文字列（React 内で Astro Image は使用不可）
- .astro 側で画像を import し `.src` で URL 文字列を取得して React に props で渡す
- 禁止: 外部画像URL の直接埋め込み

## R3. リンク
- すべてのリンクは `getBasePath()` 経由（`src/utils/path.ts`）

## R4. デザイントークン
- 色/フォント/余白は `variables.css` の CSS 変数のみ。ハードコード禁止

## R5. TypeScript
- `any` 禁止。strict モード
- 型定義: `src/types/index.ts`, `src/data/products.ts`, `src/utils/canvas.ts`

## R6. HTML
- セマンティック要素のみ。`<div>` ネスト最大3階層
- 見出し: h1→h2→h3 順守、各ページ h1 は1つ
- リスト: `<ul>/<ol>` + `<li>`。時系列は `<ol>` + `<time>`

## R7. アクセシビリティ
- `<html lang="ja">` / スキップリンク(`#main-content`) / `<nav aria-label="メインナビゲーション">`
- ハンバーガー: `aria-expanded` + `aria-controls` + `aria-label`（開く/閉じるで切替）+ Escape閉じ + trapFocus/releaseFocus + 閉じた時ボタンにフォーカス戻し
- 現在ページ: `aria-current="page"`（`Astro.url.pathname` で判定）
- フォーカス: `:focus-visible` カスタムリング。`outline: none` 禁止
- フォーム: `<label for>` ↔ `<input id>` / エラーは `aria-describedby` + `aria-live="polite"`
- フィルター: `role="tablist"` + `role="tab"` + `aria-selected` + 結果変更 `aria-live="polite"`
- 画像: 意味あり → 説明的 alt / 装飾 → `alt=""` / `aria-label` は可視テキストと重複させない

## R8. モーション（GSAP）
- 全アニメーション関数で `getReducedMotion()` を最初にチェック
- reduced-motion 時: `gsap.set(el, {opacity:1, y:0})` で即表示。opacity:0 残留禁止
- `initGSAP()` で ScrollTrigger を事前登録してから使用
- `!important` は global.css の reduced-motion クエリ内のみ許可

## R9. コメント・出力
- 全コンポーネント・全関数に JSDoc
- ファイルは完全出力（`// ...省略` 禁止）
- 架空テキストは自然な日本語（Lorem ipsum 禁止）
- SVG はテーマカラーのコーヒーモチーフ（灰色四角禁止）

## R10. CSS 構成
- Layout.astro で2ファイルを個別 import:
  ```
  import '../styles/variables.css';
  import '../styles/global.css';
  ```
- global.css 内での `@import` は使用しない
- その他の CSS 内 `@import` も禁止

## R11. Canvas
- `aria-hidden="true"` 必須
- ループは `astro:before-swap` で `stop()` を呼んで停止
- `stop()` 内で以下をすべて実行:
  - `cancelAnimationFrame`
  - `ResizeObserver.disconnect()`
  - `mousemove` / `touchmove` / `mouseleave` / `touchend` の `removeEventListener`
- reduced-motion 時: 1回描画して静止。ループ開始しない。マウス追従イベントも登録しない
- パーティクル数: デスクトップ(≥769px) 50 / モバイル(≤768px) 25
- `devicePixelRatio` 上限2
- 描画は `clearRect → beginPath → arc → fill` のみ
- 禁止: `shadowBlur` / `ctx.filter` / 毎フレーム `createRadialGradient` / 毎フレーム `new Image()`

## R12. View Transitions
- .astro: `transition:name={"product-" + product.id}`
- .tsx: `style={{ viewTransitionName: "product-" + product.id }}`
- 遷移元と遷移先で同じ name を使用

## R13. フォーム送信
- 送信中: form に `aria-busy="true"` + ボタン `disabled` + テキスト「送信中...」
- 結果: `role="alert"` で成功/失敗を通知
- fetch は try-catch
- Formspree 未設定時(`URL.includes('xxxxx')`)は console.log + 1秒待機でシミュレーション

## R14. 3D傾斜エフェクト
- onMouseMove で `perspective(1000px) rotateX/rotateY` を style.transform に設定 [R1例外]
- onMouseLeave で `style.transform = ''` にリセット
- CSS: `transition: transform var(--transition-normal)` + `will-change: transform`
- reduced-motion 時: `getReducedMotion()` が true なら onMouseMove で何もしない（イベント内の先頭でチェック）
- 光沢エフェクト: `::after` 疑似要素で白半透明グラデーション、マウス位置連動

</rules>

---

<file-map>
## ファイル配置
```
src/components/common/    → Astro [R1:<style>]
src/components/home/      → Astro [R1:<style>]
src/components/products/  → React [R1:CSS Modules]
src/layouts/              → Layout.astro
src/pages/                → .astro ページ
src/styles/               → variables.css + global.css
src/data/                 → products.ts + navigation.ts
src/types/                → index.ts
src/utils/                → path.ts + animation.ts + a11y.ts + canvas.ts
src/assets/               → SVG（products/ サブディレクトリ含む）
public/                   → favicon.svg + og-image.svg
```
</file-map>

<error-policy>
修正時: 正しいコードのみ出力（旧コード残さない）+ 1行修正コメント + 連鎖修正 + build 再実行。同じエラー2回 → 根本原因分析してアプローチ変更。
</error-policy>
