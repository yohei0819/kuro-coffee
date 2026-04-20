## デプロイ前チェックリスト

### 基本
- [x] npm run build 成功
- [x] 全ページ キーボード操作可能
- [x] 見出し階層正常
- [x] 全画像 alt 設定済み
- [x] 全リンク /kuro-coffee/ ベース
- [x] OGP メタタグ設定済み

### アニメーション・インタラクション
- [x] Canvas パーティクル描画
- [x] マウス追従: パーティクルがカーソルに反応する
- [x] マウス追従: モバイルでタッチに反応する
- [x] マウス追従: reduced-motion 時に無効
- [x] Canvas ページ遷移クリーンアップ（イベントリスナー含む）
- [x] GSAP アニメーション動作
- [x] reduced-motion: GSAP+Canvas すべて停止
- [x] Shared Element Transition 動作

### 3D傾斜エフェクト
- [x] 商品カードがマウス位置に応じて傾く
- [x] 光沢エフェクトがマウスに連動
- [x] マウスアウトで元に戻る
- [x] reduced-motion 時に傾斜しない（getReducedMotion チェック）

### フォーム・メニュー
- [x] モバイルメニュー動作
- [x] フォーム送信UI（送信中/成功/失敗）

### パフォーマンス
- [x] Lighthouse CI がデプロイ後に実行される
- [ ] Lighthouse: Perf 90+ / A11y 100
- [ ] axe: エラー 0件
