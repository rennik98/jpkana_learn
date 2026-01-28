import React from 'react';

const StudyPage = ({ activeKana, scriptType, setWritingChar }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8 md:hidden">
        <h2 className="text-xl font-bold mb-1">
          {scriptType === 'hiragana' ? 'Hiragana' : 'Katakana'} Chart
        </h2>
        <p className="text-slate-500 text-sm">Tap to practice</p>
      </div>

      <div className="grid grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {activeKana.map((kana) => (
          <button 
            key={kana.romaji}
            onClick={() => setWritingChar(kana)}
            className="bg-white aspect-square rounded-2xl shadow-sm border-2 border-slate-100 flex flex-col items-center justify-center hover:border-red-400 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <span className="text-3xl sm:text-4xl md:text-5xl font-medium mb-1 text-slate-700 group-hover:text-red-500 transition-colors">
              {scriptType === 'hiragana' ? kana.hiragana : kana.katakana}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-300 group-hover:text-slate-400 uppercase tracking-wide">
              {kana.romaji}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudyPage;