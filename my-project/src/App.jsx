import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import { 
  BookOpen, 
  Brain, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  ArrowRight, 
  PenTool, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  HelpCircle,
  ClipboardCheck,
  Settings,
  Filter,
  Languages,
  ArrowLeftRight,
  Plus,
  Trash2,
  List,
  Link2,
  Menu,
  X
} from 'lucide-react';

// --- Data: The Basic 46 Kana Characters ---
const kanaData = [
  { romaji: 'a', hiragana: 'あ', katakana: 'ア' },
  { romaji: 'i', hiragana: 'い', katakana: 'イ' },
  { romaji: 'u', hiragana: 'う', katakana: 'ウ' },
  { romaji: 'e', hiragana: 'え', katakana: 'エ' },
  { romaji: 'o', hiragana: 'お', katakana: 'オ' },
  
  { romaji: 'ka', hiragana: 'か', katakana: 'カ' },
  { romaji: 'ki', hiragana: 'き', katakana: 'キ' },
  { romaji: 'ku', hiragana: 'く', katakana: 'ク' },
  { romaji: 'ke', hiragana: 'け', katakana: 'ケ' },
  { romaji: 'ko', hiragana: 'こ', katakana: 'コ' },
  
  { romaji: 'sa', hiragana: 'さ', katakana: 'サ' },
  { romaji: 'shi', hiragana: 'し', katakana: 'シ' },
  { romaji: 'su', hiragana: 'す', katakana: 'ス' },
  { romaji: 'se', hiragana: 'せ', katakana: 'セ' },
  { romaji: 'so', hiragana: 'そ', katakana: 'ソ' },
  
  { romaji: 'ta', hiragana: 'た', katakana: 'タ' },
  { romaji: 'chi', hiragana: 'ち', katakana: 'チ' },
  { romaji: 'tsu', hiragana: 'つ', katakana: 'ツ' },
  { romaji: 'te', hiragana: 'て', katakana: 'テ' },
  { romaji: 'to', hiragana: 'と', katakana: 'ト' },
  
  { romaji: 'na', hiragana: 'な', katakana: 'ナ' },
  { romaji: 'ni', hiragana: 'に', katakana: 'ニ' },
  { romaji: 'nu', hiragana: 'ぬ', katakana: 'ヌ' },
  { romaji: 'ne', hiragana: 'ね', katakana: 'ネ' },
  { romaji: 'no', hiragana: 'の', katakana: 'ノ' },
  
  { romaji: 'ha', hiragana: 'は', katakana: 'ハ' },
  { romaji: 'hi', hiragana: 'ひ', katakana: 'ヒ' },
  { romaji: 'fu', hiragana: 'ふ', katakana: 'フ' },
  { romaji: 'he', hiragana: 'へ', katakana: 'ヘ' },
  { romaji: 'ho', hiragana: 'ほ', katakana: 'ホ' },
  
  { romaji: 'ma', hiragana: 'ま', katakana: 'マ' },
  { romaji: 'mi', hiragana: 'み', katakana: 'ミ' },
  { romaji: 'mu', hiragana: 'む', katakana: 'ム' },
  { romaji: 'me', hiragana: 'め', katakana: 'メ' },
  { romaji: 'mo', hiragana: 'も', katakana: 'モ' },
  
  { romaji: 'ya', hiragana: 'や', katakana: 'ヤ' },
  { romaji: 'yu', hiragana: 'ゆ', katakana: 'ユ' },
  { romaji: 'yo', hiragana: 'よ', katakana: 'ヨ' },
  
  { romaji: 'ra', hiragana: 'ら', katakana: 'ラ' },
  { romaji: 'ri', hiragana: 'り', katakana: 'リ' },
  { romaji: 'ru', hiragana: 'る', katakana: 'ル' },
  { romaji: 're', hiragana: 'れ', katakana: 'レ' },
  { romaji: 'ro', hiragana: 'ろ', katakana: 'ロ' },
  
  { romaji: 'wa', hiragana: 'わ', katakana: 'ワ' },
  { romaji: 'wo', hiragana: 'を', katakana: 'ヲ' },
  { romaji: 'n', hiragana: 'ん', katakana: 'ン' },
];

