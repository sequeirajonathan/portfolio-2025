import { ArrowDown } from "lucide-react";
import type { FC } from "react";
import { motion } from "framer-motion";
import { memo } from "react";

export const HeroSection: FC = memo(() => {
  return (
    <motion.section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span> Hi, I'm</span>
            <span className="text-primary ml-2"> Jonathan</span>
            <span className="text-gradient ml-2"> Sequeira</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          >
            Lead Software Engineer specializing in React, TypeScript, and Node.js. I build secure, scalable solutions across diverse industries—passionate about clean code and practical architecture.
          </motion.p>

          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
          >
            <motion.a
              href="#projects"
              className="cosmic-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </motion.section>
  );
});