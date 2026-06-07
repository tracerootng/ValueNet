import { Globe, Linkedin, Twitter, Facebook, ArrowUp } from "lucide-react";

interface FooterProps {
  isDarkMode: boolean;
  onViewChange?: (view: 'home' | 'gallery') => void;
}

export default function Footer({ isDarkMode, onViewChange }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`py-20 border-t transition-colors ${isDarkMode ? 'bg-navy border-white/5' : 'bg-white border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center mb-8">
              <img 
                src="https://i.ibb.co/mV64gprc/valuenetlogo.png" 
                alt="VALUENET Logo" 
                className="h-40 md:h-48 w-auto object-contain -ml-4" 
                referrerPolicy="no-referrer"
              />
            </div>
            <p className={`max-w-sm mb-8 leading-relaxed font-light ${isDarkMode ? 'text-silver/40' : 'text-slate-500'}`}>
              Valuenet Associate is a premium Audit, Tax, and Financial Advisory firm based in Nigeria, committed to global standards and regional excellence.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isDarkMode ? 'border-white/10 text-silver/40 hover:border-gold hover:text-gold' : 'border-slate-200 text-slate-400 hover:border-gold hover:text-gold'}`}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className={`font-bold uppercase text-[10px] tracking-[0.3em] mb-8 ${isDarkMode ? 'text-white' : 'text-navy'}`}>Services</h4>
            <ul className={`space-y-4 text-sm font-light ${isDarkMode ? 'text-silver/40' : 'text-slate-500'}`}>
              {["Assurance", "Tax Advisory", "Consultancy", "Risk Management", "Corporate Strategy"].map(item => (
                <li key={item}><a href="#" className="hover:text-gold transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-bold uppercase text-[10px] tracking-[0.3em] mb-8 ${isDarkMode ? 'text-white' : 'text-navy'}`}>Offices</h4>
            <ul className={`space-y-4 text-sm font-light ${isDarkMode ? 'text-silver/40' : 'text-slate-500'}`}>
              <li>Abuja Headquarters</li>
            </ul>
          </div>
        </div>

        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
          <p className="text-[10px] text-silver/20 uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} Valuenet Associate. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-6 items-center text-xs text-silver/30">
            {onViewChange && (
              <button 
                onClick={() => {
                  onViewChange('gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="hover:text-gold transition-all text-xs cursor-pointer text-left bg-transparent border-none p-0 font-normal"
              >
                Media Gallery
              </button>
            )}
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-gold transition-colors uppercase text-[10px] font-bold tracking-widest">
              Back to Top <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