const KANA_ROWS = [
  { id: 'a', label: 'A (a, i, u, e, o)', start: 0, end: 5 },
  { id: 'ka', label: 'Ka (ka, ki, ku...)', start: 5, end: 10 },
  { id: 'sa', label: 'Sa (sa, shi, su...)', start: 10, end: 15 },
  { id: 'ta', label: 'Ta (ta, chi, tsu...)', start: 15, end: 20 },
  { id: 'na', label: 'Na (na, ni, nu...)', start: 20, end: 25 },
  { id: 'ha', label: 'Ha (ha, hi, fu...)', start: 25, end: 30 },
  { id: 'ma', label: 'Ma (ma, mi, mu...)', start: 30, end: 35 },
  { id: 'ya', label: 'Ya (ya, yu, yo)', start: 35, end: 38 },
  { id: 'ra', label: 'Ra (ra, ri, ru...)', start: 38, end: 43 },
  { id: 'wa', label: 'Wa (wa, wo, n)', start: 43, end: 46 },
];

// --- Data: Common Japanese Words ---
const INITIAL_WORD_DATA = [
  { jp: 'こんにちは', en: 'Hello', romaji: 'Konnichiwa' },
  { jp: 'ありがとう', en: 'Thank you', romaji: 'Arigatou' },
  { jp: 'ねこ', en: 'Cat', romaji: 'Neko' },
  { jp: 'いぬ', en: 'Dog', romaji: 'Inu' },
  { jp: 'とり', en: 'Bird', romaji: 'Tori' },
  { jp: 'みず', en: 'Water', romaji: 'Mizu' },
  { jp: 'ほん', en: 'Book', romaji: 'Hon' },
  { jp: 'にほん', en: 'Japan', romaji: 'Nihon' },
  { jp: 'はい', en: 'Yes', romaji: 'Hai' },
  { jp: 'いいえ', en: 'No', romaji: 'Iie' },
  { jp: 'おはよう', en: 'Good Morning', romaji: 'Ohayou' },
  { jp: 'おやすみ', en: 'Good Night', romaji: 'Oyasumi' },
  { jp: 'ともだち', en: 'Friend', romaji: 'Tomodachi' },
  { jp: 'おいしい', en: 'Delicious', romaji: 'Oishii' },
  { jp: 'さむらい', en: 'Samurai', romaji: 'Samurai' },
  { jp: 'すし', en: 'Sushi', romaji: 'Sushi' },
  { jp: 'せんせい', en: 'Teacher', romaji: 'Sensei' },
  { jp: 'あい', en: 'Love', romaji: 'Ai' },
  { jp: 'あか', en: 'Red', romaji: 'Aka' },
  { jp: 'あお', en: 'Blue', romaji: 'Ao' },
  { jp: 'さくら', en: 'Cherry Blossom', romaji: 'Sakura' },
  { jp: 'やま', en: 'Mountain', romaji: 'Yama' },
  { jp: 'かわ', en: 'River', romaji: 'Kawa' },
  { jp: 'ひと', en: 'Person', romaji: 'Hito' },
  { jp: 'なまえ', en: 'Name', romaji: 'Namae' },
];

// --- Hook for Canvas Logic ---
const useCanvas = (character) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const dpr = window.devicePixelRatio || 1;
    const targetWidth = rect.width * dpr;
    const targetHeight = rect.height * dpr;

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1e293b'; 
      ctx.lineWidth = 12;
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [character]); 

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    e.preventDefault();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    e.preventDefault();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return { canvasRef, startDrawing, draw, stopDrawing, clearCanvas };
};

// --- Sub-component: Worksheet Game (Connect Lines) ---
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

// --- Sub-component: Settings Modal ---
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

// --- Sub-component: Word Manager Modal ---
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

// --- Sub-component: Writing Practice Pad (Modal) ---
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

