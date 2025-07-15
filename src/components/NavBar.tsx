import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, memo, useCallback } from "react";
import { useThrottledScroll } from "@/hooks/use-throttled-scroll";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar: React.FC = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleScroll = useCallback((scrollY: number) => {
    setIsScrolled(scrollY > 10);
  }, []);

  useThrottledScroll(handleScroll);

  const handleEasterEgg = () => {
    navigate("/404");
  };

  return (
    <nav
      className={cn(
        "w-full z-40 transition-all duration-300",
        isScrolled ? "py-2 sm:py-3 md:py-4 bg-background/80 backdrop-blur-md shadow-xs" : "py-2 sm:py-3 md:py-4 lg:py-5"
      )}
    >
      <div className="container flex items-center justify-between px-3 sm:px-4">
        <a
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"> Vet2Dev </span>{" "}
            Portfolio
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
          {navItems.map((item: NavItem, key: number) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 text-sm lg:text-base"
            >
              {item.name}
            </a>
          ))}
          
          {/* Easter egg - eyes emoji */}
          <button
            onClick={handleEasterEgg}
            className="text-foreground/60 hover:text-primary transition-colors duration-300 text-lg cursor-pointer"
            title="Let's get lost..."
            aria-label="Easter egg - Let's get lost"
          >
            👀
          </button>
          {/* Theme toggle icon */}
          <span className="inline-flex items-center ml-2">
            <ThemeToggle />
          </span>
        </div>

        {/* mobile menu button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50 hover:bg-primary/10 rounded-full transition-colors duration-300"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
        </button>

        {/* mobile menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl w-full items-center">
            {navItems.map((item: NavItem, key: number) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            {/* Theme toggle in mobile menu */}
            <span className="inline-flex items-center mt-2">
              <ThemeToggle />
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
});