export function canonicalUrl(path: string) {
  const base = 'https://lilosgrowth.com';
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function metaTags(opts: { title: string; description: string; url: string; image?: string }) {
  const { title, description, url, image } = opts;
  return `
<title>${title}</title>
<link rel="canonical" href="${url}">
<meta name="description" content="${description}">
<meta property="og:type" content="article">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
${image ? `<meta property="og:image" content="${image}">` : ``}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
${image ? `<meta name="twitter:image" content="${image}">` : ``}
`;
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return JSON.stringify(obj);
}

export function blogPostingJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
  author: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const o: any = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    author: { '@type': 'Person', name: opts.author },
  };
  if (opts.datePublished) o.datePublished = opts.datePublished;
  if (opts.dateModified) o.dateModified = opts.dateModified;
  if (opts.image) o.image = [opts.image];
  return JSON.stringify(o);
}

export function websiteSearchActionJsonLd() {
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://lilosgrowth.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://lilosgrowth.com/blog?query={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
  return JSON.stringify(obj);
}
