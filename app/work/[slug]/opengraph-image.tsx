import { ImageResponse } from "next/og";
import { projects, getProject } from "@/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.filter((p) => !p.placeholder).map((p) => ({ slug: p.slug }));
}

export const alt = "Pixel Dev Solutions case study";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? "Case study";
  const outcome = project
    ? `${project.outcome.value} — ${project.outcome.label}`
    : "";
  const category = project?.category ?? "";

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
            "radial-gradient(120% 120% at 0% 0%, #16233c 0%, rgba(22,35,60,0) 46%), linear-gradient(135deg, #060b14 0%, #101a2e 60%, #12294b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#98a8c0",
            fontSize: 22,
          }}
        >
          <svg width="34" height="34" viewBox="0 0 48 48">
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
          <span style={{ color: "#e9edf4" }}>Pixel Dev Solutions</span>
          {category ? (
            <span
              style={{
                border: "1px solid rgba(233,237,244,0.22)",
                borderRadius: 999,
                padding: "4px 14px",
                fontSize: 19,
              }}
            >
              {category}
            </span>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#e9edf4",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "#e08063",
              fontSize: 28,
              marginTop: 20,
              maxWidth: 960,
            }}
          >
            {outcome}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
