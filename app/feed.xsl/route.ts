// XSL stylesheet for /feed.xml. Browsers that follow `<?xml-stylesheet?>`
// render the RSS as a styled page; RSS readers ignore it. The feed is
// public; this only changes how it looks when a human opens it directly.

export const dynamic = "force-static";

const STYLE = `
  body { font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    color: #1a1a1a; background: #fff1e5; max-width: 720px;
    margin: 56px auto; padding: 0 24px; line-height: 1.55; }
  header { border-bottom: 1px solid rgba(10,10,10,.12); padding-bottom: 18px;
    margin-bottom: 28px; }
  h1 { font-size: 1.7rem; margin: 0 0 6px; letter-spacing: -.01em; }
  .meta { color: #6b6b6b; font-size: .82rem; }
  .note { margin-top: 12px; padding: 10px 14px; background: rgba(10,10,10,.04);
    border-radius: 8px; font-size: .85rem; color: #4a4a4a; }
  .note code { background: rgba(10,10,10,.06); padding: 1px 6px; border-radius: 4px; }
  ul { list-style: none; padding: 0; margin: 0; }
  li { border-top: 1px solid rgba(10,10,10,.08); padding: 18px 0; }
  li a.title { color: #1a1a1a; text-decoration: none; font-weight: 500;
    font-size: 1.05rem; }
  li a.title:hover { text-decoration: underline; text-underline-offset: 4px; }
  li time { display: block; color: #6b6b6b; font-size: .78rem;
    text-transform: uppercase; letter-spacing: .12em; margin-top: 4px; }
  li p { margin: 8px 0 0; color: #4a4a4a; font-size: .92rem; }
  footer { margin-top: 40px; color: #6b6b6b; font-size: .8rem; }
  footer a { color: inherit; }
`;

const XSL = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title><xsl:value-of select="/rss/channel/title"/> — RSS feed</title>
        <style>${STYLE}</style>
      </head>
      <body>
        <header>
          <h1><xsl:value-of select="/rss/channel/title"/> — RSS feed</h1>
          <div class="meta"><xsl:value-of select="/rss/channel/description"/></div>
          <div class="note">
            This is an RSS feed. Subscribe in any feed reader (Feedly,
            NetNewsWire, Reeder, Mail.app) by pasting this page's URL.
            New posts will appear there automatically.
          </div>
        </header>
        <ul>
          <xsl:for-each select="/rss/channel/item">
            <li>
              <a class="title" rel="noopener">
                <xsl:attribute name="href">
                  <xsl:value-of select="link"/>
                </xsl:attribute>
                <xsl:value-of select="title"/>
              </a>
              <time><xsl:value-of select="pubDate"/></time>
              <xsl:if test="description">
                <p><xsl:value-of select="description"/></p>
              </xsl:if>
            </li>
          </xsl:for-each>
        </ul>
        <footer>
          <a><xsl:attribute name="href"><xsl:value-of select="/rss/channel/link"/></xsl:attribute>
            ← back to <xsl:value-of select="/rss/channel/link"/>
          </a>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;

export async function GET() {
  return new Response(XSL, {
    headers: {
      "Content-Type": "text/xsl; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
