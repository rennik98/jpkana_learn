import React from 'react';
import { Filter } from 'lucide-react';
import { KANA_ROWS } from '../data/kana';

const SettingsModal = ({ isOpen, onClose, selectedRows, toggleRow, selectAll, deselectAll }) => {
  if (!isOpen) return null;

  const totalSelected = selectedRows.length;
  const totalRows = KANA_ROWS.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex flex-col">
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <Filter size={20} className="text-slate-500"/>
              Filter Characters
            </h3>
            <span className="text-xs text-slate-500 font-medium ml-7">
              {totalSelected === totalRows ? 'All rows selected' : `${totalSelected} of ${totalRows} rows selected`}
            </span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 font-medium px-3 py-1 rounded-lg hover:bg-slate-200 transition-colors">
            Done
          </button>
        </div>
        
        <div className="overflow-y-auto p-4">
          <div className="flex gap-2 mb-4">
            <button onClick={selectAll} className="flex-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100">
              Select All
            </button>
            <button onClick={deselectAll} className="flex-1 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-lg hover:bg-slate-200 transition-colors border border-slate-200">
              Clear (Keep A)
            </button>
          </div>
          
          <div className="space-y-2">
            {KANA_ROWS.map((row) => {
              const isSelected = selectedRows.includes(row.id);
              return (
                <label key={row.id} className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-red-500 rounded focus:ring-red-500 border-gray-300 mr-3 accent-red-500"
                    checked={isSelected}
                    onChange={() => toggleRow(row.id)}
                  />
                  <span className={`font-semibold ${isSelected ? 'text-red-900' : 'text-slate-600'}`}>
                    {row.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;