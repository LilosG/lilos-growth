export function newestFirst(a: any, b: any) {
  const ad = new Date(a?.data?.dateModified ?? a?.data?.datePublished ?? a?.data?.publishDate ?? 0).getTime();
  const bd = new Date(b?.data?.dateModified ?? b?.data?.datePublished ?? b?.data?.publishDate ?? 0).getTime();
  return bd - ad;
}
