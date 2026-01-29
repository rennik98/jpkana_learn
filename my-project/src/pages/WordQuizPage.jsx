import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle, XCircle, ArrowRight, Settings2, Gauge } from 'lucide-react';
import { INITIAL_WORD_DATA } from '../data/kana';

const WordQuizPage = ({ wordList = INITIAL_WORD_DATA, onManageWords }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Settings
  const [mode, setMode] = useState('jp-en'); // 'jp-en' or 'en-jp'
  const [difficulty, setDifficulty] = useState('easy'); // 'easy' or 'normal'

  useEffect(() => {
    generateQuestion();
  }, [wordList, mode]);

  const generateQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    
    const pool = wordList.length > 0 ? wordList : INITIAL_WORD_DATA;
    const randomIndex = Math.floor(Math.random() * pool.length);
    const correctItem = pool[randomIndex];
    
    const distractors = [];
    const distractorPool = pool.length >= 4 ? pool : INITIAL_WORD_DATA;

    let attempts = 0;
    while (distractors.length < 3 && attempts < 100) {
      const dIndex = Math.floor(Math.random() * distractorPool.length);
      const potential = distractorPool[dIndex];
      // Check uniqueness based on the answer type
      const isUnique = mode === 'jp-en' 
         ? potential.en !== correctItem.en 
         : potential.jp !== correctItem.jp;
         
      if (isUnique && !distractors.includes(potential)) {
        distractors.push(potential);
      }
      attempts++;
    }
    
    const options = [correctItem, ...distractors].sort(() => Math.random() - 0.5);
    setCurrentQuestion({ item: correctItem, options: options });
  };

  const handleAnswer = (option) => {
    if (feedback) return;
    setSelectedOption(option);
    
    const isCorrect = mode === 'jp-en' 
      ? option.en === currentQuestion.item.en
      : option.jp === currentQuestion.item.jp;

    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 10);
      setStreak(s => s + 1);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col pb-4 animate-fade-in">
      
      {/* Header Controls */}
      <div className="flex items-center justify-between px-4 mb-2 shrink-0">
        <div className="flex items-center gap-4 sm:gap-6">
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
        </div>
        
        <div className="flex gap-2">
           {/* Difficulty Toggle */}
           <button 
             onClick={() => setDifficulty(d => d === 'easy' ? 'normal' : 'easy')}
             className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors border ${
                difficulty === 'easy' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-red-50 text-red-700 border-red-200'
             }`}
           >
             <Gauge size={14} />
             {difficulty === 'easy' ? 'Easy' : 'Normal'}
           </button>

           {/* Mode Toggle */}
           <button 
             onClick={() => setMode(m => m === 'jp-en' ? 'en-jp' : 'jp-en')}
             className="text-xs font-bold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
           >
             {mode === 'jp-en' ? '🇯🇵 → 🇺🇸' : '🇺🇸 → 🇯🇵'}
           </button>
           
           <button 
             onClick={onManageWords}
             className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors"
           >
             <Settings2 size={18} />
           </button>
        </div>
      </div>

      {currentQuestion && (
        <div className="flex-1 bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col min-h-0">
          
          {/* 1. FLEXIBLE QUESTION AREA */}
          <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center border-b border-slate-100 relative min-h-[120px] p-6 text-center">
            <span className="text-4xl sm:text-6xl font-bold text-slate-800 mb-2">
              {mode === 'jp-en' ? currentQuestion.item.jp : currentQuestion.item.en}
            </span>
            
            {/* Show Romaji only if Mode is JP->EN AND Difficulty is Easy */}
            {mode === 'jp-en' && difficulty === 'easy' && (
               <span className="text-lg text-slate-400 font-bold">{currentQuestion.item.romaji}</span>
            )}
          </div>

          {/* 2. BOTTOM OPTIONS AREA */}
          <div className="p-4 sm:p-6 bg-white shrink-0 flex flex-col gap-4">
            <h3 className="text-center text-slate-400 font-bold uppercase tracking-wider text-xs">
              {mode === 'jp-en' ? 'Choose the meaning' : 'Choose the matching word'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, idx) => {
                // Determine Button Text based on Mode and Difficulty
                let answerText;
                if (mode === 'jp-en') {
                    // Answer is English (no romaji needed)
                    answerText = option.en;
                } else {
                    // Answer is Japanese
                    if (difficulty === 'easy') {
                        answerText = `${option.jp} (${option.romaji})`;
                    } else {
                        answerText = option.jp;
                    }
                }
                
                let buttonStyle = "bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600";
                
                if (feedback) {
                   const isCorrectOpt = mode === 'jp-en' 
                      ? option.en === currentQuestion.item.en 
                      : option.jp === currentQuestion.item.jp;
                   
                   const isSelected = mode === 'jp-en'
                      ? selectedOption?.en === option.en
                      : selectedOption?.jp === option.jp;

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
                    onClick={() => handleAnswer(option)}
                    disabled={!!feedback}
                    className={`h-14 sm:h-16 px-4 rounded-xl text-lg font-bold transition-all duration-200 flex items-center justify-center ${buttonStyle}`}
                  >
                    {answerText}
                  </button>
                );
              })}
            </div>

            {/* Feedback Message */}
            <div className={`transition-all duration-300 overflow-hidden ${feedback ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
               <div className={`p-3 rounded-xl flex items-center justify-between ${feedback === 'correct' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                  <div className="flex items-center gap-2 font-bold">
                    {feedback === 'correct' ? <><CheckCircle size={20} /> Correct!</> : <><XCircle size={20} /> Incorrect</>}
                  </div>
                  <button 
                    onClick={generateQuestion}
                    className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-bold hover:shadow-md transition-all flex items-center gap-2 text-slate-800"
                  >
                    Next <ArrowRight size={14} />
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