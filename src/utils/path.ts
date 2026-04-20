/**
 * ベースパスを付与してURLを生成する
 * @param path - ベースパスに続くパス文字列
 * @returns ベースパス付きの完全パス
 */
export function getBasePath(path: string): string {
  const base = '/kuro-coffee';
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
