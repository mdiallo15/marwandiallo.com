import { headers } from "next/headers";

interface Props {
  data: Record<string, unknown>;
}

/**
 * Server component. Emits a `<script type="application/ld+json">` tag
 * with the per-request CSP nonce so it isn't blocked by our nonce-only
 * script-src. Data is JSON-stringified once and inlined.
 *
 * Why the nonce is required: per CSP3 §6.1, `script-src` gates every
 * `<script>` element regardless of `type`, including `type="application/ld+json"`.
 * Chrome / Firefox / Safari all enforce this when the directive is set
 * without `'unsafe-inline'`. Dropping the nonce here would silently
 * strip every JSON-LD block in production. This is also why the routes
 * that render `<JsonLd />` (`/`, `/about`, `/writing/[slug]`) opt into
 * `force-dynamic` — they need access to the per-request nonce from the
 * `x-nonce` header set by `middleware.ts`.
 */
export async function JsonLd({ data }: Props) {
  const h = await headers();
  const nonce = h.get("x-nonce") ?? undefined;
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
