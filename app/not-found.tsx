import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <section className="on-dark flex min-h-[80vh] items-center">
      <div className="container-page">
        <Eyebrow tone="light">404</Eyebrow>
        <h1 className="text-h1 mt-5 max-w-xl text-grey-50">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-body-lg mt-4 max-w-md text-grey-300">
          The link may be broken, or the page may have moved. Here&apos;s a way
          back.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <LinkButton href="/" size="lg">
            Back home
          </LinkButton>
          <LinkButton href="/work" size="lg" variant="ghostDark">
            See our work
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
