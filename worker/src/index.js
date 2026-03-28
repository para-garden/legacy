const PAGES_ORIGIN = "https://legacy-jtf.pages.dev";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Redirect /legacy to /legacy/ so relative paths resolve correctly
    if (url.pathname === "/legacy") {
      url.pathname = "/legacy/";
      return Response.redirect(url.toString(), 301);
    }

    // Strip /legacy prefix and fetch from Pages
    const path = url.pathname.replace(/^\/legacy/, "") || "/";
    const pagesUrl = new URL(path + url.search, PAGES_ORIGIN);

    const response = await fetch(pagesUrl, {
      method: request.method,
      headers: request.headers,
    });

    // Pass through with immutable headers copied
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  },
};
