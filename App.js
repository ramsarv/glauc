import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  ShieldCheck, 
  Activity, 
  Eye, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Sparkles, 
  TrendingUp, 
  Globe,
  Droplet,
  Smartphone,
  Zap,
  Layers,
  Sun,
  Wind,
  ListTodo,
  CheckSquare,
  Video,
  FileText,
  Clock,
  MapPin,
  Star,
  Bot 
} from 'lucide-react';

// --- CONFIGURATION ---
const SERVER_URL = "http://localhost:5000"; 

const callServerAI = async (prompt) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/glauc/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) throw new Error("Server Error");
    
    const data = await response.json();
    return data.result || "Unable to analyze at this time.";
  } catch (error) {
    console.error("AI Server Error:", error);
    return "Simulated Backend Response: The server is unreachable. Please ensure your Node.js backend is running on port 5000.";
  }
};

// --- ANIMATION UTILITIES ---

const ScrollReveal = ({ children, className = "", delay = 0, direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transform = {
    up: "translate-y-12",
    left: "-translate-x-12",
    right: "translate-x-12",
    scale: "scale-95"
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : `opacity-0 ${transform[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ParallaxBlob = ({ className, speed = 1 }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * speed);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      className={`absolute transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) will-change-transform ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    />
  );
};

// --- ASSETS & BRANDING ---

const GlaucLogo = ({ className }) => (
  <img 
    src="/glauc_logo.png" 
    alt="Glauc Logo" 
    className={`object-contain ${className}`} 
  />
);

// --- SHARED UI COMPONENTS ---

