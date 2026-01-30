import React from 'react';
import { Settings, X, CheckSquare, Square, RotateCcw } from 'lucide-react';
import { KANA_ROWS } from '../data/kana';

const SettingsModal = ({ isOpen, onClose, selectedRows, toggleRow, selectAll, deselectAll }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-slate-200">
        
        {/* Header - Matching WordQuizFilter style */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-100">
              <Settings size={20} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-slate-900 tracking-tight">Kana Settings</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Character Selection</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Quick Actions */}
          <section className="space-y-3">
            <h4 className="px-1 font-black text-[10px] text-slate-400 uppercase tracking-widest">Bulk Actions</h4>
            <div className="flex gap-2">
              <button 
                onClick={selectAll}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                <CheckSquare size={14} /> Select All
              </button>
              <button 
                onClick={deselectAll}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all active:scale-[0.98]"
              >
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </section>

          {/* Row Selection Grid */}
          <section className="space-y-3">
            <h4 className="px-1 font-black text-[10px] text-slate-400 uppercase tracking-widest">Select Character Rows</h4>
            <div className="grid grid-cols-2 gap-2">
              {KANA_ROWS.map((row) => {
                const isSelected = selectedRows.includes(row.id);
                return (
                  <button
                    key={row.id}
                    onClick={() => toggleRow(row.id)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all duration-200 group ${
                      isSelected 
                        ? 'bg-red-50 border-red-500 text-red-700 shadow-sm' 
                        : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-black uppercase tracking-tighter">{row.id} Group</span>
                      <span className={`text-[10px] font-bold ${isSelected ? 'text-red-400' : 'text-slate-300'}`}>
                        {row.label}
                      </span>
                    </div>
                    {isSelected ? <CheckSquare size={18} /> : <Square size={18} className="text-slate-200 group-hover:text-slate-300" />}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-slate-50 border-t border-slate-100">
           <button 
             onClick={onClose}
             className="w-full py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm active:scale-[0.99]"
           >
             Save & Close
           </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;