export const dynamic = "force-static";

const BODY = `/* TEAM */
Author: Marwan Diallo
Site: https://marwandiallo.com
GitHub: https://github.com/mdiallo15
Location: Conakry / Seattle

/* SITE */
Standards: HTML5, CSS3, RFC 9116
Components: Next.js 15 App Router, React 19, Tailwind v4
Content: MDX via remark + rehype + Shiki
Hosting: Vercel
Source: https://github.com/mdiallo15/marwandiallo.com

/* THANKS */
Typography: Geist + Geist Mono
Palette: FT salmon (#fff1e5), ink (#0a0a0a)
`;

export function GET() {
  return new Response(BODY, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
