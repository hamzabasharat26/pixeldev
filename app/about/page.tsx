import type { Metadata } from "next";
import Image from "next/image";
import { Eye, Handshake, Layers, Rocket, type LucideIcon } from "lucide-react";
import { aboutStory, values } from "@/content/values";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { WorkReel } from "@/components/sections/WorkReel";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { StatsBar } from "@/components/sections/StatsBar";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "A small senior team building computer vision and AI systems, plus the full stack to ship them. Design, code, infrastructure and launch under one roof.",
  path: "/about",
});

/** Each value gets a mark that says what it means, not a decorative number. */
const VALUE_ICONS: Record<(typeof values)[number]["title"], LucideIcon> = {
  "Ship, don't stall.": Rocket,
  "Own the whole stack.": Layers,
  "Say the honest thing.": Eye,
  "Built to be handed over.": Handshake,
};

/** Real frames only. Each tile links nowhere on purpose: it's texture, the
 *  reel further down is where you click through. */
const MOSAIC = [
  { src: "/work/safe-rail/cover-800.webp", label: "Safe Rail" },
  { src: "/work/rallylens/cover-800.webp", label: "RallyLens" },
  { src: "/work/magicqc/cover-800.webp", label: "MagicQC" },
  { src: "/work/nexus-rag-assistant/cover-800.webp", label: "Nexus" },
];

export default function AboutPage() {
  const reel = projects.filter((p) => !p.placeholder).slice(0, 8);

  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className="relative isolate overflow-hidden bg-paper pb-20 pt-32 md:pt-40">
        <div
          aria-hidden="true"
          className="glow-orb -right-24 -top-24 -z-10 h-[28rem] w-[28rem] text-amber opacity-[0.14]"
        />
        <div className="container-wide grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h1 className="text-h1 mt-5 max-w-[16ch] text-ink">
              A small senior team that ships.
            </h1>
            <p className="text-body-lg mt-5 max-w-xl text-muted">
              Pixel Dev Solutions is for people who need serious engineering
              without agency overhead. We build computer vision and AI systems,
              then the web, mobile and cloud work that puts them in front of
              the people who use them.
            </p>
            <p className="mt-6 flex items-center gap-2.5 font-medium text-amber-700">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-amber" />
              {site.promise}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/contact" size="lg">
                Start a project
              </LinkButton>
              <LinkButton href="/portfolio" size="lg" variant="ghostLight">
                View the portfolio
              </LinkButton>
            </div>
          </Reveal>

          <div aria-hidden="true" className="grid grid-cols-2 gap-4">
            {MOSAIC.map((tile, i) => (
              <div
                key={tile.src}
                className={
                  "det-frame relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-navy-900 shadow-e2 " +
                  (i % 2 === 1 ? "translate-y-10" : "")
                }
              >
                <span className="showcase-img absolute inset-[-6%]">
                  <Image src={tile.src} alt="" fill unoptimized sizes="320px" className="object-cover" />
                </span>
                <span className="absolute bottom-2.5 left-2.5 rounded-full bg-navy-ink/75 px-2.5 py-1 text-[0.7rem] font-medium text-d-text backdrop-blur-sm">
                  {tile.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- story */}
      <section className="section--band section">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <Reveal>
            <Eyebrow as="h2">Our story</Eyebrow>
            <div className="mt-6 max-w-[62ch] space-y-5 text-[1.08rem] leading-relaxed text-ink">
              {aboutStory.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <figure className="relative overflow-hidden rounded-[var(--radius-panel)] border border-line bg-navy-900 shadow-e3">
              <span className="det-frame relative block aspect-[4/3] overflow-hidden">
                <span className="showcase-img absolute inset-[-5%]">
                  <Image
                    src="/work/dock-vision-ai/cover.webp"
                    alt="Dock Vision AI detecting a truck and a forklift on a live loading bay"
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                  />
                </span>
              </span>
              <figcaption className="border-t border-d-line px-5 py-4 text-sm text-d-muted">
                <span className="font-medium text-d-text">Dock Vision AI.</span>{" "}
                First place at an IEEE Hackathon, then into production on a
                real loading bay.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- values */}
      <section className="section bg-paper">
        <div className="container-wide">
          <Eyebrow as="h2">What we hold to</Eyebrow>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = VALUE_ICONS[value.title];
              return (
                <Reveal key={value.title} className="h-full">
                  <TiltCard className="h-full">
                    <div className="glass-paper h-full rounded-[var(--radius-card)] p-6 shadow-e1">
                      <span className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-amber/30 bg-amber/10 text-amber-700">
                        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <h3 className="text-h4 relative z-10 mt-5 text-ink">{value.title}</h3>
                      <p className="relative z-10 mt-3 text-[0.95rem] leading-relaxed text-muted">
                        {value.body}
                      </p>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <WorkReel projects={reel} />

      {/* No team section until there are real photos and names. */}

      <ProcessSteps />
      <StatsBar />
      <CtaBand />
    </>
  );
}
