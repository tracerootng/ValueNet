import { motion } from "motion/react";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentView: 'home' | 'gallery';
  onViewChange: (view: 'home' | 'gallery') => void;
}

export default function Header({ isDarkMode, toggleTheme, currentView, onViewChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Leadership", href: "#leadership" },
    { name: "AI Assistant", href: "#ai-assistant" },
    { name: "Contact", href: "#contact" },
    { name: "Gallery", href: "#gallery" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { name: string; href: string }) => {
    if (link.name === "Gallery") {
      e.preventDefault();
      onViewChange("gallery");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (currentView === "gallery") {
        e.preventDefault();
        onViewChange("home");
        // Wait for home layout to mount before scrolling
        setTimeout(() => {
          const element = document.querySelector(link.href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 120);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <nav className="max-w-7xl mx-auto glass-card flex items-center justify-between relative h-16 md:h-20 overflow-visible">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center px-6 sm:px-10"
        >
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onViewChange("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center"
          >
            <img 
              src="https://i.ibb.co/mV64gprc/valuenetlogo.png" 
              alt="VALUENET Logo" 
              className="h-24 sm:h-32 md:h-40 w-auto object-contain transition-all translate-y-1" 
              referrerPolicy="no-referrer"
            />
          </a>
        </motion.div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <a 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link)}
                className={`transition-colors text-sm font-medium tracking-wide ${
                  link.name === "Gallery" && currentView === "gallery"
                    ? "text-gold font-bold"
                    : isDarkMode ? 'text-silver hover:text-gold' : 'text-slate-600 hover:text-gold'
                }`}
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center gap-4 px-6 sm:px-10">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-white/5 text-gold hover:bg-white/10' : 'bg-slate-100 text-navy hover:bg-slate-200'}`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-gold"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 glass-card p-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={`py-2 border-b border-white/5 ${
                link.name === "Gallery" && currentView === "gallery"
                  ? "text-gold font-bold"
                  : isDarkMode ? 'text-silver hover:text-gold' : 'text-slate-600 hover:text-gold'
              }`}
              onClick={(e) => {
                setIsOpen(false);
                handleLinkClick(e, link);
              }}
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}
