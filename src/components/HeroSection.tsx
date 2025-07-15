import { ArrowDown } from "lucide-react";
import type { FC } from "react";
import { motion } from "framer-motion";
import { memo } from "react";
import mePng from "../assets/me.png";

export const HeroSection: FC = memo(() => {
  return (
    <motion.section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          <div className="mb-2">
            <img
              src={mePng}
              alt="Jonathan Sequeira Avatar"
              className="w-32 h-32 sm:w-44 sm:h-44 rounded-full object-cover object-top border-4 border-primary shadow-lg mx-auto"
              style={{ background: '#1a2236' }}
            />
          </div>
          <motion.h1
            className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span> Hi, I'm</span>
            <span className="text-primary ml-2"> Jonathan</span>
            <span className="text-gradient ml-2"> Sequeira</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          >
            Lead Software Engineer specializing in React, TypeScript, and Node.js. I build secure, scalable solutions across diverse industries—passionate about clean code and practical architecture.
          </motion.p>

          <motion.div
            className="pt-4 sm:pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
          >
            <motion.a
              href="#projects"
              className="cosmic-button text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-xs sm:text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      </div>
    </motion.section>
  );
});