export default function App() {
  const [activeTab, setActiveTab] = useState('study'); 
  const [scriptType, setScriptType] = useState('hiragana');
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // DEFAULT: All rows selected (KANA_ROWS.map...)
  const [selectedRows, setSelectedRows] = useState(KANA_ROWS.map(r => r.id));
  
  // Computed Active Data
  const activeKana = useMemo(() => {
    let result = [];
    KANA_ROWS.forEach(row => {
      if (selectedRows.includes(row.id)) {
        result = [...result, ...kanaData.slice(row.start, row.end)];
      }
    });
    return result.length > 0 ? result : kanaData.slice(0, 5); // Fallback to 'a' row if nothing selected
  }, [selectedRows]);

  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Word Quiz State
  const [wordList, setWordList] = useState(INITIAL_WORD_DATA);
  const [showWordManager, setShowWordManager] = useState(false);
  const [wordQuizMode, setWordQuizMode] = useState('en-jp'); // 'en-jp' or 'jp-en'
  const [wordQuizDifficulty, setWordQuizDifficulty] = useState('normal'); // 'normal' or 'easy'
  const [currentWordQuestion, setCurrentWordQuestion] = useState(null);
  const [wordScore, setWordScore] = useState(0);
  const [wordStreak, setWordStreak] = useState(0);
  const [wordFeedback, setWordFeedback] = useState(null);
  const [selectedWordOption, setSelectedWordOption] = useState(null);

  // Writing Practice State
  const [writingChar, setWritingChar] = useState(null);

  // Writing Quiz State
  const [writeQuizItem, setWriteQuizItem] = useState(null);
  const [writeQuizRevealed, setWriteQuizRevealed] = useState(false);
  const [writeQuizHint, setWriteQuizHint] = useState(false);
  const [writeQuizScore, setWriteQuizScore] = useState(0);
  
  const writeQuizCanvas = useCanvas(writeQuizItem);

  // --- Effects ---

  // Reset/Regenerate when dependencies change or TAB CHANGES
  useEffect(() => {
    if (activeTab === 'quiz') generateQuestion();
    if (activeTab === 'write-quiz') generateWriteQuiz();
    if (activeTab === 'word-quiz') generateWordQuestion();
  }, [activeTab, activeKana, scriptType, wordQuizMode, wordList]); // Added wordList to dependencies

  // --- Logic ---

  const generateQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    
    // Safety check for empty data
    const pool = activeKana.length > 0 ? activeKana : kanaData.slice(0, 5);
    
    const randomIndex = Math.floor(Math.random() * pool.length);
    const correctItem = pool[randomIndex];
    
    const distractors = [];
    // Ideally pick distractors from active pool, but fallback to full if pool is too small
    const distractorPool = pool.length >= 4 ? pool : kanaData;

    let attempts = 0;
    while (distractors.length < 3 && attempts < 100) {
      const dIndex = Math.floor(Math.random() * distractorPool.length);
      const potential = distractorPool[dIndex];
      if (potential.romaji !== correctItem.romaji && !distractors.includes(potential)) {
        distractors.push(potential);
      }
      attempts++;
    }
    
    const options = [correctItem, ...distractors].sort(() => Math.random() - 0.5);
    setCurrentQuestion({ item: correctItem, options: options });
  };

  const generateWordQuestion = () => {
    setWordFeedback(null);
    setSelectedWordOption(null);
    
    if (wordList.length === 0) {
      setCurrentWordQuestion(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * wordList.length);
    const correctItem = wordList[randomIndex];

    const distractors = [];
    let attempts = 0;
    // Allow generation even with few words, just repeat or pick fewer options
    while (distractors.length < 3 && attempts < 100) {
      const dIndex = Math.floor(Math.random() * wordList.length);
      const potential = wordList[dIndex];
      // Basic check to ensure unique objects if list is large enough, otherwise duplicates might happen
      if (potential.romaji !== correctItem.romaji && !distractors.includes(potential)) {
        distractors.push(potential);
      }
      attempts++;
    }

    const options = [correctItem, ...distractors].sort(() => Math.random() - 0.5);
    setCurrentWordQuestion({ item: correctItem, options: options });
  };

  const generateWriteQuiz = () => {
    const pool = activeKana.length > 0 ? activeKana : kanaData.slice(0, 5);
    const randomIndex = Math.floor(Math.random() * pool.length);
    setWriteQuizItem(pool[randomIndex]);
    setWriteQuizRevealed(false);
    setWriteQuizHint(false);
    if (writeQuizCanvas.clearCanvas) writeQuizCanvas.clearCanvas();
  };

  const handleScriptChange = (type) => {
    setScriptType(type);
  };

  const handleAnswer = (option) => {
    if (feedback) return;
    setSelectedOption(option);
    if (option.romaji === currentQuestion.item.romaji) {
      setFeedback('correct');
      setScore(s => s + 10);
      setStreak(s => s + 1);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  const handleWordAnswer = (option) => {
    if (wordFeedback) return;
    setSelectedWordOption(option);
    
    if (option.romaji === currentWordQuestion.item.romaji) {
      setWordFeedback('correct');
      setWordScore(s => s + 10);
      setWordStreak(s => s + 1);
    } else {
      setWordFeedback('incorrect');
      setWordStreak(0);
    }
  };

  const handleWriteQuizGrade = (correct) => {
    if (correct) setWriteQuizScore(s => s + 1);
    generateWriteQuiz();
  };

  const handleWritingNav = (direction) => {
    if (!writingChar) return;
    const currentIndex = activeKana.findIndex(k => k.romaji === writingChar.romaji);
    
    if (currentIndex === -1) return; 

    let nextIndex = currentIndex + direction;
    if (nextIndex >= activeKana.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = activeKana.length - 1;
    setWritingChar(activeKana[nextIndex]);
  };

  // Settings Handlers
  const toggleRow = (id) => {
    setSelectedRows(prev => {
      if (prev.includes(id)) {
        // Prevent deselecting the last row
        if (prev.length === 1) return prev;
        return prev.filter(r => r !== id);
      }
      return [...prev, id];
    });
  };

  const selectAllRows = () => setSelectedRows(KANA_ROWS.map(r => r.id));
  const deselectAllRows = () => setSelectedRows(['a']); // Keep at least 'a' selected

  // Navigation Items
  const navItems = [
    { id: 'study', icon: BookOpen, label: 'Study' },
    { id: 'quiz', icon: Brain, label: 'Read Kana' },
    { id: 'write-quiz', icon: ClipboardCheck, label: 'Write Kana' },
    { id: 'word-quiz', icon: Languages, label: 'Words' },
    { id: 'connect', icon: Link2, label: 'Connect' },
  ];

  const getNavClass = (id, isMobile = false) => {
    const isActive = activeTab === id;
    const base = "flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200";
    const active = "bg-slate-900 text-white shadow-md";
    const inactive = "text-slate-500 hover:bg-slate-100 hover:text-slate-900";
    return `${base} ${isActive ? active : inactive} ${isMobile ? 'w-full text-lg' : ''}`;
  };

  return (
    <div className="flex h-[100dvh] w-full bg-slate-50 text-slate-800 font-sans selection:bg-red-100 overflow-hidden">
      {/* Global Reset to ensure full screen actually works in a fresh Vite project */}
      <style>{`
        html, body, #root {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.3s ease-out forwards;
        }
      `}</style>

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => {
            setShowSettings(false);
        }}
        selectedRows={selectedRows}
        toggleRow={toggleRow}
        selectAll={selectAllRows}
        deselectAll={deselectAllRows}
      />
      
      <WordManagerModal
        isOpen={showWordManager}
        onClose={() => setShowWordManager(false)}
        words={wordList}
        setWords={setWordList}
      />

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 z-20 shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-red-200 shadow-lg">
            JP
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Kana Dojo</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={getNavClass(item.id)}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
           <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Script Mode</div>
           <div className="flex gap-2 bg-slate-200/50 p-1 rounded-xl">
              <button onClick={() => handleScriptChange('hiragana')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${scriptType === 'hiragana' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>Hiragana</button>
              <button onClick={() => handleScriptChange('katakana')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${scriptType === 'katakana' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>Katakana</button>
           </div>
        </div>
      </aside>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col animate-slide-in-left">
            <div className="p-6 flex justify-between items-center border-b border-slate-100">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">JP</div>
                  <h1 className="text-xl font-bold text-slate-900">Kana Dojo</h1>
               </div>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                 <X size={24} />
               </button>
            </div>
            <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
               {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={getNavClass(item.id, true)}
                  >
                    <item.icon size={24} />
                    {item.label}
                  </button>
               ))}
            </nav>
            <div className="p-6 bg-slate-50 border-t border-slate-200">
               <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Script Mode</div>
               <div className="flex gap-2">
                  <button onClick={() => { handleScriptChange('hiragana'); setIsMobileMenuOpen(false); }} className={`flex-1 py-3 text-sm font-bold rounded-xl border-2 transition-all ${scriptType === 'hiragana' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 bg-white text-slate-600'}`}>Hiragana</button>
                  <button onClick={() => { handleScriptChange('katakana'); setIsMobileMenuOpen(false); }} className={`flex-1 py-3 text-sm font-bold rounded-xl border-2 transition-all ${scriptType === 'katakana' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 bg-white text-slate-600'}`}>Katakana</button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* MOBILE HEADER */}
        <header className="bg-white shadow-sm h-16 flex md:hidden items-center justify-between px-4 z-10 shrink-0 border-b border-slate-100">
           <div className="flex items-center gap-3">
             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg">
               <Menu size={24} />
             </button>
             <div className="font-bold text-lg text-slate-800 truncate max-w-[150px]">
               {navItems.find(n => n.id === activeTab)?.label}
             </div>
           </div>
           
           <div className="flex items-center gap-2">
             {['study', 'quiz', 'write-quiz'].includes(activeTab) && (
               <button onClick={() => setShowSettings(true)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                 <Settings size={20} />
               </button>
             )}
             <button 
                onClick={() => handleScriptChange(scriptType === 'hiragana' ? 'katakana' : 'hiragana')}
                className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-bold uppercase tracking-wide min-w-[48px] text-center"
             >
                {scriptType === 'hiragana' ? 'HIRA' : 'KATA'}
             </button>
           </div>
        </header>

        {/* DESKTOP HEADER */}
        <header className="hidden md:flex h-20 items-center justify-between px-8 bg-white border-b border-slate-100 shrink-0">
           <div>
             <h2 className="text-2xl font-bold text-slate-800">{navItems.find(n => n.id === activeTab)?.label}</h2>
             <p className="text-sm text-slate-400 font-medium">Master your Japanese skills</p>
           </div>
           <div className="flex items-center gap-4">
              {['study', 'quiz', 'write-quiz'].includes(activeTab) && (
                 <button onClick={() => setShowSettings(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition-colors border border-slate-200">
                    <Settings size={18} />
                    <span>Filter</span>
                 </button>
              )}
           </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 bg-slate-50/50">
           <div className="max-w-5xl mx-auto min-h-full pb-20 md:pb-0 flex flex-col">
              
              {activeTab === 'study' && (
                <div className="animate-fade-in">
                  <div className="text-center mb-8 md:hidden">
                    <h2 className="text-xl font-bold mb-1">
                      {scriptType === 'hiragana' ? 'Hiragana' : 'Katakana'} Chart
                    </h2>
                    <p className="text-slate-500 text-sm">Tap to practice</p>
                  </div>

                  <div className="grid grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                    {activeKana.map((kana) => (
                      <button 
                        key={kana.romaji}
                        onClick={() => setWritingChar(kana)}
                        className="bg-white aspect-square rounded-2xl shadow-sm border-2 border-slate-100 flex flex-col items-center justify-center hover:border-red-400 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
                      >
                        <span className="text-3xl sm:text-4xl md:text-5xl font-medium mb-1 text-slate-700 group-hover:text-red-500 transition-colors">
                          {scriptType === 'hiragana' ? kana.hiragana : kana.katakana}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-300 group-hover:text-slate-400 uppercase tracking-wide">
                          {kana.romaji}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'quiz' && (
                <div className="max-w-4xl mx-auto animate-fade-in h-full flex flex-col justify-center py-4">
                  <div className="flex items-center gap-8 mb-4 px-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
                      <span className="text-2xl font-bold text-slate-900 leading-none">{score}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        Streak <Trophy size={12} className="text-yellow-500" />
                      </span>
                      <span className="text-2xl font-bold text-orange-500 leading-none">{streak}</span>
                    </div>
                  </div>

                  {currentQuestion && (
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative flex-1 max-h-[800px] flex flex-col">
                      <div className="h-56 sm:h-80 bg-slate-50 flex items-center justify-center border-b border-slate-100 shrink-0">
                        <span className="text-8xl sm:text-9xl font-medium text-slate-800">
                          {scriptType === 'hiragana' 
                            ? currentQuestion.item.hiragana 
                            : currentQuestion.item.katakana}
                        </span>
                      </div>

                      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
                        <h3 className="text-center text-slate-400 font-bold uppercase tracking-wider text-xs mb-4">
                          Select the correct sound
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                          {currentQuestion.options.map((option, idx) => {
                            let buttonStyle = "bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600";
                            
                            if (feedback === 'correct') {
                              if (option.romaji === currentQuestion.item.romaji) {
                                buttonStyle = "bg-green-50 border-2 border-green-500 text-green-700 shadow-sm";
                              } else {
                                 buttonStyle = "opacity-40 border-slate-100 bg-slate-50";
                              }
                            } else if (feedback === 'incorrect') {
                               if (option.romaji === currentQuestion.item.romaji) {
                                 buttonStyle = "bg-green-50 border-2 border-green-500 text-green-700 shadow-sm";
                               } else if (selectedOption?.romaji === option.romaji) {
                                 buttonStyle = "bg-red-50 border-2 border-red-500 text-red-700 shadow-sm";
                               } else {
                                  buttonStyle = "opacity-40 border-slate-100 bg-slate-50";
                               }
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => handleAnswer(option)}
                                disabled={!!feedback}
                                className={`h-14 sm:h-16 rounded-xl text-lg sm:text-xl font-bold transition-all duration-200 ${buttonStyle}`}
                              >
                                {option.romaji}
                              </button>
                            );
                          })}
                        </div>

                        {feedback && (
                          <div className="mt-4 animate-fade-in">
                            <div className={`p-3 rounded-xl flex flex-col gap-2 ${feedback === 'correct' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 font-bold text-base">
                                  {feedback === 'correct' ? <><CheckCircle size={20} /> Correct!</> : <><XCircle size={20} /> Incorrect</>}
                                </div>
                                <button 
                                  onClick={generateQuestion}
                                  className="px-5 py-2 bg-white rounded-lg shadow-sm text-sm font-bold hover:shadow-md transition-all flex items-center gap-2 text-slate-800"
                                >
                                  Next <ArrowRight size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'word-quiz' && (
                <div className="max-w-4xl mx-auto animate-fade-in h-full flex flex-col justify-center py-4">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-8">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
                        <span className="text-2xl font-bold text-slate-900 leading-none">{wordScore}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          Streak <Trophy size={12} className="text-yellow-500" />
                        </span>
                        <span className="text-2xl font-bold text-orange-500 leading-none">{wordStreak}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowWordManager(true)}
                      className="p-2 bg-white border border-slate-200 text-slate-500 hover:text-slate-700 rounded-lg hover:shadow-sm transition-all"
                      title="Manage Words"
                    >
                      <List size={18} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mb-3 gap-2">
                    <button
                      onClick={() => setWordQuizMode(wordQuizMode === 'en-jp' ? 'jp-en' : 'en-jp')}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      <ArrowLeftRight size={14} />
                      {wordQuizMode === 'en-jp' ? 'EN → JP' : 'JP → EN'}
                    </button>
                    
                    <div className="bg-slate-200/50 p-1 rounded-lg flex text-xs font-bold">
                        <button 
                          onClick={() => setWordQuizDifficulty('normal')}
                          className={`px-3 py-1 rounded-md transition-all ${wordQuizDifficulty === 'normal' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          Normal
                        </button>
                        <button 
                          onClick={() => setWordQuizDifficulty('easy')}
                          className={`px-3 py-1 rounded-md transition-all ${wordQuizDifficulty === 'easy' ? 'bg-white shadow-sm text-green-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          Easy
                        </button>
                    </div>
                  </div>

                  {wordList.length === 0 ? (
                     <div className="bg-white p-12 rounded-3xl shadow-lg border border-slate-100 text-center">
                        <div className="inline-flex p-4 bg-blue-50 text-blue-500 rounded-2xl mb-6">
                           <List size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No Words Added</h3>
                        <p className="text-slate-500 mb-8 max-w-xs mx-auto">Add some vocabulary words to start building your quiz!</p>
                        <button 
                           onClick={() => setShowWordManager(true)}
                           className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
                        >
                           Add Words
                        </button>
                     </div>
                  ) : currentWordQuestion && (
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative flex-1 max-h-[800px] flex flex-col">
                      <div className="h-56 sm:h-80 bg-slate-50 flex items-center justify-center border-b border-slate-100 p-4 relative shrink-0">
                        <span className="text-4xl sm:text-5xl font-bold text-slate-800 text-center flex flex-col items-center gap-3">
                          {wordQuizMode === 'en-jp' ? (
                              <>
                                 {currentWordQuestion.item.en}
                                 {wordQuizDifficulty === 'easy' && (
                                    <span className="text-lg sm:text-xl text-slate-400 font-normal bg-white px-3 py-1 rounded-full border border-slate-100">
                                       {currentWordQuestion.item.romaji}
                                    </span>
                                 )}
                              </>
                          ) : (
                              <>
                                 {currentWordQuestion.item.jp}
                                 {wordQuizDifficulty === 'easy' && (
                                    <span className="text-lg sm:text-xl text-slate-400 font-normal bg-white px-3 py-1 rounded-full border border-slate-100">
                                       {currentWordQuestion.item.romaji}
                                    </span>
                                 )}
                              </>
                          )}
                        </span>
                      </div>

                      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
                        <div className="grid grid-cols-2 gap-3">
                          {currentWordQuestion.options.map((option, idx) => {
                            let buttonStyle = "bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700";
                            
                            if (wordFeedback === 'correct') {
                              if (option.romaji === currentWordQuestion.item.romaji) {
                                buttonStyle = "bg-green-50 border-2 border-green-500 text-green-700 shadow-sm";
                              } else {
                                 buttonStyle = "opacity-40 border-slate-100 bg-slate-50";
                              }
                            } else if (wordFeedback === 'incorrect') {
                               if (option.romaji === currentWordQuestion.item.romaji) {
                                 buttonStyle = "bg-green-50 border-2 border-green-500 text-green-700 shadow-sm";
                               } else if (selectedWordOption?.romaji === option.romaji) {
                                 buttonStyle = "bg-red-50 border-2 border-red-500 text-red-700 shadow-sm";
                               } else {
                                  buttonStyle = "opacity-40 border-slate-100 bg-slate-50";
                               }
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => handleWordAnswer(option)}
                                disabled={!!wordFeedback}
                                className={`h-14 sm:h-16 rounded-xl font-bold transition-all duration-200 ${buttonStyle} px-1 flex items-center justify-center`}
                              >
                                 <span className={`${wordQuizMode === 'en-jp' ? 'text-xl' : 'text-sm'} leading-tight line-clamp-2`}>
                                   {wordQuizMode === 'en-jp' ? option.jp : option.en}
                                 </span>
                              </button>
                            );
                          })}
                        </div>

                        {wordFeedback && (
                          <div className="mt-4 animate-fade-in">
                            <div className={`p-3 rounded-xl flex flex-col gap-2 ${wordFeedback === 'correct' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 font-bold text-lg">
                                  {wordFeedback === 'correct' ? <><CheckCircle size={20} /> Correct!</> : <><XCircle size={20} /> Incorrect</>}
                                </div>
                                <button 
                                  onClick={generateWordQuestion}
                                  className="px-5 py-2 bg-white rounded-lg shadow-sm text-sm font-bold hover:shadow-md transition-all flex items-center gap-2 text-slate-800"
                                >
                                  Next <ArrowRight size={14} />
                                </button>
                              </div>
                              
                              <div className="text-center pt-2 border-t border-black/5 flex flex-col gap-1">
                                 <span className="text-xl font-bold">{currentWordQuestion.item.jp}</span>
                                 <span className="text-xs opacity-60 font-bold uppercase tracking-wider">{currentWordQuestion.item.romaji}</span>
                                 <span className="text-sm font-medium text-slate-600">{currentWordQuestion.item.en}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'connect' && <WorksheetGame words={wordList} />}

              {activeTab === 'write-quiz' && writeQuizItem && (
                <div className="max-w-4xl mx-auto animate-fade-in w-full flex-1 flex flex-col justify-center py-4">
                   <div className="flex justify-between items-center mb-4 px-2">
                     <div className="flex items-center gap-2 text-slate-600">
                       <ClipboardCheck size={20} className="text-slate-400"/>
                       <span className="font-bold text-sm uppercase tracking-wide">Writing Quiz</span>
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
                         <button 
                            onClick={() => writeQuizCanvas.clearCanvas()} 
                            className="p-2 bg-white shadow-md border border-slate-200 rounded-lg text-slate-600 hover:text-red-500 hover:shadow-lg transition-all"
                         >
                           <RotateCcw size={18} />
                         </button>
                         <button 
                            onClick={() => setWriteQuizHint(!writeQuizHint)} 
                            className={`p-2 bg-white shadow-md border border-slate-200 rounded-lg transition-all hover:shadow-lg ${writeQuizHint ? 'text-yellow-500 border-yellow-200 ring-2 ring-yellow-100' : 'text-slate-400'}`}
                         >
                           <HelpCircle size={18} />
                         </button>
                       </div>

                       <div className="relative w-[360px] h-[360px] border-2 border-slate-200 rounded-3xl bg-white shadow-sm overflow-hidden">
                          <div className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none ${(writeQuizRevealed || writeQuizHint) ? 'transition-all duration-500' : ''} ${writeQuizRevealed ? 'opacity-100 scale-100' : (writeQuizHint ? 'opacity-20 scale-90' : 'opacity-0 scale-75')}`}>
                              <span className={`text-[250px] leading-none font-serif ${writeQuizRevealed ? 'text-red-500' : 'text-slate-400'}`} style={{ fontFamily: '"Noto Serif JP", serif' }}>
                                {scriptType === 'hiragana' ? writeQuizItem.hiragana : writeQuizItem.katakana}
                              </span>
                          </div>

                          <canvas
                            ref={writeQuizCanvas.canvasRef}
                            className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
                            onMouseDown={writeQuizCanvas.startDrawing}
                            onMouseMove={writeQuizCanvas.draw}
                            onMouseUp={writeQuizCanvas.stopDrawing}
                            onMouseLeave={writeQuizCanvas.stopDrawing}
                            onTouchStart={writeQuizCanvas.startDrawing}
                            onTouchMove={writeQuizCanvas.draw}
                            onTouchEnd={writeQuizCanvas.stopDrawing}
                          />
                       </div>
                     </div>

                     <div className="p-4 bg-slate-50 border-t border-slate-100 shrink-0">
                        {!writeQuizRevealed ? (
                          <button 
                            onClick={() => setWriteQuizRevealed(true)}
                            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-base"
                          >
                            Check Answer
                          </button>
                        ) : (
                          <div className="flex flex-col gap-3 animate-fade-in">
                            <p className="text-center font-bold text-slate-500 uppercase tracking-wide text-[10px]">Self Evaluation</p>
                            <div className="flex gap-3">
                              <button 
                                onClick={() => handleWriteQuizGrade(false)}
                                className="flex-1 py-3 bg-white text-red-600 border-2 border-red-100 rounded-xl font-bold hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center gap-2 shadow-sm text-sm"
                              >
                                <XCircle size={20} /> Incorrect
                              </button>
                              <button 
                                onClick={() => handleWriteQuizGrade(true)}
                                className="flex-1 py-3 bg-green-500 text-white border-2 border-green-500 rounded-xl font-bold hover:bg-green-600 hover:border-green-600 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm"
                              >
                                <CheckCircle size={20} /> Correct
                              </button>
                            </div>
                          </div>
                        )}
                     </div>
                   </div>
                </div>
              )}

              {writingChar && (
                 <WritingPad 
                    character={scriptType === 'hiragana' ? writingChar.hiragana : writingChar.katakana}
                    romaji={writingChar.romaji}
                    type={scriptType}
                    onClose={() => setWritingChar(null)}
                    onNext={() => handleWritingNav(1)}
                    onPrev={() => handleWritingNav(-1)}
                 />
              )}
           </div>
        </main>
      </div>
    </div>
  );
}