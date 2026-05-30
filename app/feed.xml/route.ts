import { getAllPosts, getPost, renderMarkdown } from "@/lib/writing";

const SITE_URL = "https://marwandiallo.com";

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
  const items = (
    await Promise.all(
      posts.map(async (p) => {
        const url = `${SITE_URL}/writing/${p.slug}`;
        const full = getPost(p.slug);
        const html = full ? await renderMarkdown(full.content) : "";
        return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.summary ? `<description>${escapeXml(p.summary)}</description>` : ""}
      <content:encoded><![CDATA[${html}]]></content:encoded>
    </item>`;
      }),
    )
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Marwan Diallo</title>
    <link>${SITE_URL}</link>
    <description>Essays on security, building, and Guinea.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
