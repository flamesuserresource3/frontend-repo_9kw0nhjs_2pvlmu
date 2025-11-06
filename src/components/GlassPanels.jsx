import React from 'react';
import { motion } from 'framer-motion';

const Panel = ({ title, content, delay }) => (
  <motion.div
    initial={{ y: 40, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, ease: 'easeOut', delay }}
    className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-white/80 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_40px_-15px_rgba(20,184,166,0.35)]"
  >
    <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,198,106,0.18),transparent_60%)] blur-3xl" />
    <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
    <p className="text-emerald-100/80">{content}</p>
  </motion.div>
);

const GlassPanels = () => {
  return (
    <section className="relative w-full bg-black py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-10 right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.14),transparent_60%)] blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Panel
            title="Precision aesthetics"
            content="Balanced spacing, refined typography, and tasteful glow for a premium look."
            delay={0.05}
          />
          <Panel
            title="Ambient depth"
            content="Layered parallax and soft blur build a sense of dimension and calm."
            delay={0.15}
          />
          <Panel
            title="Responsive flow"
            content="Fluid layout adapts beautifully from mobile to ultra-wide displays."
            delay={0.25}
          />
          <Panel
            title="Effortless motion"
            content="Apple-style reveals and hover micro-interactions enrich exploration."
            delay={0.35}
          />
        </div>
      </div>
    </section>
  );
};

export default GlassPanels;
