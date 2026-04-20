/**
 * Canvas蒸気パーティクル描画ユーティリティ
 */
import { getReducedMotion } from './a11y';

/** パーティクル1粒の型 */
type Particle = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  swayAmplitude: number;
  swayOffset: number;
  initialX: number;
};

/** パーティクル制御用コントローラの型 */
type SteamController = {
  start: () => void;
  stop: () => void;
};

/**
 * パーティクルを1粒生成する
 * @param width - キャンバス幅
 * @param height - キャンバス高
 * @returns 新しいパーティクル
 */
function createParticle(width: number, height: number): Particle {
  const x = Math.random() * width;
  return {
    x,
    y: height + Math.random() * 50,
    radius: 2 + Math.random() * 4,
    opacity: 0.05 + Math.random() * 0.25,
    speed: 0.3 + Math.random() * 0.7,
    swayAmplitude: 20 + Math.random() * 30,
    swayOffset: Math.random() * Math.PI * 2,
    initialX: x,
  };
}

/**
 * 蒸気パーティクルをCanvasに描画するコントローラを初期化する
 * @param canvas - 描画対象のCanvas要素
 * @returns start/stopメソッドを持つコントローラ
 */
export function initSteamParticles(canvas: HTMLCanvasElement): SteamController {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return { start: () => {}, stop: () => {} };
  }

  const dpr = Math.min(window.devicePixelRatio, 2);
  const isMobile = window.innerWidth <= 768;
  const particleCount = isMobile ? 25 : 50;
  const accentColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-accent')
    .trim() || '#c8a97e';

  /** HEXカラーをRGB値に変換する */
  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const h = hex.replace('#', '');
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16),
    };
  }
  const rgb = hexToRgb(accentColor);

  let particles: Particle[] = [];
  let animationId: number | null = null;
  let isRunning = false;
  let mouse: { x: number; y: number } | null = null;
  let time = 0;

  /** キャンバスサイズをリサイズに追従させる */
  function resize(): void {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx!.scale(dpr, dpr);
  }

  /** パーティクル配列を初期化する */
  function initParticles(): void {
    const rect = canvas.getBoundingClientRect();
    particles = Array.from({ length: particleCount }, () =>
      createParticle(rect.width, rect.height)
    );
  }

  /** 1フレーム分の描画処理 */
  function draw(): void {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx!.clearRect(0, 0, w, h);

    for (const p of particles) {
      // 上方向に移動
      p.y -= p.speed;
      // sin波で横揺れ
      p.x = p.initialX + Math.sin(time * 0.02 + p.swayOffset) * p.swayAmplitude;

      // マウス追従: 近いパーティクルを反発させる
      if (mouse !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
        }
      }

      // 画面外に出たらリセット
      if (p.y < -10) {
        const reset = createParticle(w, h);
        p.x = reset.x;
        p.y = h + Math.random() * 50;
        p.initialX = reset.initialX;
        p.swayOffset = reset.swayOffset;
      }

      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${p.opacity})`;
      ctx!.fill();
    }

    time++;
  }

  /** アニメーションループ */
  function loop(): void {
    draw();
    animationId = requestAnimationFrame(loop);
  }

  // ResizeObserver
  const observer = new ResizeObserver(() => {
    resize();
  });

  // イベントハンドラ
  const onMouseMove = (e: MouseEvent): void => {
    const rect = canvas.getBoundingClientRect();
    mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onTouchMove = (e: TouchEvent): void => {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouse = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  };

  const onMouseLeave = (): void => {
    mouse = null;
  };

  const onTouchEnd = (): void => {
    mouse = null;
  };

  return {
    /** パーティクルアニメーションを開始する */
    start(): void {
      if (isRunning) return;
      isRunning = true;

      resize();
      initParticles();
      observer.observe(canvas);

      if (getReducedMotion()) {
        // reduced-motion: 1回描画して静止。マウス追従なし
        draw();
        return;
      }

      // マウス/タッチイベント登録
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('touchmove', onTouchMove);
      canvas.addEventListener('mouseleave', onMouseLeave);
      canvas.addEventListener('touchend', onTouchEnd);

      loop();
    },

    /** パーティクルアニメーションを停止しリソースを解放する */
    stop(): void {
      isRunning = false;

      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }

      observer.disconnect();

      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchend', onTouchEnd);
    },
  };
}
