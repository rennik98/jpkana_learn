import React, { useState } from 'react';
import { List, Plus, Trash2 } from 'lucide-react';

const WordManagerModal = ({ isOpen, onClose, words, setWords }) => {
  const [formData, setFormData] = useState({ jp: '', en: '', romaji: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.jp && formData.en && formData.romaji) {
      setWords([...words, formData]);
      setFormData({ jp: '', en: '', romaji: '' });
    }
  };

  const handleDelete = (index) => {
    const newWords = [...words];
    newWords.splice(index, 1);
    setWords(newWords);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-800">
             <List size={20} className="text-slate-500"/>
             Manage Words
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 font-medium px-3 py-1 rounded-lg hover:bg-slate-200 transition-colors">
            Done
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          
          {/* Add New Word Form */}
          <form onSubmit={handleSubmit} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
             <h4 className="font-bold text-sm text-slate-500 uppercase">Add New Word</h4>
             <div className="grid grid-cols-3 gap-2">
                <input 
                  type="text" 
                  placeholder="JP (e.g. ねこ)" 
                  className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={formData.jp}
                  onChange={e => setFormData({...formData, jp: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="EN (e.g. Cat)" 
                  className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={formData.en}
                  onChange={e => setFormData({...formData, en: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Romaji" 
                  className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={formData.romaji}
                  onChange={e => setFormData({...formData, romaji: e.target.value})}
                />
             </div>
             <button 
                type="submit" 
                disabled={!formData.jp || !formData.en || !formData.romaji}
                className="w-full bg-slate-900 text-white font-bold py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
             >
                <Plus size={16} /> Add Word
             </button>
          </form>

          {/* Word List */}
          <div className="space-y-2">
             <h4 className="font-bold text-sm text-slate-500 uppercase flex justify-between">
                <span>Existing Words</span>
                <span>{words.length}</span>
             </h4>
             {words.length === 0 ? (
                <p className="text-slate-400 text-center py-4 italic">No words added yet.</p>
             ) : (
                <div className="space-y-2">
                  {[...words].reverse().map((word, idx) => {
                     // We reversed for display, so actual index calculation
                     const actualIndex = words.length - 1 - idx; 
                     return (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg group hover:border-blue-300 transition-colors">
                           <div className="flex gap-4 items-center">
                              <span className="font-bold text-lg w-20 truncate">{word.jp}</span>
                              <div className="flex flex-col">
                                 <span className="text-sm font-semibold text-slate-700">{word.en}</span>
                                 <span className="text-xs text-slate-400">{word.romaji}</span>
                              </div>
                           </div>
                           <button 
                              onClick={() => handleDelete(actualIndex)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                           >
                              <Trash2 size={16} />
                           </button>
                        </div>
                     );
                  })}
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordManagerModal;