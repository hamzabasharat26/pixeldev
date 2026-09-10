import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#12294b",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 48 48">
          <path
            d="M13 12 L30 24 L13 36"
            fill="none"
            stroke="#ffffff"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="31" y="19" width="10" height="10" rx="2.5" fill="#c2553a" />
        </svg>
      </div>
    ),
    size,
  );
}
