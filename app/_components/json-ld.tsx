import { headers } from "next/headers";

interface Props {
  data: Record<string, unknown>;
}

/**
 * Server component. Emits a `<script type="application/ld+json">` tag
 * with the per-request CSP nonce so it isn't blocked by our nonce-only
 * script-src. Data is JSON-stringified once and inlined.
 */
export async function JsonLd({ data }: Props) {
  const h = await headers();
  const nonce = h.get("x-nonce") ?? undefined;
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
