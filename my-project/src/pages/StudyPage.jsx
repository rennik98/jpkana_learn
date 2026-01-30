import React, { useMemo } from 'react';
import { Volume2, PenTool, LayoutGrid, Hash, Languages } from 'lucide-react';
import { NUMBER_DATA } from '../data/kana';
import WordQuizFilter from '../components/WordQuizFilter';

const StudyPage = ({ 
  studyMode, 
  setStudyMode, 
  activeKana, 
  scriptType, 
  setWritingChar, 
  wordList, 
  onManageWords,
  showSettings,
  setShowSettings,
  selectedCategories,
  setSelectedCategories
}) => {
  // Use shared category logic
  const categories = useMemo(() => {
    return [...new Set(wordList.map(w => w.category || 'General'))].sort();
  }, [wordList]);

  const filteredWords = useMemo(() => {
    if (selectedCategories.length === 0) return wordList;
    return wordList.filter(w => selectedCategories.includes(w.category || 'General'));
  }, [wordList, selectedCategories]);

  const playSound = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      window.speechSynthesis.speak(utterance);
    }
  };

  const getDataList = () => {
    switch (studyMode) {
      case 'numbers': return NUMBER_DATA;
      case 'words': return filteredWords;
      default: return activeKana;
    }
  };

  const renderCardContent = (item) => {
    if (studyMode === 'kana') {
      return { main: scriptType === 'hiragana' ? item.hiragana : item.katakana, sub: item.romaji, meta: null };
    } else if (studyMode === 'numbers') {
      return { main: scriptType === 'hiragana' ? item.hiragana : item.katakana, sub: item.romaji, meta: item.value };
    } else {
      return { main: item.jp, sub: item.romaji, meta: item.en };
    }
  };

  const dataList = getDataList();

  return (
    <div className="h-full flex flex-col animate-fade-in relative">
      
      {/* Mode Selector Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-100 flex gap-1">
          <button onClick={() => setStudyMode('kana')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${studyMode === 'kana' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
            <LayoutGrid size={18} /> Characters
          </button>
          <button onClick={() => setStudyMode('numbers')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${studyMode === 'numbers' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
            <Hash size={18} /> Numbers
          </button>
          <button onClick={() => setStudyMode('words')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${studyMode === 'words' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
            <Languages size={18} /> Words
          </button>
        </div>
      </div>

      {/* Word Filter Integration */}
      {studyMode === 'words' && (
        <WordQuizFilter 
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onManageWords={onManageWords}
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          isStudyMode={true} 
        />
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-20" onClick={() => setShowSettings(false)}>
        {dataList.map((item, idx) => {
          const content = renderCardContent(item);
          return (
            <div key={idx} className="group bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 flex flex-col items-center relative">
              {content.meta && (
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 bg-slate-50 px-2 py-1 rounded-lg">{content.meta}</span>
                </div>
              )}
              <div className="flex-1 flex items-center justify-center min-h-[5rem]">
                <span className={`font-bold text-slate-800 ${studyMode === 'words' ? 'text-2xl' : 'text-5xl'}`}>{content.main}</span>
              </div>
              <div className="mb-4">
                <span className="text-sm font-bold text-slate-400 group-hover:text-red-500 transition-colors">{content.sub}</span>
              </div>
              <div className="flex gap-2 w-full">
                <button onClick={() => playSound(content.main)} className="flex-1 h-10 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-500 flex items-center justify-center transition-colors"><Volume2 size={18} /></button>
                {studyMode === 'kana' && (
                  <button onClick={() => setWritingChar(item)} className="flex-1 h-10 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors"><PenTool size={18} /></button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {dataList.length === 0 && (
        <div className="text-center py-20 text-slate-400 font-medium">No items found. Check your filter settings.</div>
      )}
    </div>
  );
};

export default StudyPage;