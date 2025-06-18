import { useState, useMemo, memo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Skill and category types
interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Proficient" | "Intermediate";
  category: SkillCategory;
}

type SkillCategory = "all" | "frontend" | "backend" | "cloud" | "testing" | "tools";

const skills: Skill[] = [
  // Frontend
  { name: "React", level: "Expert", category: "frontend" },
  { name: "TypeScript", level: "Advanced", category: "frontend" },
  { name: "JavaScript", level: "Expert", category: "frontend" },
  { name: "Redux", level: "Proficient", category: "frontend" },
  { name: "Tailwind CSS", level: "Proficient", category: "frontend" },

  // Backend
  { name: "Node.js", level: "Advanced", category: "backend" },
  { name: "Express", level: "Proficient", category: "backend" },
  { name: "C# .NET", level: "Intermediate", category: "backend" },
  { name: "Java", level: "Intermediate", category: "backend" },
  { name: "SQL", level: "Proficient", category: "backend" },

  // Cloud
  { name: "Azure DevOps", level: "Proficient", category: "cloud" },
  { name: "Vercel", level: "Proficient", category: "cloud" },
  { name: "Supabase", level: "Intermediate", category: "cloud" },
  { name: "Docker", level: "Intermediate", category: "cloud" },

  // Testing
  { name: "Jest", level: "Proficient", category: "testing" },
  { name: "Cypress", level: "Proficient", category: "testing" },

  // Tools
  { name: "Git/GitHub", level: "Expert", category: "tools" },
  { name: "VS Code", level: "Expert", category: "tools" },
];

const categories: SkillCategory[] = ["all", "frontend", "backend", "cloud", "testing", "tools"];

export const SkillsSection: React.FC = memo(() => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");

  // Memoize filtered skills to prevent recalculation
  const filteredSkills = useMemo(() => {
    return skills.filter(
      (skill) => activeCategory === "all" || skill.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <motion.section
      id="skills"
      className="py-24 px-4 relative bg-secondary/30"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="text-left mb-2">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={cn(
                    "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                    skill.level === "Expert"
                      ? "bg-primary text-primary-foreground"
                      : skill.level === "Advanced"
                      ? "bg-green-600 text-white"
                      : skill.level === "Proficient"
                      ? "bg-blue-600 text-white"
                      : skill.level === "Intermediate"
                      ? "bg-sky-600 text-white"
                      : "bg-muted text-foreground"
                  )}
                >
                  {skill.level}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
});