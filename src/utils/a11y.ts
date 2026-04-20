/**
 * アクセシビリティ関連のユーティリティ
 */

/** フォーカストラップ解除用のイベントハンドラ参照 */
let trapHandler: ((e: KeyboardEvent) => void) | null = null;

/**
 * 指定コンテナ内にフォーカスを閉じ込める
 * @param container - フォーカスを閉じ込める対象のHTML要素
 */
export function trapFocus(container: HTMLElement): void {
  releaseFocus();

  const focusableSelectors =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  trapHandler = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const focusableEls = container.querySelectorAll<HTMLElement>(focusableSelectors);
    if (focusableEls.length === 0) return;

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  };

  document.addEventListener('keydown', trapHandler);
}

/**
 * フォーカストラップを解除する
 */
export function releaseFocus(): void {
  if (trapHandler) {
    document.removeEventListener('keydown', trapHandler);
    trapHandler = null;
  }
}

/**
 * ユーザーがreduced-motionを設定しているか判定する
 * @returns reduced-motionが有効ならtrue
 */
export function getReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
