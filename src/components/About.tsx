import { motion } from "motion/react";
import { Handshake, Lightbulb, Repeat, Users } from "lucide-react";

interface AboutProps {
  isDarkMode: boolean;
}

export default function About({ isDarkMode }: AboutProps) {
  const values = [
    {
      title: "Integrity",
      desc: "Unwavering commitment to honesty and professional ethics in every engagement.",
      icon: <Handshake className="text-gold" size={24} />,
    },
    {
      title: "Creativity",
      desc: "Innovative problem-solving strategies tailored to unique financial challenges.",
      icon: <Lightbulb className="text-gold" size={24} />,
    },
    {
      title: "Consistency",
      desc: "Delivering value-added excellence across all our global service touchpoints.",
      icon: <Repeat className="text-gold" size={24} />,
    },
    {
      title: "Teamwork",
      desc: "Collaborative approach combining local expertise with global insights.",
      icon: <Users className="text-gold" size={24} />,
    },
  ];

  return (
    <section id="about" className={`section-padding transition-colors ${isDarkMode ? 'bg-navy' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-6">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6"
            >
              Our Philosophy
            </motion.p>
            <h2 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-10 ${isDarkMode ? 'text-white' : 'text-navy'}`}>
              Guided by <br /> <span className="text-gradient-gold">Values of Trust</span>
            </h2>
            <p className={`text-lg leading-relaxed font-light mb-12 ${isDarkMode ? 'text-silver/70' : 'text-slate-600'}`}>
              At Valuenet Associate, we believe that reputation is the ultimate currency. Our leadership combines deep regulatory expertise in Nigeria with a global outlook to protect and grow your legacy.
            </p>
            
            <div className={`glass-card p-12 border transition-all duration-500 relative overflow-hidden ${isDarkMode ? 'border-gold/10' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-gold/10'}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <h4 className={`text-xl font-bold italic mb-6 leading-relaxed ${isDarkMode ? 'text-white' : 'text-navy'}`}>
                "True assurance isn't just about the numbers on a balance sheet; it's about the integrity of the process that verified them."
              </h4>
              <p className="text-gold font-bold text-[10px] tracking-[0.2em] uppercase">— The VNP Doctrine</p>
            </div>
          </div>

          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-10 rounded-3xl border transition-all duration-300 hover:border-gold/30 hover:scale-[1.02] group ${
                  isDarkMode 
                  ? 'border-white/5 bg-white/[0.02]' 
                  : 'border-slate-200 bg-white shadow-lg shadow-black/[0.02]'
                } ${i % 2 === 1 ? 'lg:mt-12' : ''}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-all group-hover:bg-gold/10 ${isDarkMode ? 'border-gold/20' : 'border-gold/40'}`}>
                  {v.icon}
                </div>
                <h3 className={`font-bold text-2xl mb-4 ${isDarkMode ? 'text-white' : 'text-navy'}`}>{v.title}</h3>
                <p className={`text-sm leading-relaxed font-light ${isDarkMode ? 'text-silver/40' : 'text-slate-500'}`}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
