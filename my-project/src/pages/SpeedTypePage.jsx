import React, { useState, useEffect, useRef } from 'react';
import { Timer, RotateCcw, Trophy, Zap, Infinity as InfinityIcon, Type } from 'lucide-react';
import { kanaData } from '../data/kana';

export default function SpeedTypePage({ activeKana = [], scriptType = 'hiragana' }) {
  // Game Config
  const [mode, setMode] = useState('time'); 
  const [duration, setDuration] = useState(30);
  const [gameScript, setGameScript] = useState(scriptType); // Local script state
  
  // Game State
  const [gameState, setGameState] = useState('waiting');
  const [timer, setTimer] = useState(30);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputBuffer, setInputBuffer] = useState('');
  
  // Stats & Tracking
  const [stats, setStats] = useState({ correct: 0, errors: 0 });
  const [mistakes, setMistakes] = useState(new Set());
  
  const inputRef = useRef(null);

  // Sync with global prop change (optional)
  useEffect(() => {
    if (gameState === 'waiting') {
      setGameScript(scriptType);
    }
  }, [scriptType, gameState]);

  // Generate Queue with specific script assigned to each card
  const generateQueue = () => {
    const pool = (activeKana && activeKana.length > 0) ? activeKana : kanaData;
    
    return Array.from({ length: 100 }, () => {
      const item = pool[Math.floor(Math.random() * pool.length)];
      
      // Determine which script to show for this specific card
      let targetScript = gameScript;
      if (targetScript === 'mix') {
        targetScript = Math.random() > 0.5 ? 'hiragana' : 'katakana';
      }

      return { 
        ...item, 
        displayScript: targetScript 
      };
    });
  };

  const resetGame = () => {
    setGameState('waiting');
    setTimer(mode === 'time' ? duration : 0);
    setQueue(generateQueue());
    setCurrentIndex(0);
    setInputBuffer('');
    setStats({ correct: 0, errors: 0 });
    setMistakes(new Set());
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Re-init on config change
  useEffect(() => {
    resetGame();
  }, [activeKana, duration, mode, gameScript]);

  // Timer Logic
  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimer(prev => {
          if (mode === 'time') {
            if (prev <= 1) {
              setGameState('finished');
              return 0;
            }
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, mode]);

  // Input Handler
  const handleInput = (e) => {
    if (gameState === 'finished') return;
    if (gameState === 'waiting') setGameState('playing');

    const value = e.target.value.toLowerCase();
    const currentItem = queue[currentIndex];
    if (!currentItem) return; 

    if (currentItem.romaji.startsWith(value)) {
      setInputBuffer(value);
      if (value === currentItem.romaji) {
        if (!mistakes.has(currentIndex)) {
            setStats(p => ({ ...p, correct: p.correct + 1 }));
        }
        setInputBuffer('');
        setCurrentIndex(p => p + 1);
        if (currentIndex > queue.length - 10) {
           setQueue(p => [...p, ...generateQueue().slice(0, 20)]);
        }
      }
    } else {
      if (!mistakes.has(currentIndex)) {
          setMistakes(prev => new Set(prev).add(currentIndex));
          setStats(p => ({ ...p, errors: p.errors + 1 }));
      }
    }
  };

  const timeElapsed = mode === 'time' ? (duration - timer) : timer;
  const cpm = Math.round((stats.correct / (timeElapsed || 1)) * 60);

  // Helper for toggle button styles
  const getToggleClass = (isActive) => 
    `px-3 py-2 rounded-lg text-sm font-bold transition-all ${isActive ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`;

  return (
    <div 
      className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center p-4 outline-none" 
      onClick={() => inputRef.current?.focus()}
    >
      {/* HUD */}
      <div className="flex items-center gap-8 mb-8 text-slate-400 font-bold text-xl select-none">
        <div className={`flex items-center gap-2 ${gameState === 'playing' && mode === 'time' && timer < 5 ? 'text-red-500' : 'text-slate-600'}`}>
          {mode === 'time' ? <Timer size={24} /> : <InfinityIcon size={24} />}
          <span className="font-mono text-2xl">{timer}s</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
           <Zap size={24} className={stats.correct > 0 ? "text-yellow-500" : ""} />
           <span className="font-mono text-2xl">{stats.correct}</span>
        </div>
        {gameState === 'playing' && mode === 'infinite' && (
          <button onClick={(e) => { e.stopPropagation(); setGameState('finished'); }} className="px-4 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200">Stop</button>
        )}
      </div>

      {/* Config Menu (Waiting State) */}
      {gameState === 'waiting' && (
        <div className="flex flex-col xl:flex-row items-center gap-4 mb-8 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 animate-fade-in" onClick={e => e.stopPropagation()}>
          
          {/* Script Selector (NEW) */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
             <button onClick={() => setGameScript('hiragana')} className={getToggleClass(gameScript === 'hiragana')}>Hiragana</button>
             <button onClick={() => setGameScript('katakana')} className={getToggleClass(gameScript === 'katakana')}>Katakana</button>
             <button onClick={() => setGameScript('mix')} className={getToggleClass(gameScript === 'mix')}>Mix</button>
          </div>

          <div className="w-px h-8 bg-slate-100 hidden xl:block"></div>

          {/* Mode Selector */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setMode('time')} className={getToggleClass(mode === 'time')}>Countdown</button>
            <button onClick={() => { setMode('infinite'); setDuration(0); }} className={getToggleClass(mode === 'infinite')}>Count Up</button>
          </div>

          {/* Duration Selector */}
          {mode === 'time' && (
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              {[30, 45, 60].map(s => (
                <button key={s} onClick={() => setDuration(s)} className={`w-12 py-2 rounded-lg text-sm font-bold transition-all ${duration === s ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>{s}</button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Game Area */}
      <div className="relative w-full max-w-3xl min-h-[300px] flex items-center justify-center">
        {gameState === 'finished' ? (
          <div className="bg-white rounded-3xl p-8 shadow-xl text-center border border-slate-100 w-full max-w-md mx-auto z-20">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4"><Trophy size={32} /></div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Complete!</h2>
            <div className="grid grid-cols-2 gap-4 mt-6 mb-8">
              <div className="p-4 bg-slate-50 rounded-xl"><div className="text-xs text-slate-500 font-bold uppercase">Characters</div><div className="text-3xl font-bold text-slate-900">{stats.correct}</div></div>
              <div className="p-4 bg-slate-50 rounded-xl"><div className="text-xs text-slate-500 font-bold uppercase">CPM</div><div className="text-3xl font-bold text-slate-900">{cpm}</div></div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); resetGame(); }} className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800"><RotateCcw size={20} /> Play Again</button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center content-start w-full relative">
             <input ref={inputRef} type="text" value={inputBuffer} onChange={handleInput} className="opacity-0 absolute inset-0 w-full h-full cursor-default z-20" autoFocus />
             
             {queue.slice(currentIndex > 2 ? currentIndex - 2 : 0, currentIndex + 10).map((item, idx) => {
               const actualIndex = (currentIndex > 2 ? currentIndex - 2 : 0) + idx;
               const isCurrent = actualIndex === currentIndex;
               const isPast = actualIndex < currentIndex;
               const hasError = mistakes.has(actualIndex);

               // Use the pre-calculated script for this specific card
               const char = item.displayScript === 'katakana' ? item.katakana : item.hiragana;
               
               return (
                 <div key={`${item.romaji}-${actualIndex}`} 
                      className={`
                        relative flex flex-col items-center justify-center w-24 h-28 rounded-2xl transition-all duration-200
                        ${isCurrent ? 'bg-white shadow-xl scale-110 border-2 border-slate-900 z-10' : ''}
                        ${!isCurrent && !isPast ? 'opacity-40 grayscale blur-[0.5px]' : ''}
                        ${isPast ? 'opacity-80' : ''}
                      `}>
                    
                    <span className="text-5xl font-bold text-slate-800 mb-3">{char}</span>
                    
                    <div className="h-5 text-sm font-bold font-mono uppercase tracking-widest flex items-center justify-center">
                      {isPast && (
                        <span className={hasError ? 'text-red-500' : 'text-green-500'}>
                          {item.romaji}
                        </span>
                      )}
                      {isCurrent && (
                        <>
                           {hasError ? (
                             <span className="text-red-500 animate-pulse">{item.romaji}</span>
                           ) : (
                             <span className="text-green-500 border-b-2 border-green-200 px-1 min-w-[10px] inline-block h-5">
                               {inputBuffer}
                               <span className="animate-pulse border-r-2 border-slate-400 ml-0.5 h-4 inline-block align-middle"></span>
                             </span>
                           )}
                        </>
                      )}
                      {!isPast && !isCurrent && <span className="invisible">.</span>}
                    </div>
                 </div>
               );
             })}
          </div>
        )}
      </div>

      {gameState === 'waiting' && (
        <div className="fixed bottom-12 text-slate-400 font-medium flex items-center gap-2 animate-pulse bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm">
           <Zap size={16} /> <span>Start typing to begin...</span>
        </div>
      )}
    </div>
  );
}