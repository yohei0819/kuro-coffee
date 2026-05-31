/**
 * 店舗情報 — アクセスページと構造化データ（LocalBusiness）で共有する単一の情報源
 */

/** 営業時間の1行分 */
export type OpeningHour = {
  /** 曜日ラベル（例: 平日、土日祝） */
  days: string;
  /** 営業時間（例: 8:00 - 19:00） */
  hours: string;
  /** schema.org openingHours 形式（例: "Mo-Fr 08:00-19:00"） */
  spec: string;
};

/** 店舗情報の型 */
export type StoreInfo = {
  name: string;
  description: string;
  postalCode: string;
  region: string;
  city: string;
  streetAddress: string;
  addressLine: string;
  tel: string;
  email: string;
  latitude: number;
  longitude: number;
  openingHours: OpeningHour[];
  closedDays: string;
  access: string[];
};

/** KURO COFFEE 旗艦店の店舗情報（架空のサンプル） */
export const store: StoreInfo = {
  name: 'KURO COFFEE 中目黒本店',
  description:
    '自家焙煎にこだわるスペシャルティコーヒーショップ。落ち着いた空間で、淹れたての一杯と焙煎したての豆をお届けします。',
  postalCode: '153-0051',
  region: '東京都',
  city: '目黒区',
  streetAddress: '上目黒1-2-3 KUROビル 1F',
  addressLine: '東京都目黒区上目黒1-2-3 KUROビル 1F',
  tel: '03-1234-5678',
  email: 'hello@kuro-coffee.example',
  latitude: 35.6447,
  longitude: 139.6989,
  openingHours: [
    { days: '平日', hours: '8:00 - 20:00', spec: 'Mo-Fr 08:00-20:00' },
    { days: '土日祝', hours: '9:00 - 19:00', spec: 'Sa,Su 09:00-19:00' },
  ],
  closedDays: '毎週水曜日',
  access: [
    '東急東横線・東京メトロ日比谷線「中目黒駅」より徒歩5分',
    '駐車場はございません。近隣のコインパーキングをご利用ください。',
  ],
};
