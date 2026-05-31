/** 商品カテゴリの型 */
export type ProductCategory = 'blend' | 'single-origin' | 'decaf';

/** 商品データの型 */
export type Product = {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  category: ProductCategory;
  description: string;
  image: string;
  taste: string;
  brewMethod: string;
};

/** カテゴリのラベル定義 */
export const categoryLabels: Record<ProductCategory | 'all', string> = {
  all: 'すべて',
  blend: 'ブレンド',
  'single-origin': 'シングルオリジン',
  decaf: 'デカフェ',
};

/**
 * 価格を「¥1,200」形式の文字列にフォーマットする
 * @param price - 税込価格（円）
 * @returns ロケール区切りを含む価格文字列
 */
export function formatPrice(price: number): string {
  return `¥${price.toLocaleString('ja-JP')}`;
}

/** 商品一覧データ */
export const products: Product[] = [
  {
    id: 'kuro-blend',
    name: '黒ブレンド',
    nameEn: 'KURO Blend',
    price: 1200,
    category: 'blend',
    description: '深煎りのコクと甘みが調和した、看板ブレンド。',
    image: 'kuro-blend.webp',
    taste: 'ビターチョコレートのような深いコクと、キャラメルを思わせるほのかな甘み。後味にスモーキーな余韻が残ります。ブラジルとインドネシアの豆を6:4でブレンドし、フルシティローストで仕上げました。',
    brewMethod: 'フレンチプレスがおすすめです。中粗挽き、湯温90℃、4分間抽出。オイル感が際立ち、コクのある一杯に仕上がります。',
  },
  {
    id: 'morning-light',
    name: '朝の光',
    nameEn: 'Morning Light',
    price: 1400,
    category: 'single-origin',
    description: 'エチオピア産の華やかな酸味とフルーティーな香り。',
    image: 'morning-light.webp',
    taste: 'ジャスミンのようなフローラルな香りと、ブルーベリーを思わせる明るい酸味。ウォッシュドプロセスならではのクリーンカップで、朝の目覚めにぴったりの一杯です。',
    brewMethod: 'ペーパードリップ（V60）がおすすめです。中細挽き、湯温88℃、蒸らし30秒。繊細なフレーバーを逃さず抽出できます。',
  },
  {
    id: 'tsuki-blend',
    name: '月ブレンド',
    nameEn: 'Tsuki Blend',
    price: 1300,
    category: 'blend',
    description: '夜のリラックスタイムに。まろやかな口当たり。',
    image: 'tsuki-blend.webp',
    taste: 'ミルクチョコレートのようなまろやかさと、はちみつを思わせる優しい甘み。酸味を抑え、丸みのある口当たりに仕上げました。コロンビアとグアテマラの豆を使用しています。',
    brewMethod: 'カフェオレにもおすすめです。中挽き、湯温92℃のペーパードリップでやや濃いめに抽出し、温めたミルクと1:1で合わせてください。',
  },
  {
    id: 'colombia-huila',
    name: 'コロンビア ウイラ',
    nameEn: 'Colombia Huila',
    price: 1500,
    category: 'single-origin',
    description: 'ナッツのような甘みとチョコレートの余韻。',
    image: 'colombia-huila.webp',
    taste: 'ヘーゼルナッツの香ばしさと、ダークチョコレートのような深い甘み。標高1,800mの農園で栽培されたティピカ種を、ミディアムハイローストで仕上げました。バランスの良い味わいです。',
    brewMethod: 'エアロプレスがおすすめです。中細挽き、湯温85℃、1分30秒のインバート抽出。クリーンでありながら甘みが引き立つ一杯になります。',
  },
  {
    id: 'yoru-decaf',
    name: '夜カフェインレス',
    nameEn: 'Yoru Decaf',
    price: 1400,
    category: 'decaf',
    description: 'カフェインレスでも妥協しない、深い味わい。',
    image: 'yoru-decaf.webp',
    taste: 'スイスウォータープロセスでカフェインを99.9%除去。それでもキャラメルのような甘みと、ほのかなシトラスの酸味をしっかりと感じられます。就寝前のリラックスタイムに最適です。',
    brewMethod: 'ペーパードリップがおすすめです。中挽き、湯温90℃、蒸らし30秒。ゆっくり3回に分けて注ぐことで、豆の風味を余すことなく引き出せます。',
  },
  {
    id: 'brazil-santos',
    name: 'ブラジル サントス',
    nameEn: 'Brazil Santos',
    price: 1100,
    category: 'single-origin',
    description: 'バランスの取れた定番。毎日飲んでも飽きない。',
    image: 'brazil-santos.webp',
    taste: 'ナッツとカカオのバランスが取れた、飲み飽きない味わい。ナチュラルプロセスによる素朴な甘みが特徴です。ミナスジェライス州の標高1,100mの農園から直接仕入れています。',
    brewMethod: 'どの抽出方法でも安定した味わいが楽しめます。初めての方には中挽きのペーパードリップ（湯温90℃）がおすすめ。アイスコーヒーにも適しています。',
  },
];
