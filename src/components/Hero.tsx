import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Play, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroProps {
  isDarkMode: boolean;
}

const images = [
  "https://i.ibb.co/1V0BDsQ/hero2.png",
  "https://i.ibb.co/4Rx1Nns0/hero.png"
];

export default function Hero({ isDarkMode }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className={`absolute inset-0 z-10 ${isDarkMode ? 'bg-navy/60' : 'bg-slate-50/40'} transition-colors duration-1000`} />
            <img 
              src={images[currentSlide]} 
              alt="Background Slide" 
              className={`w-full h-full object-cover ${isDarkMode ? 'opacity-60 grayscale' : 'opacity-70'}`}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Decorative Gradients */}
        <div className={`absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-1000 ${isDarkMode ? 'bg-gold/10' : 'bg-gold/30'}`} />
        <div className={`absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full blur-[100px] transition-colors duration-1000 ${isDarkMode ? 'bg-navy-light/10' : 'bg-blue-200/50'}`} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full text-center mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className={`text-4xl sm:text-6xl md:text-8xl font-black leading-[1.05] mb-8 tracking-tighter ${isDarkMode ? 'text-white' : 'text-navy drop-shadow-sm'}`}>
            Precision in <span className="text-gradient-gold">Audit.</span><br />
            Excellence in <span className="text-gradient-gold">Strategy.</span>
          </h1>

          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium ${isDarkMode ? 'text-silver/80 font-light' : 'text-navy/80'}`}>
            Elevating global financial standards through consistent, value-driven Assurance, Tax, and Strategic Advisory. Based in Africa, serving the future of global finance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 items-center mb-16 md:mb-24">
            <button className="btn-primary group relative overflow-hidden px-8 sm:px-12 py-4 sm:py-5 w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-4">
                Begin Partnership <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <button className={`flex items-center gap-4 text-xs font-black uppercase tracking-widest group ${isDarkMode ? 'text-white' : 'text-navy'}`}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold transition-all">
                <Play size={14} className="group-hover:text-navy fill-current transition-colors" />
              </div>
              Watch The Story
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === i ? 'w-12 bg-gold' : 'w-3 bg-white/20'}`}
          />
        ))}
      </div>
    </section>
  );
}
