import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle, XCircle, ArrowRight, Brain, ClipboardCheck, Languages, Quote, RefreshCw, PartyPopper } from 'lucide-react';
import { kanaData } from '../data/kana';

// Import Sibling Pages
import WriteQuizPage from './WriteQuizPage';
import WordQuizPage from './WordQuizPage';
import SentenceQuizPage from './SentenceQuizPage'; // Re-added import

const ReadQuiz = ({ activeKana, scriptType }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Unique Mode State
  const [uniqueMode, setUniqueMode] = useState(false);
  const [masteredIndices, setMasteredIndices] = useState([]);
  const [showCongrat, setShowCongrat] = useState(false);

  useEffect(() => {
    if (showCongrat) {
      const timer = setTimeout(() => setShowCongrat(false), 1000);
      const handleDismiss = () => setShowCongrat(false);
      window.addEventListener('mousedown', handleDismiss);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('mousedown', handleDismiss);
      };
    }
  }, [showCongrat]);

  useEffect(() => {
    setMasteredIndices([]);
    generateQuestion();
  }, [activeKana, uniqueMode]);

  const generateQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    
    const pool = activeKana.length > 0 ? activeKana : kanaData.slice(0, 5);
    let availableIndices = pool.map((_, i) => i);

    if (uniqueMode) {
      availableIndices = availableIndices.filter(i => !masteredIndices.includes(i));
      if (availableIndices.length === 0 && masteredIndices.length > 0) {
        setShowCongrat(true);
        setMasteredIndices([]);
        availableIndices = pool.map((_, i) => i);
      }
    }
    
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const correctItem = pool[randomIndex];
    
    const distractors = [];
    const distractorPool = pool.length >= 4 ? pool : kanaData;

    let attempts = 0;
    while (distractors.length < 3 && attempts < 100) {
      const dIndex = Math.floor(Math.random() * distractorPool.length);
      const potential = distractorPool[dIndex];
      if (potential.romaji !== correctItem.romaji && !distractors.includes(potential)) {
        distractors.push(potential);
      }
      attempts++;
    }
    
    const options = [correctItem, ...distractors].sort(() => Math.random() - 0.5);
    setCurrentQuestion({ item: correctItem, options: options, index: randomIndex });
  };

  const handleAnswer = (option) => {
    if (feedback) return;
    setSelectedOption(option);
    if (option.romaji === currentQuestion.item.romaji) {
      setFeedback('correct');
      setScore(s => s + 10);
      setStreak(s => s + 1);
      if (uniqueMode) setMasteredIndices(prev => [...prev, currentQuestion.index]);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  const poolSize = activeKana.length || 5;

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col pb-4 relative">
      {uniqueMode && showCongrat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="bg-slate-900/95 backdrop-blur-md text-white px-8 py-6 rounded-3xl shadow-2xl flex flex-col items-center gap-3 animate-fade-in border border-slate-700">
            <PartyPopper size={48} className="text-yellow-400 animate-bounce" />
            <span className="font-bold text-2xl tracking-tight">Set Cleared!</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-4 mb-2 shrink-0">
         <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
              <span className="text-xl font-bold text-slate-900 leading-none">{score}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                Streak <Trophy size={10} className="text-yellow-500" />
              </span>
              <span className="text-xl font-bold text-orange-500 leading-none">{streak}</span>
            </div>
            {uniqueMode && (
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Progress</span>
                <span className="text-xl font-bold text-blue-600 leading-none">{masteredIndices.length}/{poolSize}</span>
              </div>
            )}
         </div>
         <button 
           onClick={() => setUniqueMode(!uniqueMode)}
           className={`flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all border ${
             uniqueMode ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-100 text-slate-500 border-transparent'
           }`}
         >
           <RefreshCw size={12} className={uniqueMode ? 'animate-spin-slow' : ''} />
           {uniqueMode ? 'UNIQUE' : 'RANDOM'}
         </button>
      </div>

      {currentQuestion && (
        <div className="flex-1 bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col min-h-0">
          <div className="flex-1 bg-slate-50 flex items-center justify-center border-b border-slate-100 relative min-h-[120px]">
            <span className="text-8xl sm:text-9xl font-medium text-slate-800">
              {scriptType === 'hiragana' ? currentQuestion.item.hiragana : currentQuestion.item.katakana}
            </span>
          </div>
          <div className="p-4 sm:p-6 bg-white shrink-0 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option, idx) => {
                let buttonStyle = "bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600";
                if (feedback === 'correct') {
                  if (option.romaji === currentQuestion.item.romaji) buttonStyle = "bg-green-50 border-2 border-green-500 text-green-700 shadow-sm";
                  else buttonStyle = "opacity-40 border-slate-100 bg-slate-50";
                } else if (feedback === 'incorrect') {
                   if (option.romaji === currentQuestion.item.romaji) buttonStyle = "bg-green-50 border-2 border-green-500 text-green-700 shadow-sm";
                   else if (selectedOption?.romaji === option.romaji) buttonStyle = "bg-red-50 border-2 border-red-500 text-red-700 shadow-sm";
                   else buttonStyle = "opacity-40 border-slate-100 bg-slate-50";
                }
                return (
                  <button key={idx} onClick={() => handleAnswer(option)} disabled={!!feedback} className={`h-14 rounded-xl text-xl font-bold transition-all duration-200 ${buttonStyle}`}>
                    {option.romaji}
                  </button>
                );
              })}
            </div>
            <div className={`transition-all duration-300 overflow-hidden ${feedback ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
               <div className={`p-3 rounded-xl flex items-center justify-between ${feedback === 'correct' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                  <div className="flex items-center gap-2 font-bold">{feedback === 'correct' ? <CheckCircle size={20} /> : <XCircle size={20} />} {feedback === 'correct' ? 'Correct!' : 'Incorrect'}</div>
                  <button onClick={generateQuestion} className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-bold hover:shadow-md transition-all flex items-center gap-2 text-slate-800">Next <ArrowRight size={14} /></button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Container
const QuizPage = ({ activeKana, scriptType, wordList, onManageWords, subTab, setSubTab, showSettings, setShowSettings }) => {
  const getTabClass = (id) => `flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${subTab === id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`;
  
  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="flex justify-center mb-4 shrink-0">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 flex gap-1">
          <button onClick={() => setSubTab('read')} className={getTabClass('read')}><Brain size={16} /> Read</button>
          <button onClick={() => setSubTab('write')} className={getTabClass('write')}><ClipboardCheck size={16} /> Write</button>
          <button onClick={() => setSubTab('words')} className={getTabClass('words')}><Languages size={16} /> Words</button>
          <button onClick={() => setSubTab('sentences')} className={getTabClass('sentences')}><Quote size={16} /> Sentences</button>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        {subTab === 'read' && <ReadQuiz activeKana={activeKana} scriptType={scriptType} />}
        {subTab === 'write' && <WriteQuizPage activeKana={activeKana} scriptType={scriptType} />}
        {subTab === 'words' && (
          <WordQuizPage 
            wordList={wordList} 
            onManageWords={onManageWords} 
            showSettings={showSettings} 
            setShowSettings={setShowSettings} 
          />
        )}
        {subTab === 'sentences' && <SentenceQuizPage />}
      </div>
    </div>
  );
};

export default QuizPage;