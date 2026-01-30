import React from 'react';
import { RotateCcw, CheckSquare, Square } from 'lucide-react';

const WordQuizFilter = ({ 
  isOpen, 
  onClose, 
  mode, 
  setMode, 
  difficulty, 
  setDifficulty, 
  categories, 
  selectedCategories, 
  setSelectedCategories,
  isStudyMode = false 
}) => {
  if (!isOpen) return null;

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="absolute top-0 right-4 z-30 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 w-72 animate-fade-in text-left">
      <div className="space-y-4">
        
        {/* Quiz Configuration - Hidden if in Study Mode */}
        {!isStudyMode && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Quiz Type</p>
                <button 
                  onClick={() => setMode(m => m === 'jp-en' ? 'en-jp' : 'jp-en')} 
                  className="w-full py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                    {mode === 'jp-en' ? 'JP → EN' : 'EN → JP'}
                </button>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Difficulty</p>
                <button 
                  onClick={() => setDifficulty(d => d === 'easy' ? 'normal' : 'easy')} 
                  className={`w-full py-2.5 border rounded-lg text-xs font-bold transition-all ${
                    difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                  }`}
                >
                    {difficulty === 'easy' ? 'Easy' : 'Hard'}
                </button>
              </div>
            </div>
            <hr className="border-slate-100" />
          </>
        )}

        {/* Categories Section with Checkboxes */}
        <div>
          <div className="flex justify-between items-center mb-2 px-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categories</p>
            <button 
              onClick={() => setSelectedCategories([])} 
              className="flex items-center gap-1 text-[10px] text-red-500 font-bold hover:underline"
            >
              <RotateCcw size={10} /> Reset
            </button>
          </div>
          
          <div className="space-y-1 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
            {categories.map(cat => {
              const isSelected = selectedCategories.includes(cat);
              return (
                <button 
                  key={cat} 
                  onClick={() => toggleCategory(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                    isSelected 
                    ? 'bg-blue-50 text-blue-700 border-blue-100' 
                    : 'hover:bg-slate-50 text-slate-500 bg-white border-transparent'
                  } border`}
                >
                  <span className="truncate mr-2">{cat}</span>
                  {isSelected ? (
                    <CheckSquare size={16} className="text-blue-600 shrink-0" />
                  ) : (
                    <Square size={16} className="text-slate-200 group-hover:text-slate-300 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordQuizFilter;