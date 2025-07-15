import { Briefcase, Code, User } from "lucide-react";
import type { FC } from "react";
import { motion } from "framer-motion";
import { memo } from "react";

export const AboutSection: FC = memo(() => {
  return (
    <motion.section
      id="about"
      className="py-12 sm:py-16 md:py-24 px-4 relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold">
              Experienced Lead Software Engineer & Tech Mentor
            </h3>

            <p className="text-muted-foreground text-sm sm:text-base">
              I'm Jonathan Sequeira, a Lead Software Engineer with 7+ years of experience building secure, scalable solutions across fintech, SaaS, and government sectors. I specialize in React, TypeScript, and Node.js, and have delivered high-impact projects from e-commerce platforms to cloud-native applications. My passion lies in clean code, developer experience, and practical architecture.
            </p>

            <p className="text-muted-foreground text-sm sm:text-base">
              Skilled in full-stack development, cloud platforms (Azure, Vercel, Supabase), and secure integrations (OAuth, Okta). I enjoy mentoring teams, driving technical strategy, and continuously learning to stay ahead in the ever-evolving tech landscape.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button text-sm sm:text-base">
                {" "}
                Get In Touch
              </a>

              <a
                href="/cv.pdf"
                download
                className="px-4 sm:px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-sm sm:text-base text-center mb-4 sm:mb-0"
              >
                Download CV
              </a>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:gap-6"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div
              className="gradient-border p-4 sm:p-6 card-hover"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 rounded-full bg-primary/10 flex-shrink-0">
                  <Code className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-base sm:text-lg">Full-Stack Engineering</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Building robust web applications with React, TypeScript, Node.js, and modern frameworks. Focused on clean code, testing, and developer experience.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="gradient-border p-4 sm:p-6 card-hover"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 rounded-full bg-primary/10 flex-shrink-0">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-base sm:text-lg">Cloud & Integrations</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Deploying and scaling apps on Azure, Vercel, and Supabase. Expert in secure integrations (OAuth, Okta) and automation (CI/CD, Terraform).
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="gradient-border p-4 sm:p-6 card-hover"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 rounded-full bg-primary/10 flex-shrink-0">
                  <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-base sm:text-lg">Technical Leadership</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Mentoring developers, leading migrations, and driving best practices. Experienced in agile delivery and cross-team collaboration.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
});