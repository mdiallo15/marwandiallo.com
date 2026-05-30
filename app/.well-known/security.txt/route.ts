// Static security.txt per RFC 9116. Served as text/plain. Update Expires
// when it nears the date below; clients ignore the file after Expires.
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export function GET() {
  const expires = new Date(Date.now() + ONE_YEAR_MS).toISOString();
  const body = [
    "Contact: mailto:hello@marwandiallo.com",
    `Expires: ${expires}`,
    "Preferred-Languages: en",
    "Canonical: https://marwandiallo.com/.well-known/security.txt",
    "",
  ].join("\n");
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
