import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// CSP violation report sink. Accepts both:
//   - legacy: application/csp-report  (Chrome, older Firefox)
//   - modern: application/reports+json (Reporting API)
// Logged to Vercel's runtime logs. Free, durable, queryable.
//
// Only POST is allowed; the endpoint is intentionally minimal.
// We don't authenticate the report — browsers don't send creds —
// but we cap body size and never echo content back to the client.

export const runtime = "edge";
export const dynamic = "force-dynamic";

const MAX_BODY = 16 * 1024; // 16 KiB; reports are tiny.

export async function POST(req: NextRequest) {
  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > MAX_BODY) {
    return new NextResponse(null, { status: 413 });
  }

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  // Pull the most useful fields without trusting the shape.
  // Both report formats nest the violation a little differently.
  const ua = req.headers.get("user-agent") ?? "";
  console.warn(
    "[csp-report]",
    JSON.stringify({
      ua,
      ct: req.headers.get("content-type") ?? "",
      report: body,
    }),
  );

  // 204 — accepted, no content. Browsers don't expect a body.
  return new NextResponse(null, { status: 204 });
}

// Block other methods so the endpoint can't be probed for behavior.
export async function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}
