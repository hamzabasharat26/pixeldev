import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-grey-50 pt-24">
      <div className="container-page">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="text-h1 mt-5 max-w-xl text-navy">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-body-lg mt-4 max-w-md text-grey-700">
          The link may be broken, or the page may have moved. Here&apos;s a way
          back.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <LinkButton href="/" size="lg">
            Back home
          </LinkButton>
          <LinkButton href="/work" size="lg" variant="ghostLight">
            See our work
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
