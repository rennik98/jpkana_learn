import React, { useState, useEffect, useMemo } from 'react';
import { Trophy, CheckCircle, XCircle, ArrowRight, RefreshCw, PartyPopper } from 'lucide-react';
import { INITIAL_WORD_DATA } from '../data/kana';
import WordQuizFilter from '../components/WordQuizFilter';

const WordQuizPage = ({ wordList = INITIAL_WORD_DATA, onManageWords, showSettings, setShowSettings }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Quiz Configuration States
  const [mode, setMode] = useState('jp-en');
  const [difficulty, setDifficulty] = useState('easy');
  const [uniqueMode, setUniqueMode] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Mastery States
  const [masteredIndices, setMasteredIndices] = useState([]); 
  const [showCongrat, setShowCongrat] = useState(false);

  // Auto-hide congratulations
  useEffect(() => {
    if (showCongrat) {
      const timer = setTimeout(() => setShowCongrat(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [showCongrat]);

  // Derived Data
  const categories = useMemo(() => {
    return [...new Set(wordList.map(w => w.category || 'General'))].sort();
  }, [wordList]);

  const filteredWords = useMemo(() => {
    const pool = wordList.length > 0 ? wordList : INITIAL_WORD_DATA;
    if (selectedCategories.length === 0) return pool;
    return pool.filter(w => selectedCategories.includes(w.category || 'General'));
  }, [wordList, selectedCategories]);

  // Reset and generate when filters change
  useEffect(() => {
    setMasteredIndices([]);
    generateQuestion();
  }, [filteredWords, mode, uniqueMode]);

  const generateQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    const pool = filteredWords;
    let availableIndices = pool.map((_, i) => i);

    if (uniqueMode) {
      availableIndices = availableIndices.filter(i => !masteredIndices.includes(i));
      if (availableIndices.length === 0 && masteredIndices.length > 0) {
        setShowCongrat(true);
        setMasteredIndices([]); 
        availableIndices = pool.map((_, i) => i);
      }
    }

    if (availableIndices.length === 0) return;

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const correctItem = pool[randomIndex];
    
    const distractors = [];
    const distractorPool = pool.length >= 4 ? pool : INITIAL_WORD_DATA;
    let attempts = 0;
    while (distractors.length < 3 && attempts < 100) {
      const dIndex = Math.floor(Math.random() * distractorPool.length);
      const potential = distractorPool[dIndex];
      const isUnique = mode === 'jp-en' ? potential.en !== correctItem.en : potential.jp !== correctItem.jp;
      if (isUnique && !distractors.includes(potential)) distractors.push(potential);
      attempts++;
    }
    
    const options = [correctItem, ...distractors].sort(() => Math.random() - 0.5);
    setCurrentQuestion({ item: correctItem, options, index: randomIndex });
  };

  const handleAnswer = (option) => {
    if (feedback) return;
    setSelectedOption(option);
    const isCorrect = mode === 'jp-en' ? option.en === currentQuestion.item.en : option.jp === currentQuestion.item.jp;
    
    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 10);
      setStreak(s => s + 1);
      if (uniqueMode) setMasteredIndices(prev => [...prev, currentQuestion.index]);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col pb-4 animate-fade-in relative">
      
      {uniqueMode && showCongrat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="bg-slate-900/95 backdrop-blur-md text-white px-8 py-6 rounded-3xl shadow-2xl flex flex-col items-center gap-3 animate-pop-in border border-slate-700">
            <PartyPopper size={48} className="text-yellow-400 animate-bounce" />
            <span className="font-bold text-2xl tracking-tight">Set Mastered!</span>
          </div>
        </div>
      )}

      {/* Stats Header */}
      <header className="flex items-center justify-between px-4 mb-4 shrink-0">
        <div className="flex items-center gap-6">
           <div className="flex flex-col">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
             <span className="text-xl font-bold text-slate-900 leading-none">{score}</span>
           </div>
           <div className="flex flex-col">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Streak</span>
             <span className="text-xl font-bold text-orange-500 leading-none">{streak}</span>
           </div>
           {uniqueMode && (
             <div className="flex flex-col">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mastery</span>
               <span className="text-xl font-bold text-blue-600 leading-none">{masteredIndices.length}/{filteredWords.length}</span>
             </div>
           )}
        </div>

        <button 
          onClick={() => setUniqueMode(!uniqueMode)}
          className={`flex items-center gap-2 p-2 md:px-4 md:py-2.5 rounded-full md:rounded-xl border transition-all font-bold text-xs ${
            uniqueMode ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}
        >
          <RefreshCw size={18} className={uniqueMode ? 'animate-spin-slow' : ''} />
          <span className="hidden md:inline">{uniqueMode ? 'UNIQUE' : 'RANDOM'}</span>
        </button>
      </header>

      {/* Separated Filter Component */}
      <WordQuizFilter 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onManageWords={onManageWords}
        mode={mode}
        setMode={setMode}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      {/* Main Quiz Card */}
      {currentQuestion && (
        <div 
          className="flex-1 bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col min-h-0" 
          onClick={() => setShowSettings(false)}
        >
          <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center border-b border-slate-100 relative min-h-[140px] p-6 text-center">
            <span className="text-5xl sm:text-7xl font-bold text-slate-800 mb-2">
              {mode === 'jp-en' ? currentQuestion.item.jp : currentQuestion.item.en}
            </span>
            {mode === 'jp-en' && difficulty === 'easy' && (
              <span className="text-lg text-slate-400 font-bold tracking-widest uppercase">
                {currentQuestion.item.romaji}
              </span>
            )}
          </div>
          
          <div className="p-4 sm:p-6 bg-white shrink-0 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, idx) => {
                let answerText = mode === 'jp-en' ? option.en : (difficulty === 'easy' ? `${option.jp} (${option.romaji})` : option.jp);
                let buttonStyle = "bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600";
                
                if (feedback) {
                   const isCorrectOpt = mode === 'jp-en' ? option.en === currentQuestion.item.en : option.jp === currentQuestion.item.jp;
                   const isSelected = selectedOption === option;
                   if (feedback === 'correct') {
                     if (isCorrectOpt) buttonStyle = "bg-green-50 border-2 border-green-500 text-green-700 shadow-sm";
                     else buttonStyle = "opacity-40 border-slate-100 bg-slate-50";
                   } else if (feedback === 'incorrect') {
                     if (isCorrectOpt) buttonStyle = "bg-green-50 border-2 border-green-500 text-green-700 shadow-sm";
                     else if (isSelected) buttonStyle = "bg-red-50 border-2 border-red-500 text-red-700 shadow-sm";
                     else buttonStyle = "opacity-40 border-slate-100 bg-slate-50";
                   }
                }
                return (
                  <button 
                    key={idx} 
                    onClick={(e) => { e.stopPropagation(); handleAnswer(option); }} 
                    disabled={!!feedback} 
                    className={`h-14 sm:h-16 px-4 rounded-xl text-lg font-bold transition-all duration-200 flex items-center justify-center ${buttonStyle}`}
                  >
                    {answerText}
                  </button>
                );
              })}
            </div>

            <div className={`transition-all duration-300 overflow-hidden ${feedback ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
               <div className={`p-4 rounded-2xl flex items-center justify-between ${feedback === 'correct' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                  <div className="flex items-center gap-2 font-bold text-lg">
                    {feedback === 'correct' ? <><CheckCircle size={24} /> Correct!</> : <><XCircle size={24} /> Incorrect</>}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); generateQuestion(); }} 
                    className="px-5 py-2.5 bg-white rounded-xl shadow-md text-sm font-bold hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 text-slate-800"
                  >
                    Next Word <ArrowRight size={16} />
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordQuizPage;