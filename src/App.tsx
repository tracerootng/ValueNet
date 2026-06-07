/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Leadership from "./components/Leadership";
import AIChatbot from "./components/AIChatbot";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('vnp_theme');
    return saved ? saved === 'dark' : true;
  });
  const [view, setView] = useState<'home' | 'gallery'>('home');

  useEffect(() => {
    localStorage.setItem('vnp_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-navy' : 'bg-slate-50'} selection:bg-gold/30 selection:text-gold transition-colors duration-300`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} currentView={view} onViewChange={setView} />
      <main>
        {view === 'gallery' ? (
          <Gallery isDarkMode={isDarkMode} onBackToHome={() => setView('home')} />
        ) : (
          <>
            <Hero isDarkMode={isDarkMode} />
            <Services isDarkMode={isDarkMode} />
            <About isDarkMode={isDarkMode} />
            <AIChatbot isDarkMode={isDarkMode} />
            <Leadership isDarkMode={isDarkMode} />
            <Contact isDarkMode={isDarkMode} />
          </>
        )}
      </main>
      <Footer isDarkMode={isDarkMode} onViewChange={setView} />
    </div>
  );
}
