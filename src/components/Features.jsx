import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Layers } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Glassmorphism',
    desc: 'Frosted panels with subtle depth, highlights, and reflections.'
  },
  {
    icon: Zap,
    title: 'Neon Energy',
    desc: 'Vivid green gradients (#00ff88 → #00c66a) pulsing with life.'
  },
  {
    icon: Layers,
    title: 'Parallax Motion',
    desc: 'Layered shapes glide as you scroll for a premium 3D feel.'
  }
];

const FeatureCard = ({ Icon, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: 'easeOut', delay }}
    className="group relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-white/5 p-6 text-left text-white/80 backdrop-blur-xl"
  >
    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.15),transparent_60%)] blur-2xl transition-opacity group-hover:opacity-80" />
    <Icon className="mb-4 h-6 w-6 text-emerald-300" />
    <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
    <p className="text-sm text-emerald-100/80">{desc}</p>
  </motion.div>
);

const Features = () => {
  return (
    <section className="relative w-full bg-black py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2),transparent_60%)] blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center text-3xl font-bold text-white sm:text-4xl"
        >
          Designed for immersive impact
        </motion.h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} Icon={f.icon} title={f.title} desc={f.desc} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
