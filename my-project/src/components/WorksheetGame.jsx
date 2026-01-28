import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link2, RotateCcw, Trophy } from 'lucide-react';

const WorksheetGame = ({ words }) => {
  const [levelItems, setLevelItems] = useState({ left: [], right: [] });
  const [connections, setConnections] = useState([]); // Array of { startId, endId, color }
  const [selected, setSelected] = useState(null); // ID of currently clicked item
  const [tempConnection, setTempConnection] = useState(null); // For incorrect feedback animation
  const containerRef = useRef(null);
  const itemsRef = useRef({});
  const [lineCoords, setLineCoords] = useState([]);

  // Initialize Game
  useEffect(() => {
    startNewGame();
  }, [words]);

  const startNewGame = () => {
    if (words.length < 2) return;
    
    const count = Math.min(words.length, 5);
    const selectedWords = [...words].sort(() => 0.5 - Math.random()).slice(0, count);

    const left = selectedWords.map(w => ({ id: `left-${w.romaji}`, content: w.en, romaji: w.romaji, side: 'left' }));
    const right = [...selectedWords]
      .sort(() => 0.5 - Math.random())
      .map(w => ({ id: `right-${w.romaji}`, content: w.jp, romaji: w.romaji, side: 'right' }));

    setLevelItems({ left, right });
    setConnections([]);
    setSelected(null);
    setTempConnection(null);
  };

  // Calculate coordinates for lines
  const calculateLines = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newCoords = [];

    const allConnections = [...connections];
    if (tempConnection) allConnections.push(tempConnection);

    allConnections.forEach(conn => {
      const startEl = itemsRef.current[conn.startId];
      const endEl = itemsRef.current[conn.endId];

      if (startEl && endEl) {
        const startRect = startEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();

        // Calculate center of the dot/handle
        const x1 = startRect.left - containerRect.left + startRect.width / 2;
        const y1 = startRect.top - containerRect.top + startRect.height / 2;
        const x2 = endRect.left - containerRect.left + endRect.width / 2;
        const y2 = endRect.top - containerRect.top + endRect.height / 2;

        newCoords.push({ x1, y1, x2, y2, color: conn.color });
      }
    });
    setLineCoords(newCoords);
  };

  // Recalculate on render/update/resize
  useLayoutEffect(() => {
    calculateLines();
    window.addEventListener('resize', calculateLines);
    return () => window.removeEventListener('resize', calculateLines);
  }, [connections, tempConnection, levelItems]);

  const handleItemClick = (item) => {
    // If item is already connected, ignore
    if (connections.some(c => c.startId === item.id || c.endId === item.id)) return;

    if (!selected) {
      setSelected(item);
    } else {
      // If clicked same item, deselect
      if (selected.id === item.id) {
        setSelected(null);
        return;
      }

      // If clicked same side, switch selection
      if (selected.side === item.side) {
        setSelected(item);
        return;
      }

      // Attempt match
      const isMatch = selected.romaji === item.romaji;
      const startId = selected.side === 'left' ? selected.id : item.id;
      const endId = selected.side === 'left' ? item.id : selected.id;

      if (isMatch) {
        setConnections(prev => [...prev, { startId, endId, color: '#22c55e' }]); // Green
        setSelected(null);
      } else {
        // Show temp red line
        const tempId = { startId, endId, color: '#ef4444' }; // Red
        setTempConnection(tempId);
        setSelected(null);
        setTimeout(() => setTempConnection(null), 800);
      }
    }
  };

  if (words.length < 2) {
    return (
      <div className="text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-lg">
        <Link2 size={48} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-700 mb-2">Not Enough Words</h3>
        <p className="text-slate-500">Please add at least 2 words in the "Words" tab to create a worksheet.</p>
      </div>
    );
  }

  const isComplete = connections.length === levelItems.left.length && levelItems.left.length > 0;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in w-full flex-1 flex flex-col justify-center py-6">
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden relative p-6 sm:p-8 w-full" ref={containerRef}>
        
        <h3 className="text-center font-bold text-slate-400 uppercase text-xs mb-6 tracking-widest">Connect the pairs</h3>

        {/* SVG Overlay for Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {lineCoords.map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={line.color}
              strokeWidth="4"
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          ))}
        </svg>

        <div className="flex justify-between relative z-20">
          {/* Left Column (English) */}
          <div className="flex flex-col gap-6 w-[45%]">
            {levelItems.left.map(item => {
              const isSelected = selected?.id === item.id;
              const isConnected = connections.some(c => c.startId === item.id);
              
              return (
                <div 
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`
                    relative p-4 rounded-xl border-2 font-bold text-slate-700 text-center cursor-pointer transition-all
                    ${isSelected ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-200 bg-slate-50 hover:border-blue-300'}
                    ${isConnected ? 'border-green-500 bg-green-50 text-green-700 opacity-80' : ''}
                  `}
                >
                  <span className="text-sm sm:text-base">{item.content}</span>
                  {/* Connection Dot */}
                  <div 
                    ref={el => itemsRef.current[item.id] = el}
                    className={`absolute right-[-10px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-white
                      ${isSelected ? 'border-blue-500' : (isConnected ? 'border-green-500 bg-green-500' : 'border-slate-300')}
                    `}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column (Japanese) */}
          <div className="flex flex-col gap-6 w-[45%]">
            {levelItems.right.map(item => {
              const isSelected = selected?.id === item.id;
              const isConnected = connections.some(c => c.endId === item.id);

              return (
                <div 
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`
                    relative p-4 rounded-xl border-2 font-bold text-slate-700 text-center cursor-pointer transition-all flex items-center justify-center
                    ${isSelected ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-200 bg-slate-50 hover:border-blue-300'}
                    ${isConnected ? 'border-green-500 bg-green-50 text-green-700 opacity-80' : ''}
                  `}
                >
                  <span className="text-xl sm:text-2xl">{item.content}</span>
                  {/* Connection Dot */}
                  <div 
                    ref={el => itemsRef.current[item.id] = el}
                    className={`absolute left-[-10px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-white
                      ${isSelected ? 'border-blue-500' : (isConnected ? 'border-green-500 bg-green-500' : 'border-slate-300')}
                    `}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {isComplete && (
           <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center animate-fade-in">
              <Trophy size={64} className="text-yellow-500 mb-4 drop-shadow-sm" />
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Excellent!</h2>
              <p className="text-slate-500 mb-6 font-medium">All pairs connected correctly.</p>
              <button 
                onClick={startNewGame}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <RotateCcw size={18} /> New Worksheet
              </button>
           </div>
        )}
      </div>
      
      {!isComplete && (
        <div className="flex justify-center mt-6">
            <button onClick={startNewGame} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm font-semibold transition-colors">
                <RotateCcw size={16}/> New Sheet
            </button>
        </div>
      )}
    </div>
  );
};

export default WorksheetGame;