import React, { useState, useCallback } from 'react';
import { ALL_VOCAB, LESSON_META as LESSONS, TYPE_META as TYPES } from '../data/vocabulary';

const MODES = [
  { id: 'jp-th', label: 'JP → TH' },
  { id: 'th-jp', label: 'TH → JP' },
  { id: 'jp-en', label: 'JP → EN' },
  { id: 'en-jp', label: 'EN → JP' },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashcardPage() {
  const [lesson, setLesson] = useState(0);
  const [mode, setMode] = useState('jp-th');
  const [showRomaji, setShowRomaji] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [known, setKnown] = useState(new Set());
  const [unknown, setUnknown] = useState(new Set());
  const [showStats, setShowStats] = useState(false);

  const buildDeck = useCallback((l, t) => {
    let base = l === 0 ? ALL_VOCAB : ALL_VOCAB.filter(v => v.lesson === l);
    if (t !== 'all') base = base.filter(v => v.type === t);
    return shuffle(base);
  }, []);

  const [deck, setDeck] = useState(() => buildDeck(0, 'all'));

  const resetAll = useCallback((newDeck) => {
    setDeck(newDeck);
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    setShowStats(false);
  }, []);

  const handleLessonChange = (l) => {
    setLesson(l);
    resetAll(buildDeck(l, typeFilter));
  };

  const handleTypeChange = (t) => {
    setTypeFilter(t);
    resetAll(buildDeck(lesson, t));
  };

  const currentLesson = LESSONS.find(l => l.id === lesson);
  const card = deck[index];
  const total = deck.length;
  const progress = total > 0 ? (index / total) * 100 : 0;
  const isDone = total > 0 && index >= total;

  const handleFlip = () => total > 0 && setFlipped(f => !f);

  const handleKnow = (knew) => {
    const newKnown = new Set(known);
    const newUnknown = new Set(unknown);
    if (knew) newKnown.add(card.jp); else newUnknown.add(card.jp);
    setKnown(newKnown);
    setUnknown(newUnknown);
    setFlipped(false);
    setTimeout(() => {
      if (index + 1 >= total) setShowStats(true); else setIndex(i => i + 1);
    }, 500);
  };

  const getDisplayContent = (side) => {
    if (!card) return { main: '', sub: '', label: '' };
    const isFront = side === 'front';
    const romajiContent = showRomaji ? card.romaji : '';
    switch (mode) {
      case 'jp-th':
        return isFront
          ? { main: card.jp, sub: romajiContent, label: 'ภาษาญี่ปุ่น' }
          : { main: card.th, sub: `บทที่ ${card.lesson} — ${card.type}`, label: 'แปลว่า (TH)' };
      case 'th-jp':
        return isFront
          ? { main: card.th, sub: `บทที่ ${card.lesson}`, label: 'ภาษาไทย' }
          : { main: card.jp, sub: romajiContent, label: 'Japanese' };
      case 'jp-en':
        return isFront
          ? { main: card.jp, sub: romajiContent, label: 'Japanese' }
          : { main: card.en, sub: `Lesson ${card.lesson} — ${card.type}`, label: 'Meaning (EN)' };
      case 'en-jp':
        return isFront
          ? { main: card.en, sub: `Lesson ${card.lesson}`, label: 'English' }
          : { main: card.jp, sub: romajiContent, label: 'Japanese' };
      default: return {};
    }
  };

  const front = getDisplayContent('front');
  const back = getDisplayContent('back');

  if (showStats || (total > 0 && isDone)) {
    const knownPct = Math.round((known.size / total) * 100);
    return (
      <div style={s.page}>
        <div style={s.resultWrap}>
          <div style={{ ...s.resultHeader, background: currentLesson.color }}>
            <p style={s.resultSub}>สรุปผลการฝึก</p>
            <h2 style={s.resultTitle}>{knownPct >= 80 ? 'ทำได้ดีมาก！' : 'สู้ๆ ฝึกอีกนิด！'}</h2>
          </div>
          <div style={s.resultBody}>
            <div style={s.statRow}>
              <div style={{ ...s.statBox, borderColor: '#22c55e' }}>
                <span style={{ ...s.statNum, color: '#16a34a' }}>{known.size}</span>
                <span style={s.statLabel}>จำได้ ✓</span>
              </div>
              <div style={{ ...s.statBox, borderColor: '#ef4444' }}>
                <span style={{ ...s.statNum, color: '#dc2626' }}>{unknown.size}</span>
                <span style={s.statLabel}>ยังไม่ได้ ✗</span>
              </div>
            </div>
            <div style={s.progressTrack}><div style={{ ...s.progressKnown, width: `${knownPct}%` }} /></div>
            <p style={s.statCountText}>ความสำเร็จ: {knownPct}% ({known.size}/{total} คำ)</p>
            {unknown.size > 0 && (
              <div style={s.missedSection}>
                <p style={{ fontSize: 11, fontWeight: 900, marginBottom: 8, color: '#ef4444' }}>คำที่ต้องทวน:</p>
                {deck.filter(c => unknown.has(c.jp)).map((c, i) => (
                  <div key={i} style={s.missedCard}>
                    <div>
                      <b>{c.jp}</b>
                      {showRomaji && <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 8 }}>{c.romaji}</span>}
                    </div>
                    <span style={{ fontSize: 12, color: '#64748b' }}>{mode.includes('en') ? c.en : c.th}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ ...s.actionBtn, background: '#f1f5f9' }} onClick={() => resetAll(buildDeck(lesson, typeFilter))}>เริ่มใหม่</button>
              {unknown.size > 0 && (
                <button style={{ ...s.actionBtn, background: currentLesson.color, color: '#fff' }}
                  onClick={() => resetAll(shuffle(deck.filter(c => unknown.has(c.jp))))}>ฝึกที่พลาด</button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.controls}>
        <div style={s.settingBar}>
          <label style={s.toggleLabel}>
            <input type="checkbox" checked={showRomaji} onChange={() => setShowRomaji(!showRomaji)} style={s.toggleInput} />
            <span style={s.toggleText}>แสดงคำอ่าน (Romaji)</span>
          </label>
        </div>

        <div style={s.tabRow}>
          {LESSONS.map(l => (
            <button key={l.id} onClick={() => handleLessonChange(l.id)} style={{
              ...s.tab, background: lesson === l.id ? l.color : '#fff', color: lesson === l.id ? '#fff' : '#64748b',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>{l.label}</button>
          ))}
        </div>
        <div style={s.modeRow}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => { setMode(m.id); setFlipped(false); }} style={{
              ...s.modeBtn, background: mode === m.id ? currentLesson.color : '#fff', color: mode === m.id ? '#fff' : '#64748b',
              border: `1px solid ${mode === m.id ? 'transparent' : '#e2e8f0'}`
            }}>{m.label}</button>
          ))}
        </div>
        <div style={s.typeRow}>
          {TYPES.map(t => {
            const count = (lesson === 0 ? ALL_VOCAB : ALL_VOCAB.filter(v => v.lesson === lesson))
              .filter(v => t.id === 'all' ? true : v.type === t.id).length;
            const isActive = typeFilter === t.id;
            return (
              <button key={t.id} onClick={() => handleTypeChange(t.id)} style={{
                ...s.typeBtn, background: isActive ? currentLesson.color : '#fff', color: isActive ? '#fff' : '#64748b',
                opacity: count === 0 ? 0.4 : 1, cursor: count === 0 ? 'not-allowed' : 'pointer',
                border: `1px solid ${isActive ? 'transparent' : '#e2e8f0'}`
              }} disabled={count === 0}>
                {t.icon} {t.label} <small style={{ ...s.countBadge, color: isActive ? '#fff' : '#94a3b8' }}>{count}</small>
              </button>
            );
          })}
        </div>
      </div>

      {total > 0 ? (
        <>
          <div style={s.progressWrap}>
            <div style={s.progressRow}><span>{index + 1} / {total}</span><span>✓ {known.size} ✗ {unknown.size}</span></div>
            <div style={s.progressTrack}>
              <div style={{ ...s.progressFill, width: `${progress}%`, background: currentLesson.color }} />
              <div style={{ ...s.progressKnown, width: `${(known.size / total) * 100}%` }} />
            </div>
          </div>

          <div style={s.cardOuter} onClick={handleFlip}>
            <div style={{ ...s.cardInner, transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
              <div style={{ ...s.cardFace, ...s.cardFront, borderColor: currentLesson.color }}>
                <p style={s.cardHint}>{front.label}</p>
                <p style={s.cardMain}>{front.main}</p>
                {front.sub && <p style={s.cardRomaji}>{front.sub}</p>}
                <p style={s.tapHint}>แตะเพื่อเฉลย</p>
              </div>
              <div style={{ ...s.cardFace, ...s.cardBack, borderColor: currentLesson.color, background: currentLesson.bg }}>
                <p style={s.cardHint}>{back.label}</p>
                <p style={{ ...s.cardMain, color: currentLesson.color, fontSize: back.main.length > 15 ? 28 : 40 }}>{back.main}</p>
                {back.sub && <p style={{ ...s.cardRomaji, color: currentLesson.color + 'aa' }}>{back.sub}</p>}
              </div>
            </div>
          </div>

          <div style={{ ...s.btnRow, opacity: flipped ? 1 : 0, pointerEvents: flipped ? 'auto' : 'none' }}>
            <button style={s.btnUnknown} onClick={() => handleKnow(false)}>ยังไม่ได้ ✗</button>
            <button style={s.btnSkip} onClick={() => { setFlipped(false); setIndex(i => (i + 1) % total); }}>ข้าม</button>
            <button style={s.btnKnown} onClick={() => handleKnow(true)}>จำได้แล้ว ✓</button>
          </div>
        </>
      ) : (
        <div style={{ padding: 60, color: '#94a3b8', textAlign: 'center' }}>
          <p style={{ fontSize: 24 }}>📭</p>
          <p>ไม่พบคำศัพท์ในหมวดนี้</p>
        </div>
      )}
      <button style={s.resetBtn} onClick={() => resetAll(buildDeck(lesson, typeFilter))}>↺ สับไพ่ใหม่</button>
    </div>
  );
}

const s = {
  page: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', background: '#f1f5f9' },
  controls: { width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 },
  settingBar: { display: 'flex', justifyContent: 'flex-end', padding: '0 5px' },
  toggleLabel: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' },
  toggleInput: { width: 16, height: 16, accentColor: '#0f172a' },
  toggleText: { fontSize: 12, fontWeight: 700, color: '#64748b' },
  tabRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  tab: { padding: '10px 18px', borderRadius: 16, border: 'none', fontSize: 13, fontWeight: 800, cursor: 'pointer', transition: '0.2s' },
  modeRow: { display: 'flex', gap: 8 },
  modeBtn: { flex: 1, padding: '10px', borderRadius: 16, fontSize: 12, fontWeight: 800, cursor: 'pointer', transition: '0.2s' },
  typeRow: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  typeBtn: { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 16, border: 'none', fontSize: 11, fontWeight: 700, transition: '0.2s' },
  countBadge: { background: 'rgba(0,0,0,0.05)', padding: '1px 6px', borderRadius: 8, fontSize: 10, marginLeft: 4 },
  progressWrap: { width: '100%', maxWidth: 560, marginBottom: 15 },
  progressRow: { display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, color: '#64748b', marginBottom: 6 },
  progressTrack: { position: 'relative', height: 10, background: '#e2e8f0', borderRadius: 5, overflow: 'hidden' },
  progressFill: { position: 'absolute', height: '100%', opacity: 0.2 },
  progressKnown: { position: 'absolute', height: '100%', background: '#22c55e', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' },
  cardOuter: { width: '100%', maxWidth: 560, height: 340, perspective: 1200, cursor: 'pointer', marginBottom: 25 },
  cardInner: { position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' },
  cardFace: { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: '#fff', borderRadius: 32, border: '3px solid', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 25, boxShadow: '0 15px 35px rgba(0,0,0,0.05)' },
  cardFront: {},
  cardBack: { transform: 'rotateY(180deg)' },
  cardHint: { fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 20 },
  cardMain: { fontSize: 48, fontWeight: 900, textAlign: 'center', margin: 0, color: '#1e293b' },
  cardRomaji: { fontSize: 20, color: '#64748b', marginTop: 15, fontWeight: 600 },
  tapHint: { fontSize: 11, color: '#cbd5e1', marginTop: 'auto', fontWeight: 700 },
  btnRow: { display: 'flex', gap: 15, width: '100%', maxWidth: 560, transition: '0.3s' },
  btnUnknown: { flex: 1, padding: '18px', background: '#fff', color: '#e11d48', border: '2px solid #e11d48', borderRadius: 20, fontWeight: 900, cursor: 'pointer', fontSize: 14 },
  btnKnown: { flex: 1, padding: '18px', background: '#22c55e', color: '#fff', border: '2px solid #22c55e', borderRadius: 20, fontWeight: 900, cursor: 'pointer', fontSize: 14 },
  btnSkip: { padding: '0 25px', background: '#fff', border: '2px solid #e2e8f0', borderRadius: 20, color: '#64748b', fontWeight: 800, cursor: 'pointer' },
  resetBtn: { marginTop: 30, background: 'none', border: 'none', color: '#94a3b8', fontWeight: 800, cursor: 'pointer', fontSize: 13 },
  resultWrap: { width: '100%', maxWidth: 500, background: '#fff', borderRadius: 32, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' },
  resultHeader: { padding: 45, textAlign: 'center' },
  resultSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 900, textTransform: 'uppercase' },
  resultTitle: { fontSize: 36, color: '#fff', margin: '12px 0 0' },
  resultBody: { padding: 35 },
  statRow: { display: 'flex', gap: 15, marginBottom: 25 },
  statBox: { flex: 1, border: '3.5px solid', borderRadius: 24, padding: 20, textAlign: 'center' },
  statNum: { fontSize: 36, fontWeight: 900, display: 'block' },
  statLabel: { fontSize: 13, fontWeight: 800, color: '#64748b' },
  statCountText: { textAlign: 'center', fontSize: 15, fontWeight: 800, color: '#475569', margin: '15px 0 25px' },
  missedSection: { background: '#fff1f2', borderRadius: 24, padding: 20, marginBottom: 25, maxHeight: 200, overflowY: 'auto' },
  missedCard: { display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1.5px solid #fee2e2', fontSize: 14 },
  actionBtn: { flex: 1, padding: '18px', borderRadius: 20, border: 'none', fontWeight: 900, cursor: 'pointer', transition: '0.2s' },
};
