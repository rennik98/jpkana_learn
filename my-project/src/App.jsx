import React, { useState, useMemo } from 'react';
import { BookOpen, Brain, ClipboardCheck, Languages, Link2, Menu, Settings, X, Keyboard, GraduationCap } from 'lucide-react';

// Data
import { kanaData, KANA_ROWS, INITIAL_WORD_DATA } from './data/kana';

// Components
import SettingsModal from './components/SettingsModal';
import WordManagerModal from './components/WordManagerModal';
import WritingPad from './components/WritingPad';
import WorksheetGame from './components/WorksheetGame';
import LessonPage from './pages/LessonPage';

// Pages
import StudyPage from './pages/StudyPage';
import QuizPage from './pages/QuizPage';
import SpeedTypePage from './pages/SpeedTypePage';

export default function App() {
  const [activeTab, setActiveTab] = useState('study'); 
  const [scriptType, setScriptType] = useState('hiragana');
  const [showSettings, setShowSettings] = useState(false); // Global Kana Settings
  const [showWordSettings, setShowWordSettings] = useState(false); // New: Word Quiz Specific Settings
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [quizSubTab, setQuizSubTab] = useState('read');

  const [selectedRows, setSelectedRows] = useState(KANA_ROWS.map(r => r.id));
  const [wordList, setWordList] = useState(INITIAL_WORD_DATA);
  const [showWordManager, setShowWordManager] = useState(false);
  const [writingChar, setWritingChar] = useState(null);

  const activeKana = useMemo(() => {
    let result = [];
    KANA_ROWS.forEach(row => {
      if (selectedRows.includes(row.id)) {
        result = [...result, ...kanaData.slice(row.start, row.end)];
      }
    });
    return result.length > 0 ? result : kanaData.slice(0, 5);
  }, [selectedRows]);

  const toggleRow = (id) => {
    setSelectedRows(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter(r => r !== id);
      }
      return [...prev, id];
    });
  };

  const selectAllRows = () => setSelectedRows(KANA_ROWS.map(r => r.id));
  const deselectAllRows = () => setSelectedRows(['a']);

  const handleWritingNav = (direction) => {
    if (!writingChar) return;
    const currentIndex = activeKana.findIndex(k => k.romaji === writingChar.romaji);
    if (currentIndex === -1) return; 
    let nextIndex = currentIndex + direction;
    if (nextIndex >= activeKana.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = activeKana.length - 1;
    setWritingChar(activeKana[nextIndex]);
  };

  // Logic to determine if any Filter button should be visible
  const isControlsVisible = useMemo(() => {
    if (activeTab === 'study' || activeTab === 'speed' || activeTab === 'quiz') return true;
    return false;
  }, [activeTab]);

  const handleFilterClick = () => {
    if (activeTab === 'quiz' && quizSubTab === 'words') {
      setShowWordSettings(!showWordSettings);
    } else {
      setShowSettings(true);
    }
  };

  const navItems = [
    { id: 'study', icon: BookOpen, label: 'Study' },
    { id: 'quiz', icon: Brain, label: 'Quizzes' },
    { id: 'lesson', icon: GraduationCap, label: 'Lessons' },
    { id: 'speed', icon: Keyboard, label: 'Speed Type' },
    { id: 'connect', icon: Link2, label: 'Connect' },
  ];

  const getNavClass = (id, isMobile = false) => {
    const isActive = activeTab === id;
    const base = "flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200";
    const active = "bg-slate-900 text-white shadow-md";
    const inactive = "text-slate-500 hover:bg-slate-100 hover:text-slate-900";
    return `${base} ${isActive ? active : inactive} ${isMobile ? 'w-full text-lg' : ''}`;
  };

  return (
    <div className="flex h-[100dvh] w-full bg-slate-50 text-slate-800 font-sans selection:bg-red-100 overflow-hidden">
      <style>{`
        html, body, #root { height: 100%; width: 100%; margin: 0; padding: 0; overflow: hidden; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .animate-slide-in-left { animation: slideInLeft 0.3s ease-out forwards; }
      `}</style>

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
        selectedRows={selectedRows}
        toggleRow={toggleRow}
        selectAll={selectAllRows}
        deselectAll={deselectAllRows}
      />
      
      <WordManagerModal
        isOpen={showWordManager}
        onClose={() => setShowWordManager(false)}
        words={wordList}
        setWords={setWordList}
      />

      {writingChar && (
         <WritingPad 
            character={scriptType === 'hiragana' ? writingChar.hiragana : writingChar.katakana}
            romaji={writingChar.romaji}
            type={scriptType}
            onClose={() => setWritingChar(null)}
            onNext={() => handleWritingNav(1)}
            onPrev={() => handleWritingNav(-1)}
         />
      )}

      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 z-20 shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-red-200 shadow-lg">JP</div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Kana Dojo</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={getNavClass(item.id)}>
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>
        
        {/* Hide Script Toggle if on Word Quiz */}
        {isControlsVisible && (activeTab !== 'quiz' || quizSubTab !== 'words') && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 animate-fade-in">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Script Mode</div>
             <div className="flex gap-2 bg-slate-200/50 p-1 rounded-xl">
                <button onClick={() => setScriptType('hiragana')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${scriptType === 'hiragana' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>Hiragana</button>
                <button onClick={() => setScriptType('katakana')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${scriptType === 'katakana' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>Katakana</button>
             </div>
          </div>
        )}
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0 z-10">
           <div className="flex items-center gap-3 md:hidden">
             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"><Menu size={24} /></button>
             <span className="font-bold text-lg text-slate-800">{navItems.find(n => n.id === activeTab)?.label}</span>
           </div>
           <div className="hidden md:block">
             <h2 className="text-2xl font-bold text-slate-800">{navItems.find(n => n.id === activeTab)?.label}</h2>
             <p className="text-sm text-slate-400 font-medium">Master your Japanese skills</p>
           </div>
           <div className="flex items-center gap-2 md:gap-4">
              {isControlsVisible && (
                 <button onClick={handleFilterClick} className="flex items-center gap-2 p-2 md:px-4 md:py-2.5 rounded-full md:rounded-xl md:bg-slate-50 md:hover:bg-slate-100 md:border md:border-slate-200 text-slate-600 font-bold transition-colors animate-fade-in">
                    <Settings size={20} /> <span className="hidden md:inline">Filter</span>
                 </button>
              )}
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-50/50">
           <div className="max-w-5xl mx-auto min-h-full pb-20 md:pb-0 flex flex-col">
              {activeTab === 'study' && (
                <StudyPage activeKana={activeKana} scriptType={scriptType} setWritingChar={setWritingChar} />
              )}
              
              {activeTab === 'lesson' && <LessonPage />}
              
              {activeTab === 'quiz' && (
                <QuizPage 
                  activeKana={activeKana} 
                  scriptType={scriptType} 
                  wordList={wordList}
                  onManageWords={() => setShowWordManager(true)}
                  subTab={quizSubTab}
                  setSubTab={setQuizSubTab}
                  showSettings={showWordSettings} // Pass to child
                  setShowSettings={setShowWordSettings} // Pass to child
                />
              )}
              
              {activeTab === 'speed' && (
                <SpeedTypePage activeKana={activeKana} scriptType={scriptType} />
              )}
              
              {activeTab === 'connect' && (
                <WorksheetGame words={wordList} />
              )}
           </div>
        </main>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col animate-slide-in-left">
            <div className="p-6 flex justify-between items-center border-b border-slate-100">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">JP</div>
                  <h1 className="text-xl font-bold text-slate-900">Kana Dojo</h1>
               </div>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full"><X size={24} /></button>
            </div>
            <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
               {navItems.map(item => (
                  <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className={getNavClass(item.id, true)}>
                    <item.icon size={24} /> {item.label}
                  </button>
               ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}