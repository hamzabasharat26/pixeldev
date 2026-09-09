import { site } from "@/content/site";
import Reveal from "@/components/Reveal";
import ContactBlock from "@/components/ContactBlock";

export const metadata = {
  title: "About Us",
  description: "A two-person computer vision studio based in Pakistan.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-layout mb-24">
        <Reveal>
          <h1 className="mb-4">About the studio</h1>
          <p className="text-lg text-ink/80 max-w-content">
            We are a deliberately small team of two engineers based in {site.location}. 
            We take on a limited number of projects at a time so we can personally write every line of code.
          </p>
        </Reveal>
      </div>

      <section className="max-w-layout border-t border-line py-24">
        <Reveal>
          <div className="mb-12">
            <span className="mono-tag text-signal mb-2 block">THE_TEAM</span>
            <h2>Founders</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            {site.founders.map((founder, i) => (
              <div key={i} className="group">
                <div className="aspect-[4/5] bg-ink rounded mb-6 overflow-hidden border border-line shadow-sm">
                  <img 
                    src={founder.photo} 
                    alt={founder.name} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
                <h3 className="text-2xl mb-1">{founder.name}</h3>
                <p className="mono-tag text-muted mb-4">{founder.role}</p>
                <p className="text-ink/80">{founder.bio}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-ink text-paper py-24">
        <div className="max-w-layout">
          <Reveal>
            <div className="mb-16">
              <span className="mono-tag text-signal mb-2 block">PROCESS_RULES</span>
              <h2 className="text-white">How we work</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              <div>
                <h3 className="text-white mb-3">Fixed scope and price</h3>
                <p className="text-paper/70 leading-relaxed max-w-content">
                  We don&apos;t bill by the hour. We agree on exactly what the system needs to do, we price the project based on the value it delivers, and we stick to that number. {site.priceLine}
                </p>
              </div>
              <div>
                <h3 className="text-white mb-3">Weekly demos</h3>
                <p className="text-paper/70 leading-relaxed max-w-content">
                  You won&apos;t wait weeks to see what we&apos;ve been building. We jump on a call every week to show you the latest model running on your actual test footage, warts and all.
                </p>
              </div>
              <div>
                <h3 className="text-white mb-3">You own everything</h3>
                <p className="text-paper/70 leading-relaxed max-w-content">
                  When the project is done, the codebase, the trained weights, and the training scripts belong to you. We document it thoroughly so your internal team can take over at any point.
                </p>
              </div>
              <div>
                <h3 className="text-white mb-3">We stay on</h3>
                <p className="text-paper/70 leading-relaxed max-w-content">
                  Deployment is just the start. We offer maintenance retainers to monitor the models in production, fix edge cases as they arise, and retrain the system on new data.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-layout py-24 border-b border-line">
        <Reveal>
          <div className="mb-8">
            <span className="mono-tag text-signal mb-2 block">LOGISTICS</span>
            <h2>Working together</h2>
          </div>
          <div className="max-w-content text-lg text-ink/80 space-y-6">
            <p>
              While we are located in {site.location}, our working hours are <strong>{site.hours}</strong>.
              This means we are online for your entire working day if you are in Europe, and we overlap with your morning if you are on the US East Coast.
            </p>
            <p>
              Communication happens primarily via Slack and weekly video calls. If the project requires it, we are available to travel for on-site hardware installation and testing.
            </p>
          </div>
        </Reveal>
      </section>

      <ContactBlock />
    </div>
  );
}
