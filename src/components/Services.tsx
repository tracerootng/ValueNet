import { motion } from "motion/react";
import { ShieldCheck, PieChart, FileText, Briefcase, TrendingUp, Users } from "lucide-react";

interface ServicesProps {
  isDarkMode: boolean;
}

export default function Services({ isDarkMode }: ServicesProps) {
  const services = [
    {
      title: "Assurance & Audit",
      description: "Comprehensive external and internal auditing services ensuring regulatory compliance and financial integrity.",
      icon: <ShieldCheck size={28} />,
    },
    {
      title: "Tax Advisory",
      description: "Expert guidance on PITA, CITA, VAT, and Finance Act compliance to minimize risk and optimize liabilities.",
      icon: <PieChart size={28} />,
    },
    {
      title: "Financial Advisory",
      description: "Strategic planning, corporate restructuring, and investment advisory to drive sustainable growth.",
      icon: <Briefcase size={28} />,
    },
    {
      title: "Consultancy",
      description: "Tailored business solutions for process improvement and organizational efficiency.",
      icon: <FileText size={28} />,
    },
    {
      title: "Corporate Strategy",
      description: "High-level strategic frameworks designed to position your brand at the forefront of the industry.",
      icon: <TrendingUp size={28} />,
    },
    {
      title: "Human Capital",
      description: "Recruitment services and staff training to ensure your team is equipped for excellence.",
      icon: <Users size={28} />,
    },
  ];

  return (
    <section id="services" className={`section-padding relative overflow-hidden transition-colors ${isDarkMode ? 'bg-navy' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-4"
          >
            Specialized Practice
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-3xl md:text-6xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-navy'}`}
          >
            Strategic Solutions for <br /> <span className="text-gradient-gold">Global Landscapes</span>
          </motion.h2>
        </div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
               className={`glass-card p-8 sm:p-12 gold-glow group cursor-pointer h-full flex flex-col items-start ${isDarkMode ? 'border-white/5' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-gold/10'}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${isDarkMode ? 'bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy' : 'bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white'}`}>
                {service.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-navy'} group-hover:text-gold transition-colors`}>{service.title}</h3>
              <p className={`leading-relaxed font-light ${isDarkMode ? 'text-silver/60' : 'text-slate-500'}`}>
                {service.description}
              </p>
              <div className={`mt-10 pt-6 border-t w-full ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                <span className="text-[10px] font-bold text-gold tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">Expert Analysis →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
