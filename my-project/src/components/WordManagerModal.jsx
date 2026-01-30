import React, { useState } from 'react';
import { List, Plus, Trash2, X } from 'lucide-react';

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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-slate-200">
        
        {/* Header - Matching Sidebar/App Header style */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-100">
              <List size={20} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-slate-900 tracking-tight">Manage Vocabulary</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Custom Word List</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Add New Word Form - Styled like the Setting Cards */}
          <section className="space-y-4">
             <h4 className="px-2 font-black text-xs text-slate-400 uppercase tracking-widest">Add New Word</h4>
             <form onSubmit={handleSubmit} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                <div className="grid grid-cols-1 gap-3">
                   <div className="space-y-1">
                      <label className="px-1 text-[10px] font-bold text-slate-500 uppercase">Japanese (Kana/Kanji)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. ねこ" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white text-sm font-medium transition-all"
                        value={formData.jp}
                        onChange={e => setFormData({...formData, jp: e.target.value})}
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                         <label className="px-1 text-[10px] font-bold text-slate-500 uppercase">English</label>
                         <input 
                           type="text" 
                           placeholder="e.g. Cat" 
                           className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-sm font-medium transition-all"
                           value={formData.en}
                           onChange={e => setFormData({...formData, en: e.target.value})}
                         />
                      </div>
                      <div className="space-y-1">
                         <label className="px-1 text-[10px] font-bold text-slate-500 uppercase">Romaji</label>
                         <input 
                           type="text" 
                           placeholder="e.g. neko" 
                           className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-sm font-medium transition-all"
                           value={formData.romaji}
                           onChange={e => setFormData({...formData, romaji: e.target.value})}
                         />
                      </div>
                   </div>
                </div>
                <button 
                   type="submit" 
                   disabled={!formData.jp || !formData.en || !formData.romaji}
                   className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-200 disabled:opacity-30 disabled:grayscale transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                   <Plus size={18} strokeWidth={3} /> Add to Collection
                </button>
             </form>
          </section>

          {/* Word List - Styled like the Study Cards */}
          <section className="space-y-4">
             <div className="flex justify-between items-center px-2">
                <h4 className="font-black text-xs text-slate-400 uppercase tracking-widest">Existing Words</h4>
                <span className="bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-full">{words.length}</span>
             </div>
             
             {words.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 text-sm font-medium italic">Your dictionary is empty.</p>
                </div>
             ) : (
                <div className="grid gap-3">
                  {[...words].reverse().map((word, idx) => {
                     const actualIndex = words.length - 1 - idx; 
                     return (
                        <div key={idx} className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-red-200 hover:shadow-md transition-all duration-200">
                           <div className="flex gap-5 items-center">
                              <div className="min-w-[60px]">
                                 <span className="font-bold text-2xl text-slate-900">{word.jp}</span>
                              </div>
                              <div className="flex flex-col border-l border-slate-100 pl-4">
                                 <span className="text-sm font-bold text-slate-700">{word.en}</span>
                                 <span className="text-[11px] font-black text-slate-300 uppercase tracking-tighter group-hover:text-red-400 transition-colors">
                                    {word.romaji}
                                 </span>
                              </div>
                           </div>
                           <button 
                              onClick={() => handleDelete(actualIndex)}
                              className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                           >
                              <Trash2 size={18} />
                           </button>
                        </div>
                     );
                  })}
                </div>
             )}
          </section>
        </div>
        
        {/* Footer Action */}
        <div className="p-4 bg-slate-50 border-t border-slate-100">
           <button 
             onClick={onClose}
             className="w-full py-3 text-slate-600 font-bold hover:text-slate-900 transition-colors"
           >
             Close Manager
           </button>
        </div>
      </div>
    </div>
  );
};

export default WordManagerModal;