const GlassCard = ({ children, className = "", onClick }) => (
  <div onClick={onClick} className={`relative bg-white/40 backdrop-blur-3xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2rem] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:bg-white/50 transition-all duration-500 group ${className}`}>
    {/* Subtle gradient overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"></div>
    {children}
  </div>
);

const AIModal = ({ isOpen, onClose, title, content, loading }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/5 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white/80 backdrop-blur-3xl w-full max-h-[80%] rounded-[2.5rem] shadow-2xl border border-white/60 p-8 flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 z-10">
          <div className="flex items-center gap-2 text-[#7A9A83]">
            <Sparkles size={18} className="animate-pulse" />
            <h3 className="font-bold text-sm tracking-widest uppercase">Glauc AI</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-white/50 hover:bg-white transition-colors border border-white/20"><X size={18}/></button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-40 gap-4">
              <div className="w-12 h-12 border-4 border-[#7A9A83]/20 border-t-[#7A9A83] rounded-full animate-spin"></div>
              <p className="text-xs text-gray-500 font-medium animate-pulse tracking-wide uppercase">Analyzing Biomarkers...</p>
            </div>
          ) : (
            <div>
              <h4 className="text-2xl font-serif text-[#2D3630] mb-4 font-medium">{title}</h4>
              <p className="text-base text-gray-600 leading-relaxed whitespace-pre-wrap font-light">{content}</p>
            </div>
          )}
        </div>

        {/* Decorative Background */}
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-br from-[#7A9A83]/20 to-transparent rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

const PhoneFrame = ({ children }) => (
  <div className="relative mx-auto border-white/40 bg-white/20 backdrop-blur-sm border-[8px] rounded-[3.5rem] h-[720px] w-[350px] shadow-[0_50px_100px_-20px_rgba(50,50,93,0.15)] flex flex-col overflow-hidden ring-1 ring-white/60 z-10">
    {/* Screen Reflection */}
    <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/40 via-transparent to-transparent rounded-[3rem] opacity-50"></div>
    
    {/* Buttons */}
    <div className="h-[32px] w-[3px] bg-white/50 absolute -left-[10px] top-[100px] rounded-l-lg backdrop-blur-md"></div>
    <div className="h-[46px] w-[3px] bg-white/50 absolute -left-[10px] top-[150px] rounded-l-lg backdrop-blur-md"></div>
    <div className="h-[64px] w-[3px] bg-white/50 absolute -right-[10px] top-[170px] rounded-r-lg backdrop-blur-md"></div>
    
    {/* Content */}
    <div className="rounded-[3rem] overflow-hidden w-full h-full bg-[#FAFCFB] relative shadow-inner">
      {children}
    </div>
  </div>
);

// --- APP CONTENT & MOCKS ---

const USER_DATA = {
  name: "Kyle",
  chronologicalAge: 34,
  ocularAge: 37,
  environment: { uv: "High", aqi: "Good" },
  biomarkers: {
    inflammation: { 
      id: "inf", title: "Inflammation", score: "Moderate", value: 65, color: "text-amber-700", bg: "bg-amber-50/80", bar: "bg-gradient-to-r from-amber-200 to-amber-500",
      description: "Markers indicate low-grade chronic inflammation affecting the ocular surface.", recommendation: "Introduce Omega-3 fatty acids and warm compresses twice daily."
    },
    oxidativeStress: { 
      id: "ox", title: "Oxidative Stress", score: "Optimal", value: 92, color: "text-emerald-700", bg: "bg-emerald-50/80", bar: "bg-gradient-to-r from-emerald-200 to-emerald-500",
      description: "Antioxidant capacity in tear film is functioning well.", recommendation: "Maintain current leafy green intake."
    },
    neurodegeneration: { 
      id: "neu", title: "Neurodegeneration", score: "Elevated", value: 45, color: "text-rose-700", bg: "bg-rose-50/80", bar: "bg-gradient-to-r from-rose-300 to-rose-600",
      description: "Elevated neurofilament light chain (NfL) equivalent detected. Correlates with early retinal ganglion cell stress.", recommendation: "Urgent: Consult ophthalmologist. Consider neuroprotective supplements (Citicoline)."
    }
  },
  habits: [
    { id: 1, text: "Take Omega-3 Supplement", category: "Nutrition", completed: false },
    { id: 2, text: "20-20-20 Rule (Screen Break)", category: "Lifestyle", completed: true },
    { id: 3, text: "Warm Compress (10 min)", category: "Treatment", completed: false },
  ]
};

// --- APP VIEWS ---

const DashboardView = ({ setView }) => (
  <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-32 h-full overflow-y-auto no-scrollbar bg-gradient-to-b from-[#F3F6F4] to-[#FFFFFF]">
    <div className="px-6 pt-8">
      <div className="flex justify-between items-center mb-10">
        <div className="w-10 h-10">
           <GlaucLogo className="w-full h-full" />
        </div>
        <div className="w-10 h-10 bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-50">
             <img src="https://i.pravatar.cc/100?img=12" alt="Kyle" />
          </div>
        </div>
      </div>

      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#7A9A83]/5 border border-[#7A9A83]/10 backdrop-blur-sm">
          <Sparkles size={12} className="text-[#7A9A83]" />
          <span className="text-[10px] font-bold tracking-widest text-[#7A9A83] uppercase">Daily Insight</span>
        </div>
        <h2 className="text-4xl font-serif text-[#2D3630] leading-tight font-light tracking-tight">
          Good morning, <br/><span className="italic font-normal text-[#2D3630]">Kyle</span>
        </h2>
      </div>
      
      {/* The Dial - Refined Aesthetic */}
      <div className="relative flex flex-col items-center justify-center py-4 mb-8">
        {/* Soft Glow Behind Dial */}
        <div className="absolute w-48 h-48 bg-[#7A9A83]/10 rounded-full blur-3xl"></div>
        <div className="w-64 h-64 rounded-full border border-white/60 flex items-center justify-center relative bg-gradient-to-b from-white/70 to-white/20 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(122,154,131,0.1)]">
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 240 240">
            <circle cx="120" cy="120" r="110" fill="none" stroke="#F0F2F1" strokeWidth="2" />
            <circle cx="120" cy="120" r="110" fill="none" stroke="#7A9A83" strokeWidth="4" strokeDasharray="691" strokeDashoffset="200" strokeLinecap="round" className="opacity-90" />
          </svg>
          <div className="text-center relative z-10">
            <div className="text-[9px] font-bold text-[#7A9A83] uppercase tracking-[0.3em] mb-3 opacity-80">Ocular Age</div>
            <div className="text-8xl font-serif text-[#2D3630] font-light tracking-tighter leading-none">37</div>
            <div className="text-sm text-gray-400 mt-3 font-light tracking-wide">Actual Age: 34</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-10">
        <div className="bg-rose-50/60 text-rose-700 px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm border border-rose-100/50 backdrop-blur-md">
          <TrendingUp size={14} /> Aging +3 years faster
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-white/50 backdrop-blur-xl p-5 rounded-[2rem] shadow-sm border border-white/60 flex flex-col items-center hover:bg-white/70 transition-colors">
           <Sun size={22} className="text-amber-400/80 mb-2" />
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">UV Index</span>
           <span className="text-lg font-serif text-[#2D3630]">High</span>
        </div>
        <div className="flex-1 bg-white/50 backdrop-blur-xl p-5 rounded-[2rem] shadow-sm border border-white/60 flex flex-col items-center hover:bg-white/70 transition-colors">
           <Wind size={22} className="text-emerald-400/80 mb-2" />
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Air Quality</span>
           <span className="text-lg font-serif text-[#2D3630]">Good</span>
        </div>
      </div>

      <button onClick={() => setView('results')} className="w-full bg-white/70 backdrop-blur-2xl p-6 rounded-[2rem] shadow-lg shadow-gray-100/50 border border-white/80 flex items-center gap-5 mb-4 transform active:scale-[0.98] transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 group">
        <div className="w-14 h-14 bg-[#7A9A83] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#7A9A83]/20 group-hover:scale-105 transition-transform"><Activity size={24} strokeWidth={1.5}/></div>
        <div>
          <div className="text-base font-serif text-[#2D3630]">Biomarkers</div>
          <div className="text-xs text-gray-500 mt-1 font-light">3 indicators require attention</div>
        </div>
        <ChevronRight className="ml-auto text-gray-300 group-hover:text-[#7A9A83] transition-colors" size={20} />
      </button>
    </div>
  </div>
);

const PlanView = ({ setAI }) => {
  const [habits, setHabits] = useState(USER_DATA.habits);
  const toggleHabit = (id) => setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  
  const handleAI = () => {
    setAI({
      title: "AI Optimized Plan",
      prompt: "Generate a specific daily vision care plan..."
    });
  };

  return (
    <div className="px-6 pt-8 pb-32 animate-in slide-in-from-right-8 duration-700 h-full overflow-y-auto no-scrollbar bg-[#FAFCFB]">
      <h2 className="text-4xl font-serif text-[#2D3630] mb-2 font-light">Vision Plan</h2>
      <p className="text-gray-500 mb-8 text-sm font-light">Daily actions tailored to your biomarkers.</p>
      
      <button 
        onClick={handleAI}
        className="w-full mb-8 bg-gradient-to-r from-[#2D3630] to-[#45524A] text-white p-5 rounded-[2rem] flex items-center justify-center gap-3 shadow-xl shadow-[#2D3630]/10 active:scale-[0.98] transition-all hover:scale-[1.01] hover:shadow-2xl hover:shadow-[#2D3630]/20"
      >
        <Sparkles size={18} /> <span className="font-bold text-sm tracking-wide">AI Optimize Plan</span>
      </button>

      <div className="space-y-4">
        {habits.map((habit) => (
          <GlassCard key={habit.id} onClick={() => toggleHabit(habit.id)} className={`p-6 flex items-center gap-5 transition-all duration-500 cursor-pointer ${habit.completed ? 'opacity-50 bg-[#7A9A83]/5 grayscale' : 'hover:bg-white/80 hover:-translate-y-1'}`}>
            <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-colors duration-300 ${habit.completed ? 'bg-[#7A9A83] border-[#7A9A83] text-white' : 'border-gray-200 text-transparent'}`}><CheckSquare size={18} fill="currentColor" /></div>
            <div className="flex-1"><h4 className={`font-serif text-[#2D3630] text-lg ${habit.completed ? 'line-through text-gray-400' : ''}`}>{habit.text}</h4><p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-bold">{habit.category}</p></div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

const ResultsView = ({ setView, setAI }) => {
  const [selectedBio, setSelectedBio] = useState(null);
  
  const handleAIExplain = (bio) => {
    setAI({
      title: `AI Analysis: ${bio.title}`,
      prompt: `Explain the biomarker '${bio.title}'...`
    });
  };

  if (selectedBio) {
    const data = USER_DATA.biomarkers[selectedBio];
    return (
      <div className="px-6 pt-8 pb-32 animate-in slide-in-from-right-8 duration-500 min-h-full h-full overflow-y-auto no-scrollbar bg-[#FAFCFB]">
        <button onClick={() => setSelectedBio(null)} className="flex items-center gap-2 text-gray-400 mb-8 hover:text-[#2D3630] transition-colors group"><ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /><span className="text-sm font-bold tracking-wide">BACK</span></button>
        <h2 className="text-5xl font-serif text-[#2D3630] mb-4 font-light">{data.title}</h2>
        <div className={`inline-flex px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8 ${data.bg} ${data.color} backdrop-blur-sm`}>{data.score} Levels</div>
        
        <button 
          onClick={() => handleAIExplain(data)}
          className="mb-8 flex items-center gap-2 text-xs font-bold text-[#7A9A83] bg-[#7A9A83]/10 px-6 py-4 rounded-2xl hover:bg-[#7A9A83]/20 transition-all w-full justify-center border border-[#7A9A83]/20"
        >
          <Sparkles size={16} /> ✨ ANALYZE WITH AI
        </button>

        <div className="space-y-5">
           <GlassCard className="p-8"><h4 className="font-bold text-[#2D3630]/40 mb-4 text-xs uppercase tracking-[0.2em]">Analysis</h4><p className="text-[#2D3630] leading-relaxed text-base font-light">{data.description}</p></GlassCard>
           <div className="bg-[#2D3630] p-8 rounded-[2.5rem] text-white shadow-2xl"><h4 className="font-bold mb-4 text-xs uppercase tracking-[0.2em] opacity-60 flex items-center gap-2"><CheckCircle2 size={14} /> Action Plan</h4><p className="leading-relaxed font-light text-base opacity-90">{data.recommendation}</p></div>
        </div>
      </div>
    );
  }
  return (
    <div className="px-6 pt-8 pb-32 animate-in slide-in-from-right-8 duration-700 h-full overflow-y-auto no-scrollbar bg-[#FAFCFB]">
      <h2 className="text-4xl font-serif text-[#2D3630] mb-8 font-light">Biomarker <br/>Analysis</h2>
      <div className="space-y-4">
        {Object.entries(USER_DATA.biomarkers).map(([key, data]) => (
          <button key={key} onClick={() => setSelectedBio(key)} className="w-full text-left group">
            <GlassCard className="p-6 transition-all duration-500 group-hover:bg-white/80 group-hover:shadow-lg group-hover:-translate-y-1"><div className="flex justify-between items-start mb-4"><div><h3 className="capitalize font-serif text-[#2D3630] text-xl mb-1">{data.title}</h3><p className="text-xs text-gray-400 font-medium tracking-wide">TAP FOR DETAILS</p></div><span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${data.bg} ${data.color}`}>{data.score}</span></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-1"><div className={`h-full rounded-full ${data.bar}`} style={{ width: `${data.value}%` }}></div></div></GlassCard>
          </button>
        ))}
      </div>
    </div>
  );
};

const GlaucAppMockup = () => {
  const [activeTab, setActiveTab] = useState('home');
  // AI STATE
  const [aiModal, setAiModal] = useState({ isOpen: false, title: "", content: "", loading: false });

  const triggerAI = async ({ title, prompt }) => {
    setAiModal({ isOpen: true, title, content: "", loading: true });
    // Use the SERVER CALL function here
    const text = await callServerAI(prompt);
    setAiModal({ isOpen: true, title, content: text, loading: false });
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <DashboardView setView={setActiveTab} />;
      case 'plan': return <PlanView setAI={triggerAI} />;
      case 'results': return <ResultsView setView={setActiveTab} setAI={triggerAI} />;
      default: return <DashboardView setView={setActiveTab} />;
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full w-full bg-[#FAFCFB] relative font-sans text-slate-800">
        {/* AI Modal Overlay */}
        <AIModal 
          isOpen={aiModal.isOpen} 
          onClose={() => setAiModal({ ...aiModal, isOpen: false })} 
          title={aiModal.title}
          content={aiModal.content}
          loading={aiModal.loading}
        />

        {/* View Content */}
        {renderContent()}

        {/* Bottom Nav */}
        <div className="absolute bottom-8 left-6 right-6 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] border border-white/60 flex justify-between items-center px-10 z-30">
           <button onClick={() => setActiveTab('home')} className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === 'home' ? 'text-[#2D3630] bg-gray-100/50' : 'text-gray-300 hover:text-gray-400'}`}><Activity size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} /></button>
           <button onClick={() => setActiveTab('plan')} className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === 'plan' ? 'text-[#2D3630] bg-gray-100/50' : 'text-gray-300 hover:text-gray-400'}`}><ListTodo size={24} strokeWidth={activeTab === 'plan' ? 2.5 : 2} /></button>
           <button onClick={() => setActiveTab('results')} className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === 'results' ? 'text-[#2D3630] bg-gray-100/50' : 'text-gray-300 hover:text-gray-400'}`}><FileText size={24} strokeWidth={activeTab === 'results' ? 2.5 : 2} /></button>
        </div>
      </div>
    </PhoneFrame>
  );
};

// --- SECTIONS ---

const Navbar = () => (
  <nav className="fixed w-full z-50 top-0 transition-all duration-300">
    <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border-b border-white/20"></div>
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
      <div className="flex items-center justify-between h-28">
        {/* Logo */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 transition-transform duration-500 group-hover:scale-105">
             <GlaucLogo className="w-full h-full drop-shadow-sm" />
          </div>
          <span className="text-3xl font-serif text-[#2D3630] mt-1 font-normal tracking-tight">Glauc</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 bg-white/20 backdrop-blur-3xl px-3 py-3 rounded-full border border-white/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-500">
          <a href="#how-it-works" className="px-6 py-2.5 rounded-full text-sm font-medium text-[#2D3630]/80 hover:bg-white/40 transition-all tracking-wide">How it Works</a>
          <a href="#science" className="px-6 py-2.5 rounded-full text-sm font-medium text-[#2D3630]/80 hover:bg-white/40 transition-all tracking-wide">Science</a>
          <button className="bg-[#2D3630] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#3E4A42] transition-all shadow-xl shadow-[#2D3630]/10 ml-2 tracking-wide transform hover:scale-[1.02]">
            Order Kit
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-4 text-[#2D3630] bg-white/40 rounded-full backdrop-blur-md border border-white/30 hover:bg-white/60 transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  return (
    <div className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center bg-[#F3F6F4]">
      {/* ORGANIC BACKGROUND SHAPES (Parallax) - Slower, larger, softer */}
      <ParallaxBlob speed={0.1} className="top-[-20%] right-[-10%] w-[1400px] h-[1400px] bg-gradient-to-br from-[#E8F0EB] to-[#F3F6F4] rounded-full blur-[150px] opacity-80" />
      <ParallaxBlob speed={-0.05} className="bottom-[-10%] left-[-20%] w-[1000px] h-[1000px] bg-gradient-to-tr from-[#F0FDF4] to-[#F3F6F4] rounded-full blur-[120px] opacity-70" />
      
      {/* Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="max-w-xl">
            <ScrollReveal direction="up">
              {/* Refined Ocular Diagnostics Headline */}
              <h3 className="text-lg font-bold text-[#7A9A83] uppercase tracking-[0.25em] mb-6 flex items-center gap-3 opacity-80">
                <span className="w-12 h-[1px] bg-[#7A9A83]"></span>
                Ocular Diagnostics
              </h3>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <h1 className="text-7xl lg:text-[6rem] font-serif font-light text-[#2D3630] leading-[1.05] mb-10 -ml-1 tracking-tight">
                At your <br/>
                <span className="italic text-[#7A9A83]">fingertips.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <p className="text-xl text-[#5C7A65] mb-14 leading-relaxed font-light max-w-md">
                Discover your eyes' biological age with clinical-grade precision. Simple, at-home, and powered by Harvard AI.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={600}>
              <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                <button className="bg-[#2D3630] text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-[#3E4A42] hover:scale-105 transition-all shadow-2xl shadow-[#2D3630]/20 flex items-center justify-center gap-4 w-full sm:w-auto group">
                  Get Your Score <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4 px-2 py-2">
                   <div className="flex -space-x-4">
                     {[1,2,3].map(i => (
                       <div key={i} className="w-12 h-12 rounded-full border-[3px] border-[#F3F6F4] bg-white overflow-hidden shadow-sm transition-transform hover:-translate-y-1">
                         <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" className="grayscale opacity-80 hover:grayscale-0 transition-all" />
                       </div>
                     ))}
                   </div>
                   <span className="text-sm font-medium text-[#5C7A65] tracking-wide">Join 2,000+ others</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="relative h-[900px] flex items-center justify-center lg:translate-x-16">
            <ScrollReveal delay={500} direction="up" className="relative z-20">
               {/* Embed The Live App Mockup */}
               <GlaucAppMockup />
            </ScrollReveal>
            
            <ParallaxBlob speed={-0.03} className="absolute top-1/4 -left-20 z-30">
              <GlassCard className="p-6 flex items-center gap-5 animate-[bounce_8s_infinite] border-white/70">
                <div className="w-14 h-14 bg-[#7A9A83] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#7A9A83]/20"><ShieldCheck size={26} strokeWidth={1.5} /></div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#7A9A83] tracking-widest mb-1">Harvard AI</p>
                  <p className="text-base font-serif text-[#2D3630]">Clinically Verified</p>
                </div>
              </GlassCard>
            </ParallaxBlob>
          </div>

        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <ScrollReveal delay={delay}>
    <GlassCard className="group p-12 h-full hover:bg-white/80 transition-all duration-700 hover:-translate-y-4 border-white/50">
      <div className="w-20 h-20 rounded-[2rem] bg-[#F3F6F4] flex items-center justify-center text-[#7A9A83] mb-10 group-hover:bg-[#2D3630] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:shadow-[#2D3630]/20">
        <Icon size={36} strokeWidth={1.2} />
      </div>
      <h3 className="text-3xl font-serif text-[#2D3630] mb-5 font-light leading-tight">{title}</h3>
      <p className="text-[#5C7A65] text-base leading-relaxed font-light">
        {desc}
      </p>
    </GlassCard>
  </ScrollReveal>
);

const Features = () => (
  <section id="how-it-works" className="py-40 relative bg-white overflow-hidden">
    <ParallaxBlob speed={0.1} className="top-0 left-[-20%] w-[1200px] h-[1200px] bg-[#F5F7F6] rounded-full blur-[150px]" />
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-32">
          <span className="text-[#7A9A83] text-xs font-bold uppercase tracking-[0.25em] mb-8 block opacity-80">The Process</span>
          <h2 className="text-6xl lg:text-7xl font-serif text-[#2D3630] mb-8 font-light leading-tight">Precision diagnostics, <br/> <span className="italic text-[#7A9A83]">simplified.</span></h2>
          <p className="text-gray-500 text-xl font-light max-w-xl mx-auto leading-relaxed">No waiting rooms. No copays. Just clinical-grade insights from the comfort of your home.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <FeatureCard 
          delay={100}
          icon={Droplet}
          title="Collect Sample"
          desc="Use our patented tear strip to collect a sample in just 60 seconds. Painless, non-invasive, and safe."
        />
        <FeatureCard 
          delay={300}
          icon={Activity}
          title="Lab Analysis"
          desc="We analyze 7 key protein biomarkers linked to inflammation and neurodegeneration using our proprietary assay."
        />
        <FeatureCard 
          delay={500}
          icon={Globe}
          title="AI Insights"
          desc="Our model neutralizes socioeconomic factors to give you an unbiased 'Ocular Age' and actionable plan."
        />
      </div>
    </div>
  </section>
);

const ViralSection = () => (
  <section className="py-48 bg-[#2D3630] text-white overflow-hidden relative rounded-t-[5rem] -mt-20 z-20">
    <div className="absolute top-[-30%] left-[-10%] w-[1200px] h-[1200px] bg-[#7A9A83] rounded-full blur-[250px] opacity-20 animate-pulse"></div>
    <div className="absolute bottom-[-30%] right-[-10%] w-[1000px] h-[1000px] bg-rose-900 rounded-full blur-[200px] opacity-30"></div>
    
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
      <ScrollReveal>
        <h2 className="text-6xl lg:text-[7rem] font-serif mb-12 leading-[1.05] tracking-tight">"I'm 26, but my <br/> <span className="italic text-[#7A9A83]">eyes are 34.</span>"</h2>
        <p className="text-2xl text-gray-400 max-w-3xl mx-auto mb-24 font-light leading-relaxed">
          Don't let silent damage steal your vision. Join thousands discovering their true Ocular Age.
        </p>
      </ScrollReveal>
      <div className="grid md:grid-cols-3 gap-8 mb-32">
        {[
          { user: "@alex_biohacker", text: "Thought my vision was perfect. The Glauc test caught inflammation I didn't feel.", age: "34 → 41" },
          { user: "@sarah.creative", text: "As an artist, losing my sight is my biggest fear. This gave me peace of mind.", age: "28 → 26" },
          { user: "@tech_reviews", text: "The most advanced health tech I've tested this year. The unboxing alone is next level.", age: "31 → 32" }
        ].map((review, i) => (
          <ScrollReveal key={i} delay={i * 150}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 text-left hover:bg-white/10 transition-all hover:-translate-y-3 cursor-default hover:shadow-2xl hover:shadow-[#7A9A83]/10">
              <div className="flex justify-between items-start mb-8">
                <div className="font-bold text-[#7A9A83] tracking-wide text-sm">{review.user}</div>
                <div className="text-xs font-mono bg-white/10 px-4 py-2 rounded-xl text-white/80 border border-white/5">{review.age}</div>
              </div>
              <p className="text-xl text-gray-300 font-light leading-relaxed">"{review.text}"</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal delay={500}>
        <button className="bg-white text-[#2D3630] px-16 py-7 rounded-full font-bold text-xl hover:bg-[#7A9A83] hover:text-white transition-all transform hover:scale-105 shadow-2xl flex items-center gap-4 mx-auto group">
          Join the Waitlist <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </ScrollReveal>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white py-32 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-20">
        <div className="flex flex-col gap-8 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
               <GlaucLogo className="w-full h-full" />
            </div>
            <span className="text-3xl font-serif text-[#2D3630]">Glauc</span>
          </div>
          <p className="text-gray-400 text-base max-w-xs font-light leading-relaxed">See the future before it fades.</p>
        </div>
        <div className="flex gap-20 text-sm font-medium text-gray-500">
          <div className="flex flex-col gap-6">
             <a href="#" className="hover:text-[#7A9A83] transition-colors">Privacy</a>
             <a href="#" className="hover:text-[#7A9A83] transition-colors">Terms</a>
          </div>
          <div className="flex flex-col gap-6">
             <a href="#" className="hover:text-[#7A9A83] transition-colors">Research</a>
             <a href="#" className="hover:text-[#7A9A83] transition-colors">Contact</a>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-300 mt-24 text-center md:text-left font-light border-t border-gray-50 pt-10">
        © 2025 Glauc Technologies Inc. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function GlaucWebsite() {
  return (
    <div className="font-sans text-slate-900 bg-[#FAFCFB] selection:bg-[#7A9A83] selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <ViralSection />
      <Footer />
    </div>
  );
}