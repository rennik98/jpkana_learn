import React, { useState } from 'react';
import { RotateCcw, Brain, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCanvas } from '../hooks/useCanvas';

const WritingPad = ({ character, romaji, type, onClose, onNext, onPrev }) => {
  const [showGuide, setShowGuide] = useState(true);
  const { canvasRef, startDrawing, draw, stopDrawing, clearCanvas } = useCanvas(character);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 font-medium">
            Close
          </button>
          <h3 className="font-bold text-lg text-slate-800">Writing Practice</h3>
          <div className="w-10"></div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-white relative flex items-center justify-center p-4 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
             <button onClick={clearCanvas} className="p-2 bg-white shadow-md border border-slate-200 rounded-full text-slate-600 hover:text-red-500 transition-colors" title="Clear">
                <RotateCcw size={20} />
             </button>
             <button onClick={() => setShowGuide(!showGuide)} className={`p-2 bg-white shadow-md border border-slate-200 rounded-full transition-colors ${showGuide ? 'text-blue-500 border-blue-200' : 'text-slate-400'}`} title="Guide">
                <Brain size={20} />
             </button>
          </div>

          <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] border-2 border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
            {showGuide && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <span className="text-[200px] leading-none text-slate-200 font-serif" style={{ fontFamily: '"Noto Serif JP", serif' }}>
                    {character}
                  </span>
                  <div className="absolute inset-0 border-t border-dashed border-slate-100 top-1/2"></div>
                  <div className="absolute inset-0 border-l border-dashed border-slate-100 left-1/2"></div>
               </div>
            )}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-4">
          <div className="text-center">
             <p className="text-2xl font-bold text-slate-800 mb-1">{romaji}</p>
             <p className="text-xs text-slate-400 uppercase tracking-wider">
               {type} • Practice Mode
             </p>
          </div>
          <div className="flex gap-3 justify-center">
             <button onClick={onPrev} className="flex-1 max-w-[120px] flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-slate-200 shadow-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all">
                <ChevronLeft size={18} /> Prev
             </button>
             <button onClick={onNext} className="flex-1 max-w-[120px] flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white shadow-md font-semibold hover:bg-slate-800 transition-all">
                Next <ChevronRight size={18} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPad;