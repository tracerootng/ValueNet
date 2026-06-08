import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

interface ContactProps {
  isDarkMode: boolean;
}

export default function Contact({ isDarkMode }: ContactProps) {
  return (
    <section id="contact" className={`section-padding transition-colors ${isDarkMode ? 'bg-navy' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6"
            >
              Get In Touch
            </motion.p>
            <h2 className={`text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-8 md:mb-12 ${isDarkMode ? 'text-white' : 'text-navy'}`}>
              Speak with a<br /> <span className="text-gradient-gold">Senior Associate</span>
            </h2>
            
            <div className="grid gap-6 md:gap-10">
              {[
                { icon: <MapPin size={24} />, title: "Headquarters", content: "Suite 105, Corporate Plaza, Wuse II, Abuja, FCT" },
                { icon: <Phone size={24} />, title: "Direct Line", content: "+234 (0) 803 123 4567 • +234 (0) 9 123 4567" },
                { icon: <Mail size={24} />, title: "Inquiries", content: "advisory@valuenetassociate.com" },
                { icon: <Clock size={24} />, title: "Operating Hours", content: "Mon - Fri: 08:00 — 17:00 WAT" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 sm:gap-8 items-start group">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-gold shrink-0 transition-all group-hover:scale-110 ${isDarkMode ? 'bg-gold/10' : 'bg-white shadow-xl shadow-slate-200/50 border border-slate-100'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-1 sm:mb-2 ${isDarkMode ? 'text-silver/40' : 'text-slate-400'}`}>{item.title}</h4>
                    <p className={`text-base sm:text-lg font-light ${isDarkMode ? 'text-silver/80' : 'text-navy'}`}>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`glass-card p-6 sm:p-12 border-gold/10 shadow-2xl relative overflow-hidden ${isDarkMode ? '' : 'bg-white border-gold/5 shadow-gold/5'}`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            
            <h3 className={`text-2xl font-bold mb-10 ${isDarkMode ? 'text-white' : 'text-navy'}`}>Consultation Request</h3>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gold uppercase tracking-widest block">Full Name</label>
                  <input 
                    type="text" 
                    className={`w-full bg-transparent border-b px-0 py-2 transition-all focus:outline-none placeholder:text-silver/10 ${isDarkMode ? 'border-white/10 text-white focus:border-gold' : 'border-slate-200 text-navy focus:border-gold'}`} 
                    placeholder="Wole Soyinka"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gold uppercase tracking-widest block">Corporate Email</label>
                  <input 
                    type="email" 
                    className={`w-full bg-transparent border-b px-0 py-2 transition-all focus:outline-none placeholder:text-silver/10 ${isDarkMode ? 'border-white/10 text-white focus:border-gold' : 'border-slate-200 text-navy focus:border-gold'}`} 
                    placeholder="wole@conglomerate.com"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gold uppercase tracking-widest block">Strategic Service</label>
                <select className={`w-full bg-transparent border-b px-0 py-2 transition-all focus:outline-none appearance-none cursor-pointer ${isDarkMode ? 'border-white/10 text-white focus:border-gold' : 'border-slate-200 text-navy focus:border-gold'}`}>
                  <option>Statutory Audit & Assurance</option>
                  <option>Strategic Tax Optimization</option>
                  <option>Corporate Restructuring</option>
                  <option>Global Expansion Advisory</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gold uppercase tracking-widest block">Message Intent</label>
                <textarea 
                  rows={4} 
                  className={`w-full bg-transparent border-b px-0 py-2 transition-all focus:outline-none placeholder:text-silver/10 resize-none ${isDarkMode ? 'border-white/10 text-white focus:border-gold' : 'border-slate-200 text-navy focus:border-gold'}`}
                  placeholder="Outline your specific requirements..."
                ></textarea>
              </div>
              <button className="btn-primary w-full flex items-center justify-center gap-4 py-5 font-extrabold">
                Initiate Consultation
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Customized Map View */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`mt-24 rounded-[2rem] h-[500px] overflow-hidden border border-white/10 shadow-2xl transition-all ${isDarkMode ? 'grayscale brightness-50' : 'shadow-gold/10'}`}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.866415256247!2d7.4764!3d9.0765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7dc48897%3A0x3469a6b578fa7643!2sWuse%20II%2C%20Abuja!5e0!3m2!1sen!2sng!4v1714000000000!5m2!1sen!2sng" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
