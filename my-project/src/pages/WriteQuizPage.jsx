import React, { useState, useEffect } from 'react';
import { ClipboardCheck, RotateCcw, HelpCircle, XCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { useCanvas } from '../hooks/useCanvas';
import { kanaData } from '../data/kana';

const WriteQuizPage = ({ activeKana, scriptType }) => {
  const [writeQuizItem, setWriteQuizItem] = useState(null);
  const [writeQuizRevealed, setWriteQuizRevealed] = useState(false);
  const [writeQuizHint, setWriteQuizHint] = useState(false);
  const [writeQuizScore, setWriteQuizScore] = useState(0);
  
  // No-Repeat State
  const [uniqueMode, setUniqueMode] = useState(false);
  const [seenIndices, setSeenIndices] = useState([]);
  
  const writeQuizCanvas = useCanvas(writeQuizItem);

  useEffect(() => {
    setSeenIndices([]);
    generateWriteQuiz();
  }, [activeKana, uniqueMode]);

  const generateWriteQuiz = () => {
    const pool = activeKana.length > 0 ? activeKana : kanaData.slice(0, 5);
    let availableIndices = pool.map((_, i) => i);

    if (uniqueMode) {
      availableIndices = availableIndices.filter(i => !seenIndices.includes(i));
      if (availableIndices.length === 0) {
        setSeenIndices([]);
        availableIndices = pool.map((_, i) => i);
      }
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const nextItem = pool[randomIndex];

    if (uniqueMode) {
      setSeenIndices(prev => [...prev, randomIndex]);
    }

    setWriteQuizItem(nextItem);
    setWriteQuizRevealed(false);
    setWriteQuizHint(false);
    if (writeQuizCanvas.clearCanvas) writeQuizCanvas.clearCanvas();
  };

  const handleWriteQuizGrade = (correct) => {
    if (correct) setWriteQuizScore(s => s + 1);
    generateWriteQuiz();
  };

  if (!writeQuizItem) return null;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in w-full flex-1 flex flex-col justify-center py-4">
       <div className="flex justify-between items-center mb-4 px-2">
         <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 text-slate-600">
             <ClipboardCheck size={20} className="text-slate-400"/>
             <span className="font-bold text-sm uppercase tracking-wide">Writing Quiz</span>
           </div>
           {/* Unique Toggle */}
           <button 
             onClick={() => setUniqueMode(!uniqueMode)}
             className={`flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${uniqueMode ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-100 text-slate-500'}`}
           >
             <RefreshCw size={12} className={uniqueMode ? 'animate-spin-slow' : ''} />
             {uniqueMode ? 'UNIQUE' : 'RANDOM'}
           </button>
         </div>
         <div className="flex items-center gap-2">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Correct</span>
           <span className="text-xl font-bold text-green-600 leading-none">{writeQuizScore}</span>
         </div>
       </div>

       <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative flex-1 max-h-[800px] flex flex-col">
         <div className="p-4 text-center border-b border-slate-50 bg-slate-50/50 shrink-0">
           <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Write the {scriptType} for</p>
           <p className="text-4xl font-bold text-slate-800">"{writeQuizItem.romaji}"</p>
         </div>
         
         <div className="flex-1 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] relative flex items-center justify-center min-h-[400px]">
           <div className="absolute top-4 right-4 flex gap-2 z-20">
             <button onClick={() => writeQuizCanvas.clearCanvas()} className="p-2 bg-white shadow-md border border-slate-200 rounded-lg text-slate-600 hover:text-red-500 transition-all"><RotateCcw size={18} /></button>
             <button onClick={() => setWriteQuizHint(!writeQuizHint)} className={`p-2 bg-white shadow-md border border-slate-200 rounded-lg transition-all ${writeQuizHint ? 'text-yellow-500 border-yellow-200 ring-2 ring-yellow-100' : 'text-slate-400'}`}><HelpCircle size={18} /></button>
           </div>
           <div className="relative w-[360px] h-[360px] border-2 border-slate-200 rounded-3xl bg-white shadow-sm overflow-hidden">
              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none ${(writeQuizRevealed || writeQuizHint) ? 'transition-all duration-500' : ''} ${writeQuizRevealed ? 'opacity-100 scale-100' : (writeQuizHint ? 'opacity-20 scale-90' : 'opacity-0 scale-75')}`}>
                  <span className={`text-[250px] leading-none font-serif ${writeQuizRevealed ? 'text-red-500' : 'text-slate-400'}`} style={{ fontFamily: '"Noto Serif JP", serif' }}>
                    {scriptType === 'hiragana' ? writeQuizItem.hiragana : writeQuizItem.katakana}
                  </span>
              </div>
              <canvas ref={writeQuizCanvas.canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10" onMouseDown={writeQuizCanvas.startDrawing} onMouseMove={writeQuizCanvas.draw} onMouseUp={writeQuizCanvas.stopDrawing} onMouseLeave={writeQuizCanvas.stopDrawing} onTouchStart={writeQuizCanvas.startDrawing} onTouchMove={writeQuizCanvas.draw} onTouchEnd={writeQuizCanvas.stopDrawing} />
           </div>
         </div>
         <div className="p-4 bg-slate-50 border-t border-slate-100 shrink-0">
            {!writeQuizRevealed ? (
              <button onClick={() => setWriteQuizRevealed(true)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">Check Answer</button>
            ) : (
              <div className="flex flex-col gap-3 animate-fade-in">
                <p className="text-center font-bold text-slate-500 uppercase tracking-wide text-[10px]">Self Evaluation</p>
                <div className="flex gap-3">
                  <button onClick={() => handleWriteQuizGrade(false)} className="flex-1 py-3 bg-white text-red-600 border-2 border-red-100 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm text-sm"><XCircle size={20} /> Incorrect</button>
                  <button onClick={() => handleWriteQuizGrade(true)} className="flex-1 py-3 bg-green-500 text-white border-2 border-green-500 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md text-sm"><CheckCircle size={20} /> Correct</button>
                </div>
              </div>
            )}
         </div>
       </div>
    </div>
  );
};

export default WriteQuizPage;