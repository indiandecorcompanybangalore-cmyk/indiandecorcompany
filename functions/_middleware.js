export async function onRequest(context) {
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();
  const protocol = url.protocol.toLowerCase();

  const isWww = hostname === 'www.indiandecorcompany.in';
  const isHttp = protocol === 'http:';

  // Check if pathname should have trailing slash (exclude assets, api, files with extensions)
  const isAsset = url.pathname.includes('.') || url.pathname.startsWith('/assets/');
  const needsTrailingSlash = !isAsset && !url.pathname.endsWith('/');

  let normalizedPath = url.pathname;
  if (needsTrailingSlash) {
    normalizedPath += '/';
  }

  // 301 Permanent Redirect to canonical apex HTTPS with trailing slash
  // Single-hop consolidation of protocol, www, and trailing slash while preserving query params
  if (isWww || isHttp || (hostname === 'indiandecorcompany.in' && needsTrailingSlash)) {
    const destination = new URL(normalizedPath + url.search, 'https://indiandecorcompany.in');
    return Response.redirect(destination.toString(), 301);
  }

  return context.next();
}
