import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';

// Lazy-load Spline to avoid blocking initial render
const SplineLazy = React.lazy(() => import('@splinetool/react-spline'));

const GlowButton = ({ children, variant = 'primary' }) => {
  const base =
    'group relative inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60';
  const styles =
    variant === 'primary'
      ? 'bg-emerald-500/15 text-emerald-300 hover:scale-[1.02] backdrop-blur-md shadow-[0_0_20px_0_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/20'
      : 'bg-white/5 text-white hover:scale-[1.02] backdrop-blur-md ring-1 ring-white/10';

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${styles}`}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 rounded-xl bg-emerald-400/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
    </motion.button>
  );
};

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = prefersReducedMotion ? 0 : useTransform(scrollY, [0, 600], [0, -40]);
  const y2 = prefersReducedMotion ? 0 : useTransform(scrollY, [0, 600], [0, -20]);
  const opacity = prefersReducedMotion ? 1 : useTransform(scrollY, [0, 300], [1, 0.9]);

  // Defer heavy Spline mounting until idle/after first paint and desktop widths
  const [showSpline, setShowSpline] = useState(false);
  useEffect(() => {
    const enable = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      if (isDesktop) setShowSpline(true);
    };
    if ('requestIdleCallback' in window) {
      // @ts-ignore
      const id = window.requestIdleCallback(enable, { timeout: 1200 });
      return () => {
        // @ts-ignore
        window.cancelIdleCallback && window.cancelIdleCallback(id);
      };
    } else {
      const t = setTimeout(enable, 400);
      return () => clearTimeout(t);
    }
  }, []);

  const gradientId = useMemo(() => `grad-${Math.random().toString(36).slice(2)}`, []);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white">
      {/* 3D Spline background (lazy + desktop only) */}
      <div className="absolute inset-0">
        {showSpline ? (
          <Suspense fallback={<div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.08),transparent_60%)]" />}>
            <SplineLazy
              scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode"
              style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
            />
          </Suspense>
        ) : (
          // Lightweight gradient fallback on mobile or before Spline loads
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.06),transparent_60%)]" />
        )}

        {/* Soft gradient overlays for glow - tuned to be lighter */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_60%)] blur-2xl" />
          <div className="absolute -bottom-28 -right-28 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.14),transparent_60%)] blur-2xl" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-[100svh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          style={prefersReducedMotion ? undefined : { y: y1, opacity }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            <span className="text-xs font-medium tracking-wide text-emerald-200/90">Futuristic • Glass • Parallax</span>
          </div>

          <h1 className="mt-6 bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-5xl font-extrabold leading-tight text-transparent sm:text-6xl md:text-7xl">
            A sleek dark glass world
            <br className="hidden sm:block" />
            glowing with green energy
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-balance text-lg text-emerald-100/80 sm:text-xl">
            Immerse in a premium, modern interface with glass panels, neon highlights, and silky smooth scroll reveals.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <GlowButton>
              <svg width="0" height="0" className="absolute"><defs /></svg>
              {/* Rocket icon inline keeps imports minimal on low-end devices */}
              <span className="inline-flex items-center gap-2"><span className="i-lucide-rocket" /><span>Get Started</span></span>
            </GlowButton>
            <GlowButton variant="secondary">Learn More</GlowButton>
          </div>
        </motion.div>

        {/* Floating glass badges with parallax */}
        <motion.div style={prefersReducedMotion ? undefined : { y: y2 }} className="pointer-events-none absolute inset-0" >
          <div className="absolute left-8 top-24 hidden select-none rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-xl md:block" style={{ willChange: 'transform' }}>
            Ultra-smooth scroll reveal
          </div>
          <div className="absolute bottom-28 right-10 hidden select-none rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100 backdrop-blur-xl md:block" style={{ willChange: 'transform' }}>
            Parallax in motion
          </div>
        </motion.div>
      </div>

      {/* Decorative SVG grid shimmer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 opacity-60">
        <svg className="h-40 w-full" preserveAspectRatio="none" viewBox="0 0 1200 200" aria-hidden>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0.0" />
              <stop offset="35%" stopColor="#00ff88" stopOpacity="0.25" />
              <stop offset="65%" stopColor="#00c66a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00c66a" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="1200" height="200" fill={`url(#${gradientId})`} />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
