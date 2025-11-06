import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative w-full bg-black pb-16 pt-20 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-between gap-6 sm:flex-row"
        >
          <div className="text-center sm:text-left">
            <p className="text-sm text-emerald-100/70">© {new Date().getFullYear()} NeonGlass. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-emerald-100/70">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span className="text-emerald-500/40">•</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
