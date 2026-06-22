const SOURCE = "https://squarespacelab.com/lp";

function getBodyHtml(documentHtml: string) {
  const bodyMatch = documentHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch?.[1] ?? documentHtml;

  return body
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/href=["']javascript:[^"']*["']/gi, 'href="#"')
    .replace(/(src|href|data-src|poster)=["']\/lp\/assets\//g, `$1="${SOURCE}/assets/`)
    .replace(/(src|href|data-src|poster)=["']assets\//g, `$1="${SOURCE}/assets/`)
    .replace(/url\(["']?\/lp\/assets\//g, `url(${SOURCE}/assets/`)
    .replace(/url\(["']?assets\//g, `url(${SOURCE}/assets/`)
    .replace(/(srcset)=["']\/lp\/assets\//g, `$1="${SOURCE}/assets/`)
    .replace(/(srcset)=["']assets\//g, `$1="${SOURCE}/assets/`)
    .replace(/action=["'](?!https?:|#|javascript:)([^"']*)["']/g, `action="https://squarespacelab.com/$1"`);
}

export default async function LandingPage() {
  const response = await fetch(SOURCE, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch lp source page: ${response.status}`);
  }

  const html = getBodyHtml(await response.text());

  return <div className="lp-mirror" dangerouslySetInnerHTML={{ __html: html }} />;
}
