import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Briefcase, 
  Award, 
  Users, 
  Compass, 
  MapPin, 
  Calendar, 
  ArrowLeft,
  Maximize2
} from "lucide-react";

interface GalleryProps {
  isDarkMode: boolean;
  onBackToHome: () => void;
}

interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "workspace" | "summits" | "achievements" | "culture" | "community";
  categoryLabel: string;
  image: string;
  date: string;
  location: string;
  description: string;
  size: "normal" | "tall" | "wide"; // For the bento grid representation
}

export default function Gallery({ isDarkMode, onBackToHome }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const categories = [
    { id: "all", label: "All Assets", icon: <Layers size={14} /> },
    { id: "workspace", label: "Executive Hubs", icon: <Briefcase size={14} /> },
    { id: "summits", label: "Strategic Circles", icon: <Users size={14} /> },
    { id: "achievements", label: "Milestones", icon: <Award size={14} /> },
    { id: "culture", label: "VNP Culture", icon: <Compass size={14} /> },
    { id: "community", label: "CSR & Engagement", icon: <Compass size={14} /> },
  ];

  const galleryItems: GalleryItem[] = [];

  // Filter items
  const filteredItems = galleryItems.filter(
    item => activeCategory === "all" || item.category === activeCategory
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const prevIndex = lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIndex = lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(nextIndex);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") {
        const prevIndex = lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1;
        setLightboxIndex(prevIndex);
      } else if (e.key === "ArrowRight") {
        const nextIndex = lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1;
        setLightboxIndex(nextIndex);
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  return (
    <div className="pt-24 md:pt-32 pb-24">
      {/* Gallery Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBackToHome}
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-8 px-4 py-2 rounded-full border transition-all ${
            isDarkMode 
              ? 'bg-white/5 border-white/10 text-silver hover:text-gold hover:border-gold/30' 
              : 'bg-white border-slate-200 text-slate-600 hover:text-gold hover:border-gold shadow-sm'
          }`}
        >
          <ArrowLeft size={14} /> Back to Hub
        </motion.button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-3"
            >
              Visual Heritage
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl md:text-6xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-navy'}`}
            >
              VNP Media Gallery
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-base md:text-lg font-light mt-4 max-w-2xl leading-relaxed ${
                isDarkMode ? 'text-silver/70' : 'text-slate-500'
              }`}
            >
              Exemplifying administrative precision, professional fellowship, and public sector stewardship across our administrative quarters and summit rooms.
            </motion.p>
          </div>
        </div>

        {/* Categories Tab Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2.5 mt-12 pb-4 overflow-x-auto border-b border-white/5 scrollbar-thin"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`py-3 px-5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-gold text-navy shadow-md shadow-gold/15"
                    : isDarkMode
                      ? "bg-white/5 text-silver hover:bg-white/10"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-gold hover:text-gold shadow-sm"
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Gallery Bento Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className={`text-sm ${isDarkMode ? 'text-silver/40' : 'text-slate-400'}`}>No items found under this focus group.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const isWide = item.size === "wide";
                const isTall = item.size === "tall";
                
                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`group cursor-pointer ${
                      isWide ? "md:col-span-2" : ""
                    } ${
                      isTall ? "md:row-span-2" : ""
                    }`}
                    onClick={() => setLightboxIndex(index)}
                  >
                    <div className={`relative overflow-hidden rounded-3xl border aspect-video w-full h-full min-h-[280px] sm:min-h-[340px] md:min-h-[380px] transition-all duration-500  ${
                      isDarkMode 
                        ? 'border-white/5 bg-navy-light/40 group-hover:border-gold/30 shadow-xl' 
                        : 'border-slate-100 bg-white group-hover:border-gold shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-gold/10'
                    }`}>
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-700 select-none grayscale group-hover:grayscale-0 duration-500 opacity-80 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />

                      {/* Top Overlay Accent */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className={`px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest backdrop-blur-md shadow-sm ${
                          isDarkMode 
                            ? 'bg-navy/80 text-gold border border-white/10' 
                            : 'bg-white/95 text-gold border border-gold/10'
                        }`}>
                          {item.categoryLabel}
                        </span>
                      </div>

                      {/* Hover Overlay Caption */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8 z-10">
                        <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex items-center gap-4 text-[10px] text-gold font-bold uppercase tracking-widest opacity-80">
                            <span className="flex items-center gap-1">
                              <Calendar size={10} /> {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={10} /> {item.location}
                            </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs text-silver/80 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="pt-2 text-gold font-bold text-[10px] tracking-widest uppercase flex items-center gap-1.5">
                            <Maximize2 size={12} className="text-gold" /> Inspect Frame
                          </div>
                        </div>
                      </div>

                      {/* Permanent subtle footer info for accessibility/light theme refinement */}
                      <div className={`p-5 flex flex-col justify-end h-32 absolute bottom-0 left-0 right-0 bg-gradient-to-t pointer-events-none transition-opacity duration-500 group-hover:opacity-0 ${
                        isDarkMode 
                          ? 'from-navy via-navy/50 to-transparent' 
                          : 'from-slate-900/60 via-slate-900/30 to-transparent'
                      }`}>
                        <div className="text-[10px] text-gold font-bold uppercase tracking-widest flex items-center gap-1 mb-1">
                          <MapPin size={10} /> {item.location}
                        </div>
                        <h4 className="text-base font-black text-white truncate leading-tight">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-navy/98 backdrop-blur-xl"
            />

            {/* Lightbox Holder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 w-full max-w-5xl flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-14 right-2 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
              >
                <X size={20} />
              </button>

              {/* Main Content Box: responsive columns */}
              <div className={`grid md:grid-cols-12 rounded-3xl overflow-hidden border ${isDarkMode ? 'bg-navy-light/80 border-white/5' : 'bg-white border-slate-200'}`}>
                {/* Image Container Panel (Left 7 Columns) */}
                <div className="md:col-span-8 bg-black/40 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] relative flex items-center justify-center p-6">
                  <img
                    src={filteredItems[lightboxIndex].image}
                    alt={filteredItems[lightboxIndex].title}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl select-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Left & Right Nav Controls inside slide */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/5 hover:scale-110 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/5 hover:scale-110 transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Info details Panel (Right 4 Columns) */}
                <div className={`md:col-span-4 p-8 flex flex-col justify-between ${isDarkMode ? 'text-white border-t border-white/5 md:border-t-0 md:border-l' : 'text-navy border-t border-slate-100 md:border-t-0 md:border-l'}`}>
                  <div className="space-y-6">
                    <div>
                      <span className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gold/10 text-gold border border-gold/20 inline-block mb-4">
                        {filteredItems[lightboxIndex].categoryLabel}
                      </span>
                      <h3 className={`text-2xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-navy'}`}>
                        {filteredItems[lightboxIndex].title}
                      </h3>
                    </div>

                    <div className="space-y-3.5">
                      <div className="flex items-center gap-3 text-xs">
                        <Calendar size={14} className="text-gold shrink-0" />
                        <div>
                          <p className={`text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? 'text-silver/40' : 'text-slate-400'}`}>Date of Record</p>
                          <p className={`font-semibold ${isDarkMode ? 'text-silver' : 'text-slate-700'}`}>{filteredItems[lightboxIndex].date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs">
                        <MapPin size={14} className="text-gold shrink-0" />
                        <div>
                          <p className={`text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? 'text-silver/40' : 'text-slate-400'}`}>Location</p>
                          <p className={`font-semibold ${isDarkMode ? 'text-silver' : 'text-slate-700'}`}>{filteredItems[lightboxIndex].location}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`border-t pt-6 h-px ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`} />

                    <div className="space-y-2">
                      <p className={`text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? 'text-silver/40' : 'text-slate-400'}`}>Historical Context & Insights</p>
                      <p className={`text-sm leading-relaxed font-light ${isDarkMode ? 'text-silver/80' : 'text-slate-600'}`}>
                        {filteredItems[lightboxIndex].description}
                      </p>
                    </div>
                  </div>

                  {/* Frame Counter & Status indicator */}
                  <div className={`mt-8 pt-6 border-t flex items-center justify-between text-xs ${isDarkMode ? 'border-white/5 text-silver/40' : 'border-slate-100 text-slate-400'}`}>
                    <span className="font-bold tracking-wider">SECURE FRAME INSPECTOR</span>
                    <span className="font-mono">
                      {lightboxIndex + 1} &frasl; {filteredItems.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
