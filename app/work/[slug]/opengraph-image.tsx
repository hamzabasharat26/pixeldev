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
            "radial-gradient(120% 120% at 0% 0%, #16335f 0%, rgba(22,51,95,0) 44%), linear-gradient(135deg, #070e1c 0%, #0e2044 60%, #12294b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#9db0d0",
            fontSize: 22,
          }}
        >
          <svg width="34" height="34" viewBox="0 0 48 48">
            <path
              d="M13 12 L30 24 L13 36"
              fill="none"
              stroke="#f5f3ec"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="31" y="19" width="10" height="10" rx="2.5" fill="#e9a13c" />
          </svg>
          <span>Pixel Dev Solutions</span>
          {category ? <span>· {category}</span> : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#f5f3ec",
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
              color: "#e9a13c",
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
