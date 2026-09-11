import Image from "next/image";
import {
  BadgeCheck,
  Cpu,
  Crosshair,
  FileText,
  MessageSquareText,
  ScanEye,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroDetect } from "./HeroDetect";
import { HeroMedia } from "./HeroMedia";
import { HeroPanel } from "./HeroPanel";
import { HeroReveal } from "./HeroReveal";

/** What we build, scannable at a glance. Each is a capability with a shipped project behind it. */
const CAPABILITIES: { label: string; Icon: LucideIcon }[] = [
  { label: "Object detection", Icon: ScanEye },
  { label: "Tracking", Icon: Crosshair },
  { label: "Quality control", Icon: BadgeCheck },
  { label: "OCR", Icon: FileText },
  { label: "RAG assistants", Icon: MessageSquareText },
  { label: "Edge deployment", Icon: Cpu },
];

const ROBOT_MASK = "linear-gradient(to top, transparent 0%, #000 16%, #000 100%)";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      <HeroMedia />

      <HeroReveal className="container-wide relative pt-32 pb-14 md:pt-40 md:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div>
            <p
              data-hero-step
              className="flex items-center gap-2.5 text-[0.92rem] font-medium text-amber-600"
            >
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-amber"
              />
              {site.tagline}
            </p>

            <h1
              data-hero-step
              data-hero-headline
              className="headline mt-5 max-w-[13ch] text-ink"
            >
              Production AI, not proof of concept.
            </h1>

            <p
              data-hero-step
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
            >
              {site.positioning} We build the vision and AI systems, then the
              web, mobile and cloud work that puts them in front of the people
              who use them.
            </p>

            <ul
              data-hero-step
              aria-label="What we build"
              className="mt-6 flex max-w-xl flex-wrap gap-2"
            >
              {CAPABILITIES.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-[0.8rem] font-medium text-muted backdrop-blur-sm"
                >
                  <Icon size={14} strokeWidth={2} aria-hidden="true" className="text-amber-600" />
                  {label}
                </li>
              ))}
            </ul>

            <div data-hero-step className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <LinkButton href="/contact" size="lg">
                  Start a project
                </LinkButton>
              </Magnetic>
              <Magnetic>
                <LinkButton href="/portfolio" size="lg" variant="ghostLight">
                  View portfolio
                </LinkButton>
              </Magnetic>
            </div>
          </div>

          {/* The robot carries the brand, the detection overlay says what the
              studio does, and the glass panel carries the proof. */}
          <div
            data-hero-visual
            className="relative mx-auto w-full max-w-[560px] lg:mx-0"
          >
            {/* The stage is exactly the image's aspect ratio and is never
                height-capped, so percentages inside it map onto the robot
                itself. A capped box would letterbox the image and the
                detection brackets would miss their targets. */}
            <div
              data-hero-stage
              className="relative mx-auto aspect-[1086/1448] w-full max-w-[25.5rem] lg:mr-6 lg:ml-auto"
            >
              {/* The cut-out ends mid-torso, so it has to dissolve rather than
                  stop. The mask is on the image only, not the overlay. */}
              <div
                className="absolute inset-0"
                style={{ maskImage: ROBOT_MASK, WebkitMaskImage: ROBOT_MASK }}
              >
                <Image
                  /* `unoptimized` + `priority`, on purpose. Measured: routed
                     through the image optimiser, the robot became the LCP
                     element and painted at 3.7s, because the optimiser encodes
                     on first request. Served as the pre-sized file and
                     preloaded, it paints with the page. 900px is right for a
                     408px slot on a retina screen. */
                  src="/services/hero-robot-900.webp"
                  alt=""
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 408px, 90vw"
                  className="object-contain object-bottom"
                />
              </div>
              <HeroDetect />
            </div>

            <div
              data-hero-panel
              className="absolute -bottom-4 left-0 w-[min(23rem,92%)] lg:-left-10"
            >
              <HeroPanel />
            </div>
          </div>
        </div>

        <dl
          data-hero-step
          className="glass-paper mt-16 grid grid-cols-2 overflow-hidden rounded-2xl shadow-e1 sm:grid-cols-4 md:mt-20"
        >
          {site.stats.map((s, i) => (
            <div
              key={s.label}
              className={
                "relative z-10 flex flex-col gap-1.5 px-5 py-5 " +
                (i > 0 ? "border-line sm:border-l " : "") +
                (i === 1 ? "border-l border-line " : "") +
                (i > 1 ? "border-t border-line sm:border-t-0" : "")
              }
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-data text-2xl font-semibold text-ink md:text-[1.75rem]">
                <Counter value={s.value} />
              </dd>
              <dd className="text-[0.78rem] leading-snug text-faint">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </HeroReveal>
    </section>
  );
}
