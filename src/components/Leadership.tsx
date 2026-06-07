import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Linkedin, Mail, Award, X, FileText, CheckCircle2, GraduationCap } from "lucide-react";

interface LeadershipProps {
  isDarkMode: boolean;
}

interface Member {
  id: string;
  name: string;
  title: string;
  role: string;
  subtitle: string;
  yearsExperience: string;
  image: string;
  bioSummary: string;
  fullBio: string[];
  education: string[];
  credentials: string[];
  memberships: string[];
  linkedin: string;
  email: string;
}

export default function Leadership({ isDarkMode }: LeadershipProps) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const members: Member[] = [
    {
      id: "buba",
      name: "Mohammed Buba",
      title: "FCNA, FCIHCD",
      role: "Principal Partner & Co-Founder",
      subtitle: "Principal Partner",
      yearsExperience: "22",
      image: "https://i.ibb.co/HL3ZJjQd/My-Pic-jpg.jpg",
      bioSummary: "An executive leader with 22 years of post-graduation public service experience across accounting, public finance management, auditing, and corrupt-free administrative frameworks.",
      fullBio: [
        "Mohammed Buba has 22 years of post-graduation experience in the public service, cutting across accounting, public finance management, auditing and assurances, monitoring and evaluation, project management, and administration.",
        "As a Principal Partner and co-founder of Value Net Associates, Mr. Mohammed combines structural public sector accountability with agile private consulting strategies to help enterprises and public bodies navigate statutory landscapes with maximum transparency.",
        "He is highly respected for his technical leadership in governance frameworks, forensic tracking, corruption risk assessments, and monitoring and evaluation."
      ],
      education: [
        "M.Sc. in Public Sector Accounting — Nasarawa State University, Keffi (NSUK) (2016)",
        "Professional Postgraduate Diploma in Accounting & Finance — Nigerian College of Accountancy, Jos, Plateau State (2006)",
        "B.Sc. in Accountancy — University of Maiduguri, Borno State (2003)"
      ],
      credentials: [
        "Fellow Certified National Accountant of Nigeria (FCNA)",
        "Fellow Chartered Institute of Human Capital Development (FCIHCD)"
      ],
      memberships: [
        "Member, Monitoring & Evaluation (M&E) Society of Nigeria",
        "Member, Chartered Institute of Management",
        "Trained Corruption Risk Assessor (CRA)"
      ],
      linkedin: "#",
      email: "m.buba@valuenetassociates.com"
    },
    {
      id: "asiya",
      name: "Dr. Asiya Abdullahi Umar",
      title: "PhD, FCNA, FCA",
      role: "Partner & Co-Founder",
      subtitle: "Partner",
      yearsExperience: "20+",
      image: "https://i.ibb.co/WvCqF8Qq/foundee2.jpg",
      bioSummary: "An accomplished assurance specialist and academic leader with over 20 years of post-graduation expertise spanning corporate finance, auditing, and global administrative structures.",
      fullBio: [
        "Dr. Asiya Abdullahi Umar has over 20 years of post-graduation experience in Accounting, Finance, Auditing, and Business Administration.",
        "As a Partner and co-founder of Value Net Associates, she directs the firm's strategic audit pipelines, corporate restructuring portfolios, and multinational tax risk frameworks.",
        "Dr. Asiya couples absolute technical excellence with academic depth, ensuring client organizations maintain highest standards of board governance and compliance."
      ],
      education: [
        "PhD in Business Administration — Paris School of Business, Paris, France (2022)",
        "Master of Business Administration (MBA) — Lagos Business School, Pan-Atlantic University, Lagos",
        "B.Sc. in Accountancy — University of Maiduguri, Borno State (2005)"
      ],
      credentials: [
        "Fellow Certified National Accountants of Nigeria (FCNA)",
        "Fellow of the Institute of Chartered Accountants of Nigeria (FCA)"
      ],
      memberships: [
        "Member, American Association of Safety Professionals",
        "Member, Nigerian Institute of Management (NIM)",
        "Member, International Council of Management Consultants",
        "Certified Management Consultant (CMC) of Nigeria"
      ],
      linkedin: "#",
      email: "a.umar@valuenetassociates.com"
    }
  ];

  return (
    <section id="leadership" className={`section-padding relative overflow-hidden transition-colors ${isDarkMode ? 'bg-navy' : 'bg-slate-50'}`}>
      <div className={`absolute top-1/2 left-0 w-full h-[1px] ${isDarkMode ? 'bg-gradient-to-r from-transparent via-gold/20 to-transparent' : 'bg-gold/10'}`} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-3"
          >
            Partners in Leadership
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-navy'}`}
          >
            Guiding Your Financial Legacy
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-gold mx-auto"
          />
        </div>

        {/* Members Grid/Alternating Showcase */}
        <div className="space-y-36">
          {members.map((member, i) => (
            <div key={member.id} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`relative ${i % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className={`relative z-10 glass-card p-4 rounded-3xl ${isDarkMode ? '' : 'bg-white shadow-2xl overflow-hidden'}`}>
                  <div className={`aspect-[4/5] rounded-2xl overflow-hidden transition-all duration-700 ${isDarkMode ? 'grayscale contrast-125 brightness-90 hover:grayscale-0' : 'hover:scale-105'}`}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className={`absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 rounded-tl-3xl ${isDarkMode ? 'border-gold/30' : 'border-gold/15'}`} />
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 border-b-2 border-r-2 rounded-br-3xl ${isDarkMode ? 'border-gold/30' : 'border-gold/15'}`} />
                
                <div className={`absolute bottom-12 -right-8 glass-card p-6 border-gold/30 shadow-2xl backdrop-blur-xl ${isDarkMode ? '' : 'bg-white/95 border-slate-100'}`}>
                   <div className="flex items-center gap-4">
                      <Award className="text-gold" size={36} />
                      <div>
                        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-navy'}`}>{member.yearsExperience}</div>
                        <div className="text-[9px] text-gold font-bold uppercase tracking-widest">Years Experience</div>
                      </div>
                   </div>
                </div>
              </motion.div>

              {/* Bio Details Side */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 1 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={i % 2 === 1 ? 'lg:order-1' : ''}
              >
                <p className="text-gold font-bold tracking-[0.3em] uppercase text-[11px] mb-4">{member.role}</p>
                <h2 className={`text-3xl md:text-5xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-navy'}`}>{member.name}</h2>
                <p className="text-gold font-bold text-sm mb-8 tracking-wider uppercase">{member.title}</p>
                
                <div className={`space-y-6 font-light text-base leading-relaxed mb-10 ${isDarkMode ? 'text-silver/70' : 'text-slate-600'}`}>
                  <p className="font-normal text-lg">
                    {member.bioSummary}
                  </p>
                  
                  <div className="space-y-3">
                    <p className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/60' : 'text-navy/60'}`}>Professional Credentials</p>
                    <ul className="space-y-3">
                      {member.credentials.map((cred, j) => (
                        <li key={j} className="flex gap-3 items-center text-sm font-medium">
                          <CheckCircle2 className="text-gold shrink-0" size={16} />
                          <span className={isDarkMode ? 'text-silver/80' : 'text-navy font-semibold'}>{cred}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <a 
                    href={member.linkedin} 
                    className={`p-4 rounded-full border transition-all ${isDarkMode ? 'glass-card text-silver hover:text-gold border-white/10' : 'bg-white border-slate-200 text-slate-500 hover:text-gold hover:border-gold shadow-lg shadow-slate-100'}`}
                  >
                    <Linkedin size={18} />
                  </a>
                  <a 
                    href={`mailto:${member.email}`} 
                    className={`p-4 rounded-full border transition-all ${isDarkMode ? 'glass-card text-silver hover:text-gold border-white/10' : 'bg-white border-slate-200 text-slate-500 hover:text-gold hover:border-gold shadow-lg shadow-slate-100'}`}
                  >
                    <Mail size={18} />
                  </a>
                  <button 
                    onClick={() => setSelectedMember(member)}
                    className="btn-primary ml-2 px-8 py-3.5 text-sm font-semibold rounded-xl"
                  >
                    Full Biography & Details
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Bio Modal Backdrop/AnimatePresence */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-navy/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative z-10 w-full max-w-3xl rounded-3xl p-6 md:p-10 border max-h-[90vh] overflow-y-auto ${
                isDarkMode 
                  ? 'bg-navy-light/95 border-white/10 text-white shadow-2xl' 
                  : 'bg-white border-slate-200 text-navy shadow-3xl'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${
                  isDarkMode ? 'bg-white/5 hover:bg-white/10 text-silver' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <X size={20} />
              </button>

              {/* Modal Content Header */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start mb-8 pb-6 border-b border-white/10">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gold/20">
                  <img 
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-gold font-bold tracking-[0.2em] uppercase text-[10px] block mb-1">
                    {selectedMember.role}
                  </span>
                  <h3 className={`text-2xl md:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-navy'}`}>
                    {selectedMember.name}
                  </h3>
                  <p className="text-gold/80 text-xs font-bold uppercase tracking-wider mt-1">
                    {selectedMember.title}
                  </p>
                </div>
              </div>

              {/* Detailed Bio Body */}
              <div className="space-y-8">
                {/* Detailed Paragraphs */}
                <div className={`space-y-4 text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-silver' : 'text-slate-700'}`}>
                  {selectedMember.fullBio.map((para, k) => (
                    <p key={k}>{para}</p>
                  ))}
                </div>

                {/* Section: Academic Background */}
                <div className="space-y-3">
                  <h4 className="flex items-center gap-2.5 text-xs font-black uppercase tracking-widest text-gold">
                    <GraduationCap size={16} /> Technical & Academic Background
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedMember.education.map((edu, k) => (
                      <li key={k} className="flex gap-3 items-start text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 bg-gold shrink-0`} />
                        <span className={isDarkMode ? 'text-silver/90' : 'text-slate-700 font-medium'}>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section: Professional Memberships */}
                <div className="space-y-3">
                  <h4 className="flex items-center gap-2.5 text-xs font-black uppercase tracking-widest text-gold">
                    <FileText size={16} /> Professional Affiliations & Memberships
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedMember.memberships.map((memberOf, k) => (
                      <div 
                        key={k}
                        className={`flex gap-3 items-center p-3 rounded-xl border text-xs font-semibold ${
                          isDarkMode 
                            ? 'bg-white/5 border-white/5 text-silver' 
                            : 'bg-slate-50 border-slate-100 text-navy shadow-sm'
                        }`}
                      >
                        <CheckCircle2 className="text-gold shrink-0" size={14} />
                        <span>{memberOf}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons at base of modal */}
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-3">
                <a 
                  href={`mailto:${selectedMember.email}`}
                  className="btn-primary px-6 py-3 rounded-lg text-xs font-bold inline-flex items-center gap-2"
                >
                  <Mail size={14} /> Email Partner
                </a>
                <button
                  onClick={() => setSelectedMember(null)}
                  className={`px-6 py-3 rounded-lg text-xs font-bold transition-all ${
                    isDarkMode 
                      ? 'bg-white/5 hover:bg-white/10 text-silver border border-white/10' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
