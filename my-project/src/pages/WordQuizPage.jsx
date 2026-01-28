import React, { useState, useEffect } from 'react';
import { Trophy, List, ArrowLeftRight, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const WordQuizPage = ({ wordList, onManageWords }) => {
  const [wordQuizMode, setWordQuizMode] = useState('en-jp'); // 'en-jp' or 'jp-en'
  const [wordQuizDifficulty, setWordQuizDifficulty] = useState('normal'); // 'normal' or 'easy'
  const [currentWordQuestion, setCurrentWordQuestion] = useState(null);
  const [wordScore, setWordScore] = useState(0);
  const [wordStreak, setWordStreak] = useState(0);
  const [wordFeedback, setWordFeedback] = useState(null);
  const [selectedWordOption, setSelectedWordOption] = useState(null);

  useEffect(() => {
    generateWordQuestion();
  }, [wordList, wordQuizMode]);

  const generateWordQuestion = () => {
    setWordFeedback(null);
    setSelectedWordOption(null);
    
    if (wordList.length === 0) {
      setCurrentWordQuestion(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * wordList.length);
    const correctItem = wordList[randomIndex];

    const distractors = [];
    let attempts = 0;
    while (distractors.length < 3 && attempts < 100) {
      const dIndex = Math.floor(Math.random() * wordList.length);
      const potential = wordList[dIndex];
      if (potential.romaji !== correctItem.romaji && !distractors.includes(potential)) {
        distractors.push(potential);
      }
      attempts++;
    }

    const options = [correctItem, ...distractors].sort(() => Math.random() - 0.5);
    setCurrentWordQuestion({ item: correctItem, options: options });
  };

  const handleWordAnswer = (option) => {
    if (wordFeedback) return;
    setSelectedWordOption(option);
    
    if (option.romaji === currentWordQuestion.item.romaji) {
      setWordFeedback('correct');
      setWordScore(s => s + 10);
      setWordStreak(s => s + 1);
    } else {
      setWordFeedback('incorrect');
      setWordStreak(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in h-full flex flex-col justify-center py-4">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
            <span className="text-2xl font-bold text-slate-900 leading-none">{wordScore}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              Streak <Trophy size={12} className="text-yellow-500" />
            </span>
            <span className="text-2xl font-bold text-orange-500 leading-none">{wordStreak}</span>
          </div>
        </div>
        
        <button
          onClick={onManageWords}
          className="p-2 bg-white border border-slate-200 text-slate-500 hover:text-slate-700 rounded-lg hover:shadow-sm transition-all"
          title="Manage Words"
        >
          <List size={18} />
        </button>
      </div>

      <div className="flex justify-between items-center mb-3 gap-2">
        <button
          onClick={() => setWordQuizMode(wordQuizMode === 'en-jp' ? 'jp-en' : 'en-jp')}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <ArrowLeftRight size={14} />
          {wordQuizMode === 'en-jp' ? 'EN → JP' : 'JP → EN'}
        </button>
        
        <div className="bg-slate-200/50 p-1 rounded-lg flex text-xs font-bold">
            <button 
              onClick={() => setWordQuizDifficulty('normal')}
              className={`px-3 py-1 rounded-md transition-all ${wordQuizDifficulty === 'normal' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Normal
            </button>
            <button 
              onClick={() => setWordQuizDifficulty('easy')}
              className={`px-3 py-1 rounded-md transition-all ${wordQuizDifficulty === 'easy' ? 'bg-white shadow-sm text-green-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Easy
            </button>
        </div>
      </div>

      {wordList.length === 0 ? (
         <div className="bg-white p-12 rounded-3xl shadow-lg border border-slate-100 text-center">
            <div className="inline-flex p-4 bg-blue-50 text-blue-500 rounded-2xl mb-6">
               <List size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Words Added</h3>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto">Add some vocabulary words to start building your quiz!</p>
            <button 
               onClick={onManageWords}
               className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
            >
               Add Words
            </button>
         </div>
      ) : currentWordQuestion && (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative flex-1 max-h-[800px] flex flex-col">
          <div className="h-56 sm:h-80 bg-slate-50 flex items-center justify-center border-b border-slate-100 p-4 relative shrink-0">
            <span className="text-4xl sm:text-5xl font-bold text-slate-800 text-center flex flex-col items-center gap-3">
              {wordQuizMode === 'en-jp' ? (
                  <>
                     {currentWordQuestion.item.en}
                     {wordQuizDifficulty === 'easy' && (
                        <span className="text-lg sm:text-xl text-slate-400 font-normal bg-white px-3 py-1 rounded-full border border-slate-100">
                           {currentWordQuestion.item.romaji}
                        </span>
                     )}
                  </>
              ) : (
                  <>
                     {currentWordQuestion.item.jp}
                     {wordQuizDifficulty === 'easy' && (
                        <span className="text-lg sm:text-xl text-slate-400 font-normal bg-white px-3 py-1 rounded-full border border-slate-100">
                           {currentWordQuestion.item.romaji}
                        </span>
                     )}
                  </>
              )}
            </span>
          </div>

          <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-3">
              {currentWordQuestion.options.map((option, idx) => {
                let buttonStyle = "bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700";
                
                if (wordFeedback === 'correct') {
                  if (option.romaji === currentWordQuestion.item.romaji) {
                    buttonStyle = "bg-green-50 border-2 border-green-500 text-green-700 shadow-sm";
                  } else {
                     buttonStyle = "opacity-40 border-slate-100 bg-slate-50";
                  }
                } else if (wordFeedback === 'incorrect') {
                   if (option.romaji === currentWordQuestion.item.romaji) {
                     buttonStyle = "bg-green-50 border-2 border-green-500 text-green-700 shadow-sm";
                   } else if (selectedWordOption?.romaji === option.romaji) {
                     buttonStyle = "bg-red-50 border-2 border-red-500 text-red-700 shadow-sm";
                   } else {
                      buttonStyle = "opacity-40 border-slate-100 bg-slate-50";
                   }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleWordAnswer(option)}
                    disabled={!!wordFeedback}
                    className={`h-14 sm:h-16 rounded-xl font-bold transition-all duration-200 ${buttonStyle} px-1 flex items-center justify-center`}
                  >
                     <span className={`${wordQuizMode === 'en-jp' ? 'text-xl' : 'text-sm'} leading-tight line-clamp-2`}>
                       {wordQuizMode === 'en-jp' ? option.jp : option.en}
                     </span>
                  </button>
                );
              })}
            </div>

            {wordFeedback && (
              <div className="mt-4 animate-fade-in">
                <div className={`p-3 rounded-xl flex flex-col gap-2 ${wordFeedback === 'correct' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-lg">
                      {wordFeedback === 'correct' ? <><CheckCircle size={20} /> Correct!</> : <><XCircle size={20} /> Incorrect</>}
                    </div>
                    <button 
                      onClick={generateWordQuestion}
                      className="px-5 py-2 bg-white rounded-lg shadow-sm text-sm font-bold hover:shadow-md transition-all flex items-center gap-2 text-slate-800"
                    >
                      Next <ArrowRight size={14} />
                    </button>
                  </div>
                  
                  <div className="text-center pt-2 border-t border-black/5 flex flex-col gap-1">
                     <span className="text-xl font-bold">{currentWordQuestion.item.jp}</span>
                     <span className="text-xs opacity-60 font-bold uppercase tracking-wider">{currentWordQuestion.item.romaji}</span>
                     <span className="text-sm font-medium text-slate-600">{currentWordQuestion.item.en}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WordQuizPage;