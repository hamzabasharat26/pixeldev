import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Pixel Dev Solutions — web, mobile and AI software development studio.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0a1223 0%, #12294b 60%, #16335f 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <svg width="56" height="56" viewBox="0 0 48 48">
            <path
              d="M13 12 L30 24 L13 36"
              fill="none"
              stroke="#ffffff"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="31" y="19" width="10" height="10" rx="2.5" fill="#e9a13c" />
          </svg>
          <span style={{ color: "#f9fafb", fontSize: 34, fontWeight: 700 }}>
            Pixel<span style={{ color: "#e9a13c" }}>Dev</span>
            <span style={{ color: "#f9fafb" }}>&nbsp;Solutions</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ width: 96, height: 6, background: "#e9a13c", marginBottom: 28 }}
          />
          <div
            style={{
              color: "#ffffff",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            We build software that ships — and scales.
          </div>
          <div style={{ color: "#9ca3af", fontSize: 28, marginTop: 24 }}>
            {site.positioning}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
