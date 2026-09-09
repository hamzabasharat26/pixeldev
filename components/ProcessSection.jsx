import Reveal from "./Reveal";

const steps = [
  {
    num: "01",
    title: "Scope",
    desc: "We define exactly what the model needs to detect and under what conditions. No vague promises, just measurable precision targets before a single line of code is written."
  },
  {
    num: "02",
    title: "Plan",
    desc: "We map the hardware constraints, network availability, and factory floor realities. The architecture is designed for the actual deployment environment, not a clean lab."
  },
  {
    num: "03",
    title: "Build",
    desc: "Weekly demos on your test footage. You see the progress, the edge cases, and the failure modes as we solve them. No black box development."
  },
  {
    num: "04",
    title: "Hand over",
    desc: "You own the IP, the training pipeline, and the deployment scripts. We document everything and stay on for support. You are never locked into our studio."
  }
];

export default function ProcessSection() {
  return (
    <section className="bg-ink text-paper py-24">
      <div className="max-w-layout">
        <Reveal>
          <h2 className="mb-12">How we build</h2>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <Reveal key={step.num} delay={idx * 0.1}>
              <div className="border-t border-line/20 pt-6">
                <div className="mono-tag text-signal mb-4">STEP_{step.num}</div>
                <h3 className="text-white mb-3">{step.title}</h3>
                <p className="text-paper/70 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
