import { ImageResponse } from "next/og";
import { getPost, formatDate } from "@/lib/writing";

export const runtime = "nodejs";
export const alt = "Marwan Diallo essay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EssayOG({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Marwan Diallo";
  const date = post ? formatDate(post.updated ?? post.date) : "";
  const tags = post?.tags?.slice(0, 3) ?? [];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#fff1e5",
          fontFamily: "Georgia, serif",
          color: "#0a0a0a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 12,
              background: "#0a0a0a",
              color: "#fff1e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: -1,
            }}
          >
            MD
          </div>
          <div style={{ fontSize: 24, color: "#6b6661" }}>
            marwandiallo.com / writing
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              lineHeight: 1.1,
              letterSpacing: -1.2,
              maxWidth: 1040,
              fontWeight: 500,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {tags.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: "#33302e",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                #{t}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#6b6661",
          }}
        >
          <div>{date}</div>
          <div>Marwan Diallo</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
