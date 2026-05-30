import { getAllPosts } from "@/lib/writing";

const SITE_URL = "https://marwandiallo.com";
const AUTHOR = "Marwan Diallo";
const AUTHOR_EMAIL = "hello@marwandiallo.com";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const updated = posts[0]
    ? new Date(posts[0].updated ?? posts[0].date).toISOString()
    : new Date().toISOString();

  const entries = posts
    .map((p) => {
      const url = `${SITE_URL}/writing/${p.slug}`;
      return `  <entry>
    <id>${url}</id>
    <title>${escapeXml(p.title)}</title>
    <link rel="alternate" type="text/html" href="${url}"/>
    <published>${new Date(p.date).toISOString()}</published>
    <updated>${new Date(p.updated ?? p.date).toISOString()}</updated>
    ${p.summary ? `<summary>${escapeXml(p.summary)}</summary>` : ""}
    <author><name>${AUTHOR}</name><email>${AUTHOR_EMAIL}</email></author>
  </entry>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Marwan Diallo</title>
  <subtitle>Essays on security, building, and Guinea.</subtitle>
  <id>${SITE_URL}/</id>
  <link rel="self" type="application/atom+xml" href="${SITE_URL}/atom.xml"/>
  <link rel="alternate" type="text/html" href="${SITE_URL}/"/>
  <updated>${updated}</updated>
  <author><name>${AUTHOR}</name><email>${AUTHOR_EMAIL}</email></author>
${entries}
</feed>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
