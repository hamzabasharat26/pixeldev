"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "How much does a custom vision model cost?",
    a: "Most custom models start at $15,000. This includes dataset curation, architecture selection, model training, and edge device optimization (TensorRT). Hardware costs (cameras, edge devices) are billed separately."
  },
  {
    q: "What is a typical timeline from start to deployment?",
    a: "A typical deployment takes 6 to 8 weeks. We spend the first two weeks capturing data and defining the exact constraints on your factory floor. Weeks 3-6 are spent training and iterating, and the final two weeks are on-site deployment and validation."
  },
  {
    q: "Who owns the code and the trained models?",
    a: "You do. We operate as an extension of your team. Upon final payment, all intellectual property, source code, and trained weights belong entirely to your company."
  },
  {
    q: "What happens after the system is launched?",
    a: "We offer a standard 30-day warranty period for bug fixes and minor adjustments. Beyond that, we offer monthly SLA retainers to actively monitor the model for drift, handle hardware maintenance, and retrain the model if your production line changes."
  },
  {
    q: "Can you work with our existing engineering team?",
    a: "Absolutely. We frequently integrate with internal automation and IT teams. We'll work directly with your PLC programmers to ensure our vision models output the exact signals your existing infrastructure expects."
  },
  {
    q: "How do you handle changes in scope mid-project?",
    a: "Because we work on fixed-price contracts, we define the scope rigorously upfront. If you realize you need a major new feature mid-project, we will scope it as a separate Phase 2 engagement rather than derailing the current deployment."
  },
  {
    q: "How do we collaborate across different timezones?",
    a: "We are based in Pakistan, which means our workday perfectly overlaps with the entire European business day, and we have dedicated hours that overlap with US mornings. We rely heavily on asynchronous communication (Linear, Slack) but are always available for urgent synchronous calls."
  }
];

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-line">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-6 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 rounded"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg pr-8">{faq.q}</h3>
        <div className="w-6 h-6 flex items-center justify-center shrink-0">
          <div className="relative w-4 h-4">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-ink -translate-y-1/2" />
            <motion.div 
              animate={{ rotate: isOpen ? 0 : 90 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-1/2 w-[2px] h-full bg-ink -translate-x-1/2" 
            />
          </div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 max-w-content text-ink/80">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-24">
      <div className="max-w-layout">
        <Reveal>
          <h2 className="mb-12">Common questions</h2>
        </Reveal>
        
        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <FAQItem faq={faq} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
