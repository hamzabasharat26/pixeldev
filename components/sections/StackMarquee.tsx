import { stackRows } from "@/content/stack";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";

function Word({ label }: { label: string }) {
  return (
    <span className="text-data whitespace-nowrap text-lg text-grey-500">
      {label}
    </span>
  );
}

export function StackMarquee() {
  return (
    <section className="section-y bg-grey-50">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our toolkit"
          title="The stack we build and maintain on."
        />
      </div>

      <div className="mt-12 flex flex-col gap-6">
        <Marquee direction="left" durationSeconds={40} aria-label="Technologies, row one">
          {stackRows[0].map((t) => (
            <Word key={t} label={t} />
          ))}
        </Marquee>
        <Marquee direction="right" durationSeconds={46} aria-label="Technologies, row two">
          {stackRows[1].map((t) => (
            <Word key={t} label={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
