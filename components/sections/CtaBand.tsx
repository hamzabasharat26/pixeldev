import { site } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";

type CtaBandProps = {
  heading?: string;
  sub?: string;
};

export function CtaBand({
  heading = "Have a project worth building?",
  sub = "Tell us what you're trying to ship. We'll come back within 24 hours with honest feedback on scope, timeline, and cost — whether or not we're the right fit.",
}: CtaBandProps) {
  return (
    <section className="on-dark relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 120% at 100% 0%, rgba(233,161,60,0.20) 0%, rgba(233,161,60,0) 55%)",
        }}
      />
      <div className="container-page section-y">
        <h2 className="text-h2 max-w-2xl text-grey-50">{heading}</h2>
        <p className="text-body-lg mt-5 max-w-xl text-grey-300">{sub}</p>

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <LinkButton href="/contact" size="lg">
            Start a Project
          </LinkButton>
          <p className="text-sm text-grey-400">
            Or email us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-grey-200 underline decoration-amber/60 underline-offset-4 hover:text-white"
            >
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
