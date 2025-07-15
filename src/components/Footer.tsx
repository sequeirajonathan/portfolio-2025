import { ArrowUp } from "lucide-react";
import type { FC } from "react";
import { motion } from "framer-motion";
import { memo } from "react";

export const Footer: FC = memo(() => {
  return (
    <motion.footer
      className="relative mt-12 pt-8 border-t border-border bg-card overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Gradient border at the top */}
      <div className="absolute top-0 left-0 w-full h-1 gradient-border" style={{background: 'linear-gradient(90deg, #7c3aed 0%, #818cf8 100%)', border: 'none', borderRadius: 0}} />
      {/* Subtle star background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div className="star animate-pulse-subtle" style={{width: '8px', height: '8px', left: '10%', top: '40%', opacity: 0.7, position: 'absolute'}} />
        <div className="star animate-pulse-subtle" style={{width: '5px', height: '5px', left: '80%', top: '60%', opacity: 0.5, position: 'absolute'}} />
        <div className="star animate-pulse-subtle" style={{width: '6px', height: '6px', left: '50%', top: '20%', opacity: 0.6, position: 'absolute'}} />
      </div>
      <motion.div
        className="container flex flex-col md:flex-row justify-center md:justify-between items-center relative z-10 py-8 px-4 pb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="flex flex-col gap-1 text-center md:text-left">
          <span className="text-lg font-bold text-glow text-primary">Vet2Dev</span>
          <span className="text-xs text-muted-foreground">Open to new opportunities &mdash; Let's build something great.</span>
          <span className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Vet2Dev. All rights reserved.</span>
        </div>
        <a
          href="#hero"
          className="cosmic-button flex items-center justify-center mt-4 md:mt-0 hidden md:flex"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </a>
      </motion.div>
      {/* Intersection Observer Anchor for Black Hole (block-level, at end of footer) */}
      <div id="footer-observer-anchor" style={{ width: '100%', height: 32, pointerEvents: 'none', zIndex: 1 }} />
    </motion.footer>
  );
});