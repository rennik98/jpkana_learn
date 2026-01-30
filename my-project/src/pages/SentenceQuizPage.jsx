import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle, XCircle, ArrowRight, Gauge, Volume2 } from 'lucide-react';
import { SENTENCE_DATA } from '../data/kana';

const SentenceQuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    const randomIndex = Math.floor(Math.random() * SENTENCE_DATA.length);
    const item = SENTENCE_DATA[randomIndex];
    
    const options = [item.answer, ...item.distractors].sort(() => Math.random() - 0.5);
    setCurrentQuestion({ ...item, options });
  };

  const playSound = (text) => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (option) => {
    if (feedback) return;
    setSelectedOption(option);
    
    if (option === currentQuestion.answer) {
      setFeedback('correct');
      setScore(s => s + (difficulty === 'easy' ? 10 : 20));
      setStreak(s => s + 1);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  if (!currentQuestion) return null;

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
        
        <button 
          onClick={() => setDifficulty(d => d === 'easy' ? 'normal' : 'easy')}
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors border ${
            difficulty === 'easy' 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          <Gauge size={14} />
          {difficulty === 'easy' ? 'Easy Mode' : 'Normal Mode'}
        </button>
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col min-h-0">
        {/* Question Area */}
        <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center border-b border-slate-100 relative min-h-[160px] p-6 text-center">
          {/* Sound Button */}
          <button 
            onClick={() => playSound(currentQuestion.sentence.replace('___', currentQuestion.answer))}
            className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-sm border border-slate-100 text-slate-400 hover:text-red-500 transition-colors"
          >
            <Volume2 size={24} />
          </button>

          {/* Main Japanese Sentence */}
          <p className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 leading-relaxed">
            {currentQuestion.sentence.split('___').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className={`inline-block min-w-[120px] border-b-4 mx-2 transition-all duration-300 ${feedback ? (feedback === 'correct' ? 'text-green-600 border-green-200' : 'text-red-500 border-red-200') : 'border-slate-300'}`}>
                    {feedback ? currentQuestion.answer : "?"}
                  </span>
                )}
              </React.Fragment>
            ))}
          </p>
          
          {/* Unified Dynamic Hint/Translation Area */}
          <div className="h-8 flex items-center justify-center">
            {difficulty === 'easy' && !feedback && (
              <p className="text-lg font-bold text-slate-400 uppercase tracking-widest animate-fade-in">
                {currentQuestion.easyTranslation}
              </p>
            )}

            {feedback && (
              <p className="text-lg font-bold text-slate-400 italic animate-fade-in">
                 "{currentQuestion.translation}"
              </p>
            )}
          </div>
        </div>

        {/* Options Area */}
        <div className="p-4 sm:p-6 bg-white shrink-0 flex flex-col gap-4">
          <h3 className="text-center text-slate-400 font-bold uppercase tracking-wider text-xs">
            Choose the matching word
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option, idx) => {
              let buttonStyle = "bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600";
              
              if (feedback) {
                const isCorrectOpt = option === currentQuestion.answer;
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
                  onClick={() => handleAnswer(option)}
                  disabled={!!feedback}
                  className={`h-14 sm:h-16 px-4 rounded-xl text-lg font-bold transition-all duration-200 flex items-center justify-center ${buttonStyle}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback Section */}
          <div className={`transition-all duration-300 overflow-hidden ${feedback ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
             <div className={`p-3 rounded-xl flex flex-col gap-2 ${feedback === 'correct' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                <div className="flex items-center justify-between">
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

                <div className={`text-xs p-2 rounded-lg border mt-1 ${feedback === 'correct' ? 'bg-white/60 border-green-200' : 'bg-white/60 border-red-200'}`}>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <div><span className="font-bold">Word:</span> {currentQuestion.answer} ({currentQuestion.romaji})</div>
                    <div><span className="font-bold">Meaning:</span> {currentQuestion.targetMeaning}</div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceQuizPage;