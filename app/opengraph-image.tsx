import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Pixel Dev Solutions — AI & computer-vision studio, with the full-stack team to ship it.";

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
            "radial-gradient(120% 120% at 100% 100%, #6d2f1f 0%, rgba(109,47,31,0) 44%), linear-gradient(135deg, #060b14 0%, #101a2e 55%, #12294b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="52" height="52" viewBox="0 0 48 48">
            <path
              d="M13 12 L30 24 L13 36"
              fill="none"
              stroke="#e9edf4"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="31" y="19" width="10" height="10" rx="2.5" fill="#c2553a" />
          </svg>
          <span style={{ color: "#e9edf4", fontSize: 32, fontWeight: 700 }}>
            Pixel<span style={{ color: "#e08063" }}>Dev</span>
            <span style={{ color: "#98a8c0", fontWeight: 500 }}>
              &nbsp;&nbsp;Solutions
            </span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 88,
              height: 5,
              background: "#c2553a",
              marginBottom: 26,
            }}
          />
          <div
            style={{
              color: "#e9edf4",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 940,
            }}
          >
            Production AI, not proof of concept.
          </div>
          <div
            style={{
              color: "#98a8c0",
              fontSize: 27,
              marginTop: 22,
              maxWidth: 900,
            }}
          >
            {site.positioning}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
