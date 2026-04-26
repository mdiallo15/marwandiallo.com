import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Marwan Diallo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background: "#faf8f3",
        fontFamily: "Georgia, serif",
        color: "#1a1a1a",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 14,
            background: "#1a1a1a",
            color: "#faf8f3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: -1,
          }}
        >
          MD
        </div>
        <div style={{ fontSize: 28, color: "#6b6b6b" }}>marwandiallo.com</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 78, lineHeight: 1.05, letterSpacing: -1.5 }}>
          Marwan Diallo
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#4a4a4a",
            lineHeight: 1.35,
            maxWidth: 900,
          }}
        >
          Security architect by trade, builder by habit. Notes from the seam
          between AI tooling and identity.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: "#6b6b6b",
        }}
      >
        <div>Raleigh, NC · Conakry, GN</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: "#9a3a1f",
            }}
          />
          <div>writing / building / reading</div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
