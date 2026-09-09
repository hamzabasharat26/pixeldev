import { site } from "@/content/site";
import Link from "next/link";
import Reveal from "./Reveal";

export default function ContactBlock() {
  return (
    <section className="py-24 border-t border-line">
      <div className="max-w-layout">
        <Reveal>
          <h2 className="mb-4">Ready to measure what matters?</h2>
          <p className="text-lg text-ink/80 max-w-content mb-8">
            Tell us about your production line, the defects you need to catch, or the metrics you want to track.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            <Link 
              href={site.calLink}
              target="_blank"
              className="bg-signal text-white px-6 py-3 rounded hover:bg-signal/90 transition-colors font-semibold"
            >
              Book a call
            </Link>
            <Link 
              href={site.whatsapp}
              target="_blank"
              className="bg-line/30 text-ink px-6 py-3 rounded hover:bg-line/50 transition-colors font-semibold"
            >
              WhatsApp
            </Link>
            <a 
              href={`mailto:${site.email}`}
              className="text-ink hover:text-signal transition-colors font-semibold ml-2 underline underline-offset-4"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
