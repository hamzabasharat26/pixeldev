import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="on-dark relative isolate flex min-h-[78vh] items-center overflow-hidden bg-navy-ink pt-24">
      <div
        aria-hidden="true"
        className="glow-orb -right-24 -top-16 h-80 w-80 text-amber opacity-[0.12]"
      />
      <div className="container-wide relative">
        <Eyebrow tone="light">Error 404</Eyebrow>
        <h1 className="text-h1 mt-5 max-w-xl text-d-text">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-d-muted">
          The link may be broken, or the page moved. Here&apos;s the way back.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <LinkButton href="/" size="lg">
            Back home
          </LinkButton>
          <LinkButton href="/work" size="lg" variant="ghostDark">
            See the work
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
