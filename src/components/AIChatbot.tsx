import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import { 
  Send, Bot, User, Loader2, Info, Search, 
  MessageSquare, ExternalLink, PlusCircle, 
  History, Filter, ArrowUpDown, ChevronRight,
  FileText
} from "lucide-react";
import { chatWithTaxAssistant, searchTaxLaws } from "../services/geminiService";

interface SearchResult {
  actName: string;
  sectionNumber: string;
  title: string;
  snippet: string;
  officialUrl: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: { role: 'user' | 'model', text: string }[];
  timestamp: number;
}

interface AIChatbotProps {
  isDarkMode: boolean;
}

export default function AIChatbot({ isDarkMode }: AIChatbotProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'search'>('chat');
  const [chats, setChats] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('vnp_chats');
    if (saved) return JSON.parse(saved);
    return [{ 
      id: 'default', 
      title: 'Initial Consultation', 
      messages: [{ 
        role: 'model', 
        text: `### Welcome to VNP Intelligence
I am your **AI Regulatory Assistant**, specialized in Nigerian tax laws and fiscal frameworks. 

I can assist you with:
*   **Compliance Queries:** CITA, PITA, and VAT regulations.
*   **Filing Deadlines:** Statutory timelines for FIRS and state revenues.
*   **Strategic Analysis:** Impact of recently enacted Finance Acts.

How can I facilitate your strategic financial planning today?` 
      }],
      timestamp: Date.now()
    }];
  });

  useEffect(() => {
    localStorage.setItem('vnp_chats', JSON.stringify(chats));
  }, [chats]);
  const [activeChatId, setActiveChatId] = useState('default');
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [searchSort, setSearchSort] = useState<'relevance' | 'section'>('relevance');
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const samplePrompts = [
    "What are the CIT rates for small vs large companies?",
    "Explain VAT exemptions in Finance Act 2024.",
    "Deadlines for FIRS annual returns filing?",
    "Withholding tax rates for consultancy services?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat.messages, activeTab]);

  const handleNewChat = () => {
    const newChat: ChatSession = {
      id: Math.random().toString(36).substring(7),
      title: 'New Consultation',
      messages: [{ role: 'model', text: "New session started. How can I assist you with tax advisory today?" }],
      timestamp: Date.now()
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
    setActiveTab('chat');
  };

  const updateActiveChatMessages = (updater: (prev: { role: 'user' | 'model', text: string }[]) => { role: 'user' | 'model', text: string }[]) => {
    setChats(prev => prev.map(c => 
      c.id === activeChatId ? { ...c, messages: updater(c.messages) } : c
    ));
  };

  const handleSend = async (overrideInput?: string) => {
    const messageToSend = overrideInput || input;
    if (!messageToSend.trim() || isLoading) return;

    if (activeTab === 'search') {
      await handleSearch(messageToSend);
      return;
    }

    setInput("");
    updateActiveChatMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setIsLoading(true);

    try {
      const history = activeChat.messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const botResponse = await chatWithTaxAssistant(messageToSend, history);
      updateActiveChatMessages(prev => [...prev, { role: 'model', text: botResponse || "I'm sorry, I couldn't process that request." }]);
      
      if (activeChat.messages.length <= 2) {
        setChats(prev => prev.map(c => 
          c.id === activeChatId ? { ...c, title: messageToSend.slice(0, 30) + (messageToSend.length > 30 ? '...' : '') } : c
        ));
      }
    } catch (error) {
      console.error(error);
      updateActiveChatMessages(prev => [...prev, { role: 'model', text: "There was an error connecting to the AI service. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query?: string) => {
    const q = query || input;
    setInput("");
    setIsLoading(true);
    setSearchResults([]);

    try {
      const results = await searchTaxLaws(q, searchFilter, searchSort);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <section id="ai-assistant" className={`section-padding transition-colors ${isDarkMode ? 'bg-navy/50' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDarkMode ? 'bg-gold/10 border border-gold/20' : 'bg-gold/5 border border-gold/10'}`}
          >
            <Bot size={14} className="text-gold" />
            <span className="text-gold text-xs font-bold tracking-widest uppercase">Next-Gen Regulatory Intelligence</span>
          </motion.div>
          <h2 className={`text-4xl md:text-6xl font-black mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-navy'}`}>
            Financial <span className="text-gradient-gold">Intelligence.</span>
          </h2>
          <p className={`max-w-2xl mx-auto font-light leading-relaxed ${isDarkMode ? 'text-silver/60' : 'text-slate-500'}`}>
            A precision-engineered interface for statutory search and strategic tax consultation.
          </p>
        </div>

        <div className={`glass-card border-gold/10 overflow-hidden shadow-2xl h-[650px] md:h-[750px] flex relative ${isDarkMode ? '' : 'bg-white shadow-xl'}`}>
          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {isMobileSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSidebarOpen(false)}
                className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <div className={`
            w-72 md:w-80 border-r border-gold/10 flex flex-col z-50 transition-transform duration-300
            absolute inset-y-0 left-0 lg:relative lg:translate-x-0
            ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            ${isDarkMode ? 'bg-black/40' : 'bg-slate-50'}
          `}>
            <div className="p-6">
              <button 
                onClick={() => { handleNewChat(); setIsMobileSidebarOpen(false); }}
                className="w-full btn-primary flex items-center justify-center gap-2 py-4 shadow-lg shadow-gold/10"
              >
                <PlusCircle size={18} /> New Session
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6">
              <div>
                <h4 className={`px-2 text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${isDarkMode ? 'text-silver/40' : 'text-navy/40'}`}>
                  <History size={12} /> Recent History
                </h4>
                <div className="space-y-1">
                  {chats.map(chat => (
                    <button
                      key={chat.id}
                      onClick={() => { setActiveChatId(chat.id); setActiveTab('chat'); setIsMobileSidebarOpen(false); }}
                      className={`w-full text-left p-3 rounded-xl text-sm transition-all group border ${
                        activeChatId === chat.id 
                        ? 'bg-gold/10 text-gold border-gold/20' 
                        : `border-transparent ${isDarkMode ? 'text-silver/60 hover:bg-white/5 hover:text-white' : 'text-slate-600 hover:bg-slate-100'}`
                      }`}
                    >
                      <div className="font-bold truncate">{chat.title}</div>
                    <div className={`text-[10px] mt-1 font-medium ${isDarkMode ? 'opacity-40' : 'text-navy/40'}`}>{new Date(chat.timestamp).toLocaleDateString()}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className={`px-2 text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${isDarkMode ? 'text-silver/40' : 'text-navy/40'}`}>
                  <Filter size={12} /> Focus Areas
                </h4>
                <div className="space-y-4 px-2">
                  <div className="space-y-2">
                    <label className={`text-[10px] uppercase font-bold px-1 ${isDarkMode ? 'text-silver/60' : 'text-navy/60'}`}>Jurisdiction</label>
                    <select 
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className={`w-full border rounded-xl p-3 text-xs focus:outline-none focus:border-gold/50 transition-colors ${
                        isDarkMode ? 'bg-navy border-white/10 text-silver' : 'bg-white border-slate-200 text-navy'
                      }`}
                    >
                      <option value="">All Nigerian Laws</option>
                      <option value="CITA">CIT Act</option>
                      <option value="PITA">PIT Act</option>
                      <option value="Finance Act">Finance Act 2024</option>
                      <option value="VAT">VAT Regulations</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Console Area */}
          <div className="flex-1 flex flex-col bg-navy/20 relative">
            {/* Console Header */}
            <div className={`h-16 border-b border-gold/10 flex items-center justify-between px-4 md:px-8 ${isDarkMode ? 'bg-white/5' : 'bg-white'}`}>
              <div className="flex gap-2 md:gap-8 h-full">
                <button 
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="lg:hidden p-2 text-gold mr-2"
                >
                  <History size={20} />
                </button>
                <button 
                  onClick={() => setActiveTab('chat')}
                  className={`h-full flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all px-2 md:px-4 border-b-2 ${
                    activeTab === 'chat' 
                      ? 'text-gold border-gold' 
                      : `${isDarkMode ? 'text-silver/40 hover:text-silver' : 'text-navy/40 hover:text-navy'} border-transparent`
                  }`}
                >
                  <MessageSquare size={14} className="hidden sm:block" /> Advisory
                </button>
                <button 
                  onClick={() => setActiveTab('search')}
                  className={`h-full flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all px-2 md:px-4 border-b-2 ${
                    activeTab === 'search' 
                      ? 'text-gold border-gold' 
                      : `${isDarkMode ? 'text-silver/40 hover:text-silver' : 'text-navy/40 hover:text-navy'} border-transparent`
                  }`}
                >
                  <Search size={14} className="hidden sm:block" /> Statutory
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-silver/40 hover:text-gold transition-colors">
                  <Info size={16} />
                </button>
              </div>
            </div>

            {/* Console Content */}
            <div className={`flex-1 overflow-hidden flex flex-col ${isDarkMode ? '' : 'bg-slate-50/50'}`}>
              {activeTab === 'chat' ? (
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth"
                >
                  {activeChat.messages.length === 1 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-8 md:mt-12 max-w-2xl mx-auto"
                    >
                      <h3 className={`font-bold text-lg mb-8 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-navy'}`}>
                        <span className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold"><FileText size={18} /></span>
                        Strategic Queries
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {samplePrompts.map((p, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(p)}
                            className={`text-left glass-card p-6 border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all group flex flex-col justify-between ${isDarkMode ? '' : 'bg-white shadow-sm hover:shadow-md'}`}
                          >
                            <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-silver/70' : 'text-slate-600'}`}>{p}</p>
                            <div className="flex items-center gap-2 text-gold text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                              Execute <ChevronRight size={10} />
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <AnimatePresence initial={false}>
                    {activeChat.messages.map((m, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[90%] md:max-w-[80%] lg:max-w-[70%] p-5 md:p-6 rounded-2xl relative shadow-lg ${
                          m.role === 'user' 
                          ? 'bg-gold text-navy font-bold' 
                          : `${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} text-silver border backdrop-blur-xl`
                        }`}>
                          <div className={`flex items-center gap-3 mb-3 border-b pb-2 ${m.role === 'user' ? 'border-navy/10' : 'border-white/5'}`}>
                             <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${m.role === 'user' ? 'bg-navy text-gold' : 'bg-gold text-navy font-bold'}`}>
                                {m.role === 'user' ? <User size={12} strokeWidth={3} /> : <Bot size={12} strokeWidth={3} />}
                             </div>
                             <span className={`text-[10px] uppercase font-black tracking-widest ${m.role === 'user' ? 'text-navy/60' : 'text-gold'}`}>
                                {m.role === 'user' ? 'Strategic Inquiry' : 'VNP Intelligence'}
                             </span>
                          </div>
                          <div className={`markdown-body ${m.role === 'user' ? 'text-navy font-bold' : isDarkMode ? 'text-silver' : 'text-slate-700'}`}>
                            <Markdown>{m.text}</Markdown>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                        <Loader2 className="animate-spin text-gold" size={20} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                  {isLoading && searchResults.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-silver/20">
                      <Loader2 className="animate-spin mb-6" size={48} />
                      <p className="text-sm uppercase tracking-[0.3em] font-black">Parsing Statutes...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="grid gap-6 max-w-4xl mx-auto pb-20">
                      <div className={`flex justify-between items-center p-4 rounded-xl mb-4 border ${isDarkMode ? 'bg-gold/5 border-gold/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                        <div className="text-xs font-black text-gold uppercase tracking-widest">Found {searchResults.length} Relevant Sections</div>
                        <div className="flex items-center gap-4 text-[10px] text-silver/60 uppercase font-bold">
                          <span className="flex items-center gap-1"><ArrowUpDown size={10} /> {searchSort}</span>
                        </div>
                      </div>
                      {searchResults.map((res, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`glass-card p-6 md:p-8 border-white/5 hover:border-gold/30 hover:shadow-2xl transition-all group relative ${isDarkMode ? '' : 'bg-white shadow-lg'}`}
                        >
                          <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink size={16} className="text-gold" />
                          </div>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                               <span className="px-2 py-1 bg-gold text-navy text-[9px] font-black uppercase rounded tracking-wider mr-3">
                                  {res.actName}
                               </span>
                               <span className={`text-[10px] font-mono tracking-widest ${isDarkMode ? 'text-silver/40' : 'text-slate-400'}`}>{res.sectionNumber}</span>
                            </div>
                          </div>
                          <h4 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-navy'}`}>{res.title}</h4>
                          <div className={`text-sm leading-relaxed mb-6 italic border-l-2 border-gold/30 pl-6 py-2 ${isDarkMode ? 'text-silver/70 bg-white/[0.02]' : 'text-slate-600 bg-slate-50'}`}>
                            {res.snippet}
                          </div>
                          <a 
                            href={res.officialUrl} 
                            target="_blank" 
                            className="inline-flex items-center gap-2 text-xs font-black text-gold hover:tracking-[0.2em] transition-all"
                          >
                            DOWNLOAD OFFICIAL GAZETTE <ChevronRight size={12} />
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center px-6 md:px-12">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold/5 flex items-center justify-center mb-8 border border-gold/10">
                        <Search size={32} className="text-gold/20" />
                      </div>
                      <h3 className={`font-bold text-2xl mb-4 ${isDarkMode ? 'text-white' : 'text-navy'}`}>Central Repository</h3>
                      <p className={`text-sm leading-relaxed max-w-sm mb-12 ${isDarkMode ? 'text-silver/40' : 'text-slate-500'}`}>
                        Query the legislative database for specific tax instruments and fiscal regulations. Use keywords to pinpoint exact sections.
                      </p>
                      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                        {["Finance Act 2024", "CITA Section 19", "VAT Exemptions", "Personal Reliefs"].map((tag, i) => (
                           <button 
                             key={i}
                             onClick={() => handleSend(tag)}
                             className={`text-xs font-bold border py-3 rounded-xl transition-all ${
                               isDarkMode 
                               ? 'text-silver/60 border-white/5 hover:border-gold/50 hover:text-gold' 
                               : 'text-slate-600 border-slate-200 bg-white hover:border-gold/50 hover:text-gold shadow-sm'
                             }`}
                           >
                              {tag}
                           </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Global Input Bar */}
            <div className={`p-4 md:p-8 border-t border-gold/10 backdrop-blur-xl ${isDarkMode ? 'bg-black/40' : 'bg-white'}`}>
              <div className="max-w-4xl mx-auto relative group">
                <div className={`relative flex items-center border rounded-full pl-6 md:pl-8 pr-1 md:pr-2 py-1 md:py-2 focus-within:border-gold/50 transition-all shadow-2xl ${
                  isDarkMode ? 'bg-navy/80 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !isLoading) {
                        handleSend();
                      }
                    }}
                    placeholder={activeTab === 'chat' ? "Inquire about tax compliance..." : "Enter keywords for statutes..."}
                    className={`flex-1 bg-transparent text-sm focus:outline-none py-3 ${isDarkMode ? 'text-silver placeholder:text-silver/20' : 'text-navy placeholder:text-slate-300'}`}
                  />
                  <button 
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    className="flex items-center gap-2 bg-gold text-navy p-3 md:px-8 md:py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100"
                  >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : activeTab === 'chat' ? <MessageSquare size={16} /> : <Search size={16} />}
                    <span className="hidden md:inline">{activeTab === 'chat' ? 'Analyze' : 'Search'}</span>
                  </button>
                </div>
                <div className="mt-4 text-center">
                   <p className={`text-[9px] uppercase tracking-[0.15em] font-bold italic transition-colors ${isDarkMode ? 'text-white/30' : 'text-slate-500'}`}>
                      Disclaimer: AI can make mistakes. Verify all outputs with VNP partners before filing.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


