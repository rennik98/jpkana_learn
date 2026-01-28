import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { kanaData } from '../data/kana';

const QuizPage = ({ activeKana, scriptType }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    generateQuestion();
  }, [activeKana]);

  const generateQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    
    // Safety check for empty data
    const pool = activeKana.length > 0 ? activeKana : kanaData.slice(0, 5);
    
    const randomIndex = Math.floor(Math.random() * pool.length);
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
    setCurrentQuestion({ item: correctItem, options: options });
  };

  const handleAnswer = (option) => {
    if (feedback) return;
    setSelectedOption(option);
    if (option.romaji === currentQuestion.item.romaji) {
      setFeedback('correct');
      setScore(s => s + 10);
      setStreak(s => s + 1);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in h-full flex flex-col justify-center py-4">
      <div className="flex items-center gap-8 mb-4 px-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
          <span className="text-2xl font-bold text-slate-900 leading-none">{score}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            Streak <Trophy size={12} className="text-yellow-500" />
          </span>
          <span className="text-2xl font-bold text-orange-500 leading-none">{streak}</span>
        </div>
      </div>

      {currentQuestion && (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative flex-1 max-h-[800px] flex flex-col">
          <div className="h-56 sm:h-80 bg-slate-50 flex items-center justify-center border-b border-slate-100 shrink-0">
            <span className="text-8xl sm:text-9xl font-medium text-slate-800">
              {scriptType === 'hiragana' 
                ? currentQuestion.item.hiragana 
                : currentQuestion.item.katakana}
            </span>
          </div>

          <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
            <h3 className="text-center text-slate-400 font-bold uppercase tracking-wider text-xs mb-4">
              Select the correct sound
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option, idx) => {
                let buttonStyle = "bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600";
                
                if (feedback === 'correct') {
                  if (option.romaji === currentQuestion.item.romaji) {
                    buttonStyle = "bg-green-50 border-2 border-green-500 text-green-700 shadow-sm";
                  } else {
                     buttonStyle = "opacity-40 border-slate-100 bg-slate-50";
                  }
                } else if (feedback === 'incorrect') {
                   if (option.romaji === currentQuestion.item.romaji) {
                     buttonStyle = "bg-green-50 border-2 border-green-500 text-green-700 shadow-sm";
                   } else if (selectedOption?.romaji === option.romaji) {
                     buttonStyle = "bg-red-50 border-2 border-red-500 text-red-700 shadow-sm";
                   } else {
                      buttonStyle = "opacity-40 border-slate-100 bg-slate-50";
                   }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    disabled={!!feedback}
                    className={`h-14 sm:h-16 rounded-xl text-lg sm:text-xl font-bold transition-all duration-200 ${buttonStyle}`}
                  >
                    {option.romaji}
                  </button>
                );
              })}
            </div>

            {feedback && (
              <div className="mt-4 animate-fade-in">
                <div className={`p-3 rounded-xl flex flex-col gap-2 ${feedback === 'correct' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-base">
                      {feedback === 'correct' ? <><CheckCircle size={20} /> Correct!</> : <><XCircle size={20} /> Incorrect</>}
                    </div>
                    <button 
                      onClick={generateQuestion}
                      className="px-5 py-2 bg-white rounded-lg shadow-sm text-sm font-bold hover:shadow-md transition-all flex items-center gap-2 text-slate-800"
                    >
                      Next <ArrowRight size={14} />
                    </button>
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

export default QuizPage;