import React from 'react';
import { X, Check, CheckCheck, Grid } from 'lucide-react';
import { KANA_ROWS } from '../data/kana';

export default function SettingsModal({ isOpen, onClose, selectedRows, toggleRow, selectAll, deselectAll }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
             <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
               <Grid size={20} />
             </div>
             <div>
               <h2 className="text-lg font-bold text-slate-900">Filter Kana</h2>
               <p className="text-xs text-slate-500 font-medium">Select rows to study</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto flex-1">
           {/* Quick Actions */}
           <div className="flex gap-2 mb-4">
              <button 
                onClick={selectAll}
                className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCheck size={14} /> Select All
              </button>
              <button 
                onClick={deselectAll}
                className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <X size={14} /> Clear All
              </button>
           </div>

           {/* Single Column List */}
           <div className="grid grid-cols-1 gap-2">
             {KANA_ROWS.map((row) => {
               const isSelected = selectedRows.includes(row.id);
               
               return (
                 <button
                   key={row.id}
                   onClick={() => toggleRow(row.id)}
                   className={`
                     relative flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 border-2
                     ${isSelected 
                        ? 'bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-200' 
                        : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200 hover:bg-blue-50/50'
                     }
                   `}
                 >
                    <div className="flex items-center gap-3">
                        <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                          {row.label}
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                          {row.romaji}
                        </span>
                    </div>
                    
                    {/* Checkmark Icon */}
                    {isSelected && (
                      <Check size={18} strokeWidth={3} className="text-white" />
                    )}
                 </button>
               );
             })}
           </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
           <button 
             onClick={onClose}
             className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg text-sm"
           >
             Done
           </button>
        </div>

      </div>
    </div>
  );
}