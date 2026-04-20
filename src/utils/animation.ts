/**
 * GSAP アニメーション ユーティリティ
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getReducedMotion } from './a11y';

/**
 * GSAPとScrollTriggerを初期化する
 */
export function initGSAP(): void {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 全ScrollTriggerインスタンスを破棄する（ページ遷移時のクリーンアップ用）
 */
export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

/**
 * 要素をフェードイン＋上方向スライドでアニメーションする
 * @param el - 対象要素またはセレクタ
 * @param opts - オプション（delay）
 */
export function fadeInUp(el: string | Element, opts?: { delay?: number }): void {
  if (getReducedMotion()) {
    gsap.set(el, { opacity: 1, y: 0 });
    return;
  }

  gsap.from(el, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    delay: opts?.delay ?? 0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el as gsap.DOMTarget,
      start: 'top 80%',
      once: true,
    },
  });
}

/**
 * 複数要素を時差付きでフェードインする
 * @param els - 対象要素群またはセレクタ
 * @param opts - オプション（stagger間隔）
 */
export function staggerFadeIn(els: string | Element, opts?: { stagger?: number }): void {
  if (getReducedMotion()) {
    gsap.set(els, { opacity: 1, y: 0 });
    return;
  }

  gsap.from(els, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: opts?.stagger ?? 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: els as gsap.DOMTarget,
      start: 'top 80%',
      once: true,
    },
  });
}

/**
 * テキストを1文字ずつ分割してアニメーションする
 * @param el - 対象要素またはセレクタ
 */
export function splitTextAnimation(el: string | Element): void {
  const element = typeof el === 'string' ? document.querySelector(el) : el;
  if (!element || !(element instanceof HTMLElement)) return;

  const text = element.textContent ?? '';
  element.innerHTML = '';

  const chars = text.split('').map((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    element.appendChild(span);
    return span;
  });

  if (getReducedMotion()) {
    gsap.set(chars, { opacity: 1, y: 0 });
    return;
  }

  gsap.from(chars, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.04,
    ease: 'power2.out',
  });
}
