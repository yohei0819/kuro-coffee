/**
 * Unsplash から画像を取得し WebP に変換する
 * 実行: npm run fetch-images
 * URL無効時: Unsplash で類似画像を検索し URL を差し替えて再実行
 */
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import sharp from 'sharp';

const P = 'src/assets/products';
const A = 'src/assets';

const images = [
  { name: 'kuro-blend',     url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80',  dir: P },
  { name: 'morning-light',  url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80',  dir: P },
  { name: 'tsuki-blend',    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',  dir: P },
  { name: 'colombia-huila', url: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&q=80',  dir: P },
  { name: 'yoru-decaf',     url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',  dir: P },
  { name: 'brazil-santos',  url: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&q=80',  dir: P },
  { name: 'story',          url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',  dir: A },
];

async function run() {
  let ok = 0, ng = 0;
  for (const img of images) {
    if (!existsSync(img.dir)) await mkdir(img.dir, { recursive: true });
    console.log(`📥 ${img.name}...`);
    try {
      const res = await fetch(img.url);
      if (!res.ok) { console.error(`❌ ${img.name}: HTTP ${res.status}`); ng++; continue; }
      const buf = Buffer.from(await res.arrayBuffer());
      const size = img.dir === A ? { width: 800, height: 800 } : { width: 600, height: 800 };
      await sharp(buf).resize(size.width, size.height, { fit: 'cover' }).webp({ quality: 80 }).toFile(`${img.dir}/${img.name}.webp`);
      console.log(`✅ ${img.dir}/${img.name}.webp`);
      ok++;
    } catch (e) { console.error(`❌ ${img.name}: ${e instanceof Error ? e.message : e}`); ng++; }
  }
  console.log(`\n📊 ${ok}成功 / ${ng}失敗 / ${images.length}合計`);
  if (ng > 0) console.log('⚠️ 失敗した画像は URL を差し替えて再実行');
}
run().catch(console.error);
