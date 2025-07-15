import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";
import mavCollectiblesImg from "../assets/mav_collectibles.png";
import mavPrintImg from "../assets/mav-print.png";
import vsmobileDetailingImg from "../assets/vsmobiledetailing.svg";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "MAV Collectibles",
    description:
      "Premier TCG destination with curated inventory, expert staff, and a vibrant collector community. Features inventory, cart, admin, and more.",
    image: mavCollectiblesImg,
    tags: ["Next.js", "TypeScript", "Supabase", "E-commerce"],
    demoUrl: "https://mav-collectibles-git-dev-jonathan-sequeiras-projects.vercel.app/",
    githubUrl: "https://github.com/sequeirajonathan/mav-collectibles",
  },
  {
    id: 2,
    title: "MAV Print Agent",
    description:
      "Electron app for auto-printing shipping labels from the cloud. Supports multiple printers, secure agent ID, and real-time job status.",
    image: mavPrintImg,
    tags: ["Electron", "TypeScript", "Node.js", "Desktop"],
    demoUrl: "https://github.com/sequeirajonathan/mav-print/releases/tag/v1.0.0",
    githubUrl: "https://github.com/sequeirajonathan/mav-print",
  },
  {
    id: 3,
    title: "V's Mobile Detailing",
    description:
      "Mobile detailing service that brings the shine to you. Enjoy expert care for your vehicle at home or work—convenient and professional.",
    image: vsmobileDetailingImg,
    tags: ["Square_Pay", "TypeScript", "Next.js", "Clerk"],
    demoUrl: "https://vsmobiledetailing.vercel.app/",
    githubUrl: "https://github.com/sequeirajonathan/vsmobiledetailing",
  },
];

export const ProjectsSection: React.FC = memo(() => {
  return (
    <motion.section
      id="projects"
      className="py-12 sm:py-16 md:py-24 px-4 relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover flex flex-col h-full"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="h-40 sm:h-48 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full max-h-28 sm:max-h-36 object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col flex-1 justify-between p-4 sm:p-6">
                <div>
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-3 sm:mb-4 min-h-[40px] sm:min-h-[48px]">
                    {project.tags.map((tag) => (
                      <span key={tag} className="min-w-[70px] sm:min-w-[80px] text-center px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 text-center">{project.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-4 line-clamp-4 text-center">
                    {project.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={18} className="sm:w-5 sm:h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8 sm:mt-12">
          <motion.a
            className="cosmic-button w-fit flex items-center mx-auto gap-2 text-sm sm:text-base"
            target="_blank"
            href="https://github.com/sequeirajonathan"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Check My Github <ArrowRight size={14} className="sm:w-4 sm:h-4" />
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
});