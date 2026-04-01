import React, { useState, useMemo, useCallback } from 'react';

// ─── All vocabulary from Lessons 1, 2, 3 ────────────────────────────────────
const ALL_VOCAB = [
  // ── Lesson 1 ──────────────────────────────────────────────────────────────
  { jp: 'わたし', th: 'ฉัน / ผม / ดิฉัน', romaji: 'watashi', lesson: 1, type: 'คำนาม' },
  { jp: 'あなた', th: 'คุณ', romaji: 'anata', lesson: 1, type: 'คำนาม' },
  { jp: 'あのひと', th: 'คนนั้น', romaji: 'ano hito', lesson: 1, type: 'คำนาม' },
  { jp: 'あのかた', th: 'คนนั้น (สุภาพ)', romaji: 'ano kata', lesson: 1, type: 'คำนาม' },
  { jp: 'せんせい', th: 'ครู / อาจารย์', romaji: 'sensei', lesson: 1, type: 'อาชีพ' },
  { jp: 'きょうし', th: 'ครู / ผู้สอน (ใช้พูดถึงตัวเอง)', romaji: 'kyoushi', lesson: 1, type: 'อาชีพ' },
  { jp: 'ที่นี่', jp: 'がくせい', th: 'นักเรียน / นักศึกษา', romaji: 'gakusei', lesson: 1, type: 'อาชีพ' },
  { jp: 'かいしゃいん', th: 'พนักงานบริษัท', romaji: 'kaishain', lesson: 1, type: 'อาชีพ' },
  { jp: 'ぎんこういん', th: 'พนักงานธนาคาร', romaji: 'ginkouin', lesson: 1, type: 'อาชีพ' },
  { jp: 'いしゃ', th: 'หมอ / แพทย์', romaji: 'isha', lesson: 1, type: 'อาชีพ' },
  { jp: 'けんきゅうしゃ', th: 'นักวิจัย', romaji: 'kenkyuusha', lesson: 1, type: 'อาชีพ' },
  { jp: 'だいがく', th: 'มหาวิทยาลัย', romaji: 'daigaku', lesson: 1, type: 'สถานที่' },
  { jp: 'びょういん', th: 'โรงพยาบาล', romaji: 'byouin', lesson: 1, type: 'สถานที่' },
  { jp: 'だれ', th: 'ใคร', romaji: 'dare', lesson: 1, type: 'คำถาม' },
  { jp: 'どなた', th: 'ใคร (สุภาพ)', romaji: 'donata', lesson: 1, type: 'คำถาม' },
  { jp: 'なんさい', th: 'อายุเท่าไร', romaji: 'nansai', lesson: 1, type: 'คำถาม' },
  { jp: 'おいくつ', th: 'อายุเท่าไร (สุภาพ)', romaji: 'oikutsu', lesson: 1, type: 'คำถาม' },
  { jp: 'はい', th: 'ใช่ / ครับ / ค่ะ', romaji: 'hai', lesson: 1, type: 'สำนวน' },
  { jp: 'いいえ', th: 'ไม่ใช่ / เปล่า', romaji: 'iie', lesson: 1, type: 'สำนวน' },
  { jp: 'はじめまして', th: 'ยินดีที่ได้รู้จัก', romaji: 'hajimemashite', lesson: 1, type: 'สำนวน' },
  { jp: 'どうぞよろしく', th: 'ขอฝากเนื้อฝากตัวด้วย', romaji: 'douzo yoroshiku', lesson: 1, type: 'สำนวน' },
  { jp: 'しつれいですが', th: 'ขอประทานโทษ / ขอเสียมารยาท', romaji: 'shitsurei desu ga', lesson: 1, type: 'สำนวน' },
  { jp: 'おなまえは', th: 'ขอทราบชื่อด้วยครับ/ค่ะ', romaji: 'onamae wa', lesson: 1, type: 'สำนวน' },

  // ── Lesson 2 ──────────────────────────────────────────────────────────────
  { jp: 'これ', th: 'นี่ / สิ่งนี้', romaji: 'kore', lesson: 2, type: 'คำชี้' },
  { jp: 'それ', th: 'นั่น / สิ่งนั้น', romaji: 'sore', lesson: 2, type: 'คำชี้' },
  { jp: 'あれ', th: 'โน่น / สิ่งโน้น', romaji: 'are', lesson: 2, type: 'คำชี้' },
  { jp: 'この～', th: '~ นี้', romaji: 'kono~', lesson: 2, type: 'คำชี้' },
  { jp: 'その～', th: '~ นั้น', romaji: 'sono~', lesson: 2, type: 'คำชี้' },
  { jp: 'あの～', th: '~ โน้น', romaji: 'ano~', lesson: 2, type: 'คำชี้' },
  { jp: 'ほん', th: 'หนังสือ', romaji: 'hon', lesson: 2, type: 'ของใช้' },
  { jp: 'じしょ', th: 'พจนานุกรม', romaji: 'jisho', lesson: 2, type: 'ของใช้' },
  { jp: 'ざっし', th: 'นิตยสาร / วารสาร', romaji: 'zasshi', lesson: 2, type: 'ของใช้' },
  { jp: 'しんぶん', th: 'หนังสือพิมพ์', romaji: 'shimbun', lesson: 2, type: 'ของใช้' },
  { jp: 'ノート', th: 'สมุดโน้ต', romaji: 'nooto', lesson: 2, type: 'ของใช้' },
  { jp: 'てちょう', th: 'สมุดบันทึกพกพา', romaji: 'techou', lesson: 2, type: 'ของใช้' },
  { jp: 'めいし', th: 'นามบัตร', romaji: 'meishi', lesson: 2, type: 'ของใช้' },
  { jp: 'えんぴつ', th: 'ดินสอ', romaji: 'enpitsu', lesson: 2, type: 'ของใช้' },
  { jp: 'ボールペン', th: 'ปากกาลูกลื่น', romaji: 'boorupen', lesson: 2, type: 'ของใช้' },
  { jp: 'シャープペンシル', th: 'ดินสอกด', romaji: 'shaapupenshiru', lesson: 2, type: 'ของใช้' },
  { jp: 'かぎ', th: 'กุญแจ', romaji: 'kagi', lesson: 2, type: 'ของใช้' },
  { jp: 'とけい', th: 'นาฬิกา', romaji: 'tokei', lesson: 2, type: 'ของใช้' },
  { jp: 'かさ', th: 'ร่ม', romaji: 'kasa', lesson: 2, type: 'ของใช้' },
  { jp: 'かばん', th: 'กระเป๋า', romaji: 'kaban', lesson: 2, type: 'ของใช้' },
  { jp: 'テレビ', th: 'โทรทัศน์', romaji: 'terebi', lesson: 2, type: 'ของใช้' },
  { jp: 'ラジオ', th: 'วิทยุ', romaji: 'rajio', lesson: 2, type: 'ของใช้' },
  { jp: 'カメラ', th: 'กล้องถ่ายรูป', romaji: 'kamera', lesson: 2, type: 'ของใช้' },
  { jp: 'コンピューター', th: 'คอมพิวเตอร์', romaji: 'konpyuutaa', lesson: 2, type: 'ของใช้' },
  { jp: 'くるま', th: 'รถยนต์', romaji: 'kuruma', lesson: 2, type: 'ของใช้' },
  { jp: 'つくえ', th: 'โต๊ะเรียน / โต๊ะทำงาน', romaji: 'tsukue', lesson: 2, type: 'ของใช้' },
  { jp: 'いす', th: 'เก้าอี้', romaji: 'isu', lesson: 2, type: 'ของใช้' },
  { jp: 'チョコレート', th: 'ช็อกโกแลต', romaji: 'chokoreeto', lesson: 2, type: 'ของใช้' },
  { jp: 'コーヒー', th: 'กาแฟ', romaji: 'koohii', lesson: 2, type: 'ของใช้' },
  { jp: 'おみยげ', th: 'ของฝาก / ของที่ระลึก', romaji: 'omiyage', lesson: 2, type: 'ของใช้' },
  { jp: 'なん', th: 'อะไร', romaji: 'nan', lesson: 2, type: 'คำถาม' },
  { jp: 'そう', th: 'เช่นนั้น / เป็นเช่นนั้น', romaji: 'sou', lesson: 2, type: 'สำนวน' },
  { jp: 'あのう', th: 'เอ่อ (ใช้เมื่อต้องการเรียก)', romaji: 'anou', lesson: 2, type: 'สำนวน' },
  { jp: 'どうぞ', th: 'เชิญครับ/ค่ะ', romaji: 'douzo', lesson: 2, type: 'สำนวน' },
  { jp: 'ありがとうございます', th: 'ขอบคุณมาก', romaji: 'arigatou gozaimasu', lesson: 2, type: 'สำนวน' },
  { jp: 'そうですか', th: 'งั้นเหรอ', romaji: 'sou desu ka', lesson: 2, type: 'สำนวน' },
  { jp: 'ちがいます', th: 'ไม่ใช่', romaji: 'chigaimasu', lesson: 2, type: 'สำนวน' },

  // ── Lesson 3 ──────────────────────────────────────────────────────────────
  { jp: 'ここ', th: 'ที่นี่ / ตรงนี้', romaji: 'koko', lesson: 3, type: 'สถานที่' },
  { jp: 'そこ', th: 'ที่นั่น / ตรงนั้น', romaji: 'soko', lesson: 3, type: 'สถานที่' },
  { jp: 'あそこ', th: 'ที่โน่น / ตรงโน้น', romaji: 'asoko', lesson: 3, type: 'สถานที่' },
  { jp: 'どこ', th: 'ที่ไหน / ตรงไหน', romaji: 'doko', lesson: 3, type: 'คำถาม' },
  { jp: 'こちら', th: 'ทางนี้ (สุภาพ)', romaji: 'kochira', lesson: 3, type: 'สถานที่' },
  { jp: 'そちら', th: 'ทางนั้น (สุภาพ)', romaji: 'sochira', lesson: 3, type: 'สถานที่' },
  { jp: 'あちら', th: 'ทางโน้น (สุภาพ)', romaji: 'achira', lesson: 3, type: 'สถานที่' },
  { jp: 'どちら', th: 'ทางไหน (สุภาพ)', romaji: 'dochira', lesson: 3, type: 'คำถาม' },
  { jp: 'きょうしつ', th: 'ห้องเรียน', romaji: 'kyoushitsu', lesson: 3, type: 'สถานที่' },
  { jp: 'しょくどう', th: 'โรงอาหาร', romaji: 'shokudou', lesson: 3, type: 'สถานที่' },
  { jp: 'じむしょ', th: 'สำนักงาน / ออฟฟิศ', romaji: 'jimusho', lesson: 3, type: 'สถานที่' },
  { jp: 'かいぎしつ', th: 'ห้องประชุม', romaji: 'kaigishitsu', lesson: 3, type: 'สถานที่' },
  { jp: 'うけつけ', th: 'โต๊ะประชาสัมพันธ์', romaji: 'uketsuke', lesson: 3, type: 'สถานที่' },
  { jp: 'ロビー', th: 'ล็อบบี้', romaji: 'robii', lesson: 3, type: 'สถานที่' },
  { jp: 'へや', th: 'ห้อง', romaji: 'heya', lesson: 3, type: 'สถานที่' },
  { jp: 'トイレ', th: 'ห้องน้ำ / ห้องส้วม', romaji: 'toire', lesson: 3, type: 'สถานที่' },
  { jp: 'かいだん', th: 'บันได', romaji: 'kaidan', lesson: 3, type: 'สถานที่' },
  { jp: 'エレベーター', th: 'ลิฟต์', romaji: 'erebeetaa', lesson: 3, type: 'สถานที่' },
  { jp: 'エスカレーター', th: 'บันไดเลื่อน', romaji: 'esukareetaa', lesson: 3, type: 'สถานที่' },
  { jp: 'じどうはんばいき', th: 'เครื่องขายสินค้าอัตโนมัติ', romaji: 'jidouhanbaiki', lesson: 3, type: 'สถานที่' },
  { jp: 'でんわ', th: 'โทรศัพท์', romaji: 'denwa', lesson: 3, type: 'ของใช้' },
  { jp: 'かいしゃ', th: 'บริษัท', romaji: 'kaisha', lesson: 3, type: 'สถานที่' },
  { jp: 'うち', th: 'บ้าน', romaji: 'uchi', lesson: 3, type: 'สถานที่' },
  { jp: 'くつ', th: 'รองเท้า', romaji: 'kutsu', lesson: 3, type: 'ของใช้' },
  { jp: 'ネクタイ', th: 'เนกไท', romaji: 'nekutai', lesson: 3, type: 'ของใช้' },
  { jp: 'ワイン', th: 'ไวน์', romaji: 'wain', lesson: 3, type: 'ของใช้' },
  { jp: 'うりば', th: 'เคาน์เตอร์ขายสินค้า', romaji: 'uriba', lesson: 3, type: 'สถานที่' },
  { jp: 'ちか', th: 'ชั้นใต้ดิน', romaji: 'chika', lesson: 3, type: 'สถานที่' },
  { jp: 'いくら', th: 'ราคาเท่าไร', romaji: 'ikura', lesson: 3, type: 'คำถาม' },
  { jp: 'ひゃく', th: 'ร้อย (100)', romaji: 'hyaku', lesson: 3, type: 'ตัวเลข' },
  { jp: 'せん', th: 'พัน (1,000)', romaji: 'sen', lesson: 3, type: 'ตัวเลข' },
  { jp: 'まん', th: 'หมื่น (10,000)', romaji: 'man', lesson: 3, type: 'ตัวเลข' },
  { jp: 'すみません', th: 'ขอโทษครับ/ค่ะ', romaji: 'sumimasen', lesson: 3, type: 'สำนวน' },
  { jp: 'どうก็', th: 'ขอบคุณ (แบบสั้น)', romaji: 'doumo', lesson: 3, type: 'สำนวน' },
  { jp: 'いらっしゃいませ', th: 'ยินดีต้อนรับ', romaji: 'irasshaimase', lesson: 3, type: 'สำนวน' },
  { jp: 'みせてください', th: 'ขอดูหน่อย', romaji: 'misete kudasai', lesson: 3, type: 'สำนวน' },
  { jp: 'ください', th: 'ขอ (สิ่งนั้น)', romaji: 'kudasai', lesson: 3, type: 'สำนวน' },
  { jp: 'じゃ', th: 'เอาละ / งั้น', romaji: 'ja', lesson: 3, type: 'สำนวน' },
];

const LESSONS = [
  { id: 0, label: 'ทั้งหมด', color: '#0f172a', bg: '#f8fafc' },
  { id: 1, label: 'บทที่ 1', color: '#e11d48', bg: '#fff1f2' },
  { id: 2, label: 'บทที่ 2', color: '#0369a1', bg: '#f0f9ff' },
  { id: 3, label: 'บทที่ 3', color: '#059669', bg: '#ecfdf5' },
];

const TYPES = [
  { id: 'all',   label: 'ทุกประเภท',  icon: '📚' },
  { id: 'คำนาม', label: 'คำนาม',      icon: '👤' },
  { id: 'อาชีพ', label: 'อาชีพ',      icon: '💼' },
  { id: 'สถานที่', label: 'สถานที่',  icon: '🏢' },
  { id: 'ของใช้', label: 'ของใช้',    icon: '📦' },
  { id: 'คำชี้',  label: 'คำชี้',     icon: '👉' },
  { id: 'คำถาม', label: 'คำถาม',      icon: '❓' },
  { id: 'ตัวเลข', label: 'ตัวเลข',   icon: '🔢' },
  { id: 'สำนวน', label: 'สำนวน',      icon: '💬' },
];

const MODES = [
  { id: 'jp-th', label: 'JP → TH', hint: 'เห็นภาษาญี่ปุ่น → แปลเป็นไทย' },
  { id: 'th-jp', label: 'TH → JP', hint: 'เห็นภาษาไทย → นึกคำญี่ปุ่น' },
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
  const [typeFilter, setTypeFilter] = useState('all');
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [known, setKnown] = useState(new Set());
  const [unknown, setUnknown] = useState(new Set());
  const [showStats, setShowStats] = useState(false);

  // Function to build a deck based on current lesson and type
  const buildDeck = useCallback((l, t) => {
    let base = l === 0 ? ALL_VOCAB : ALL_VOCAB.filter(v => v.lesson === l);
    if (t !== 'all') {
      base = base.filter(v => v.type === t);
    }
    // If no words found for that combination, fallback or return empty
    return shuffle(base);
  }, []);

  // Initial and reactive deck state
  const [deck, setDeck] = useState(() => buildDeck(0, 'all'));

  const resetState = useCallback((newDeck) => {
    setDeck(newDeck);
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    setShowStats(false);
  }, []);

  const handleLessonChange = (l) => {
    setLesson(l);
    // When changing lesson, we might want to keep the type filter
    // but we must check if that type exists in the new lesson
    const newDeck = buildDeck(l, typeFilter);
    resetState(newDeck);
  };

  const handleTypeChange = (t) => {
    setTypeFilter(t);
    const newDeck = buildDeck(lesson, t);
    resetState(newDeck);
  };

  const currentLesson = LESSONS.find(l => l.id === lesson);
  const card = deck[index];
  const total = deck.length;
  const progress = total > 0 ? ((index) / total) * 100 : 0;
  const isDone = total > 0 && index >= total;

  const handleFlip = () => {
      if (total > 0) setFlipped(f => !f);
  };

  const handleKnow = (knew) => {
    const newKnown = new Set(known);
    const newUnknown = new Set(unknown);
    
    if (knew) newKnown.add(card.jp); 
    else newUnknown.add(card.jp);
    
    setKnown(newKnown);
    setUnknown(newUnknown);
    setFlipped(false);

    if (index + 1 >= total) {
      setShowStats(true);
    } else {
      setIndex(i => i + 1);
    }
  };

  const front = mode === 'jp-th' ? card?.jp : card?.th;
  const back = mode === 'jp-th' ? card?.th : card?.jp;
  const frontSub = mode === 'jp-th' ? card?.romaji : `บทที่ ${card?.lesson}`;
  const backSub = mode === 'jp-th' ? `บทที่ ${card?.lesson} — ${card?.type}` : card?.romaji;

  // ── RESULTS ─────────────────────────────────────────────────────────────
  if (showStats || (total > 0 && isDone)) {
    const knownPct = Math.round((known.size / total) * 100);
    return (
      <div style={s.page}>
        <div style={s.resultWrap}>
          <div style={{ ...s.resultHeader, background: currentLesson.color }}>
            <p style={s.resultSub}>ผลลัพธ์การฝึก</p>
            <h2 style={s.resultTitle}>{knownPct >= 80 ? 'เก่งมาก！' : knownPct >= 50 ? 'ดีมาก！' : 'ฝึกเพิ่มอีกนิด！'}</h2>
          </div>
          <div style={s.resultBody}>
            <div style={s.statRow}>
              <div style={{ ...s.statBox, borderColor: '#22c55e' }}>
                <span style={{ ...s.statNum, color: '#16a34a' }}>{known.size}</span>
                <span style={s.statLabel}>จำได้แล้ว ✓</span>
              </div>
              <div style={{ ...s.statBox, borderColor: '#ef4444' }}>
                <span style={{ ...s.statNum, color: '#dc2626' }}>{unknown.size}</span>
                <span style={s.statLabel}>ต้องฝึกเพิ่ม ✗</span>
              </div>
            </div>

            <div style={{ background: '#f1f5f9', borderRadius: 8, height: 12, overflow: 'hidden', margin: '16px 0' }}>
              <div style={{ height: '100%', width: `${knownPct}%`, background: '#22c55e', borderRadius: 8, transition: 'width 0.8s ease' }} />
            </div>
            <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b', fontWeight: 700, margin: '0 0 20px' }}>
              จำได้ {known.size} / {total} คำ ({knownPct}%)
            </p>

            {unknown.size > 0 && (
              <div style={s.missedSection}>
                <p style={s.missedTitle}>คำที่ต้องฝึกเพิ่ม</p>
                <div style={s.missedGrid}>
                  {deck.filter(c => unknown.has(c.jp)).map((c, i) => (
                    <div key={i} style={s.missedCard}>
                      <span style={s.missedJP}>{c.jp}</span>
                      <span style={s.missedTH}>{c.th}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button style={{ ...s.actionBtn, background: '#f1f5f9', color: '#334155' }} onClick={() => resetState(buildDeck(lesson, typeFilter))}>
                ฝึกใหม่ทั้งหมด
              </button>
              {unknown.size > 0 && (
                <button style={{ ...s.actionBtn, background: currentLesson.color, color: '#fff' }} onClick={() => {
                  const missed = deck.filter(c => unknown.has(c.jp));
                  resetState(shuffle(missed));
                }}>
                  ฝึกเฉพาะที่พลาด
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN FLASHCARD ────────────────────────────────────────────────────────
  return (
    <div style={s.page}>
      <div style={s.controls}>
        <div style={s.tabRow}>
          {LESSONS.map(l => (
            <button key={l.id} onClick={() => handleLessonChange(l.id)} style={{
              ...s.tab,
              background: lesson === l.id ? l.color : '#f1f5f9',
              color: lesson === l.id ? '#fff' : '#64748b',
            }}>{l.label}</button>
          ))}
        </div>
        
        <div style={s.modeRow}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => { setMode(m.id); setFlipped(false); }} style={{
              ...s.modeBtn,
              background: mode === m.id ? currentLesson.color : '#f1f5f9',
              color: mode === m.id ? '#fff' : '#64748b',
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
                ...s.typeBtn,
                background: isActive ? currentLesson.color : '#f1f5f9',
                color: isActive ? '#fff' : '#64748b',
                opacity: count === 0 ? 0.5 : 1,
                cursor: count === 0 ? 'not-allowed' : 'pointer'
              }} disabled={count === 0}>
                <span>{t.icon}</span>
                <span>{t.label}</span>
                <span style={{
                  fontSize: 9, fontWeight: 900,
                  background: isActive ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
                  color: isActive ? '#fff' : '#94a3b8',
                  borderRadius: 8, padding: '1px 5px', marginLeft: 4
                }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {total > 0 ? (
        <>
          <div style={s.progressWrap}>
            <div style={s.progressRow}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8' }}>{index + 1} / {total}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: currentLesson.color }}>✓ {known.size} &nbsp; ✗ {unknown.size}</span>
            </div>
            <div style={s.progressTrack}>
              <div style={{ ...s.progressFill, width: `${progress}%`, background: currentLesson.color }} />
              <div style={{ ...s.progressKnown, width: `${(known.size / total) * 100}%` }} />
            </div>
          </div>

          <div style={{ ...s.typeBadge, background: currentLesson.bg, color: currentLesson.color, borderColor: currentLesson.color }}>
            {card?.type} · บทที่ {card?.lesson}
          </div>

          <div style={s.cardOuter} onClick={handleFlip}>
            <div style={{ ...s.cardInner, transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
              <div style={{ ...s.cardFace, ...s.cardFront, borderColor: currentLesson.color }}>
                <p style={s.cardHint}>{mode === 'jp-th' ? 'ภาษาญี่ปุ่น' : 'ภาษาไทย'}</p>
                <p style={s.cardMain}>{front}</p>
                {mode === 'jp-th' && <p style={s.cardRomaji}>{frontSub}</p>}
                <p style={s.tapHint}>แตะเพื่อดูคำตอบ</p>
              </div>
              <div style={{ ...s.cardFace, ...s.cardBack, borderColor: currentLesson.color, background: currentLesson.bg }}>
                <p style={s.cardHint}>{mode === 'jp-th' ? 'แปลว่า' : 'ภาษาญี่ปุ่น'}</p>
                <p style={{ ...s.cardMain, color: currentLesson.color }}>{back}</p>
                <p style={{ ...s.cardRomaji, color: currentLesson.color + 'aa' }}>{backSub}</p>
              </div>
            </div>
          </div>

          <div style={{ ...s.btnRow, opacity: flipped ? 1 : 0, pointerEvents: flipped ? 'auto' : 'none', transition: 'opacity 0.3s' }}>
            <button style={s.btnUnknown} onClick={() => handleKnow(false)}>✗ ยังไม่รู้</button>
            <button style={s.btnSkip} onClick={() => { setFlipped(false); setIndex(i => Math.min(i + 1, total - 1)); }}>ข้าม</button>
            <button style={s.btnKnown} onClick={() => handleKnow(true)}>✓ รู้แล้ว</button>
          </div>
        </>
      ) : (
        <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>
          <p>ไม่พบคำศัพท์ในหมวดนี้</p>
          <button onClick={() => handleTypeChange('all')} style={{ ...s.actionBtn, marginTop: 10, background: '#f1f5f9' }}>ดูทั้งหมด</button>
        </div>
      )}

      <button style={s.resetBtn} onClick={() => resetState(buildDeck(lesson, typeFilter))}>↺ สับไพ่ใหม่</button>
    </div>
  );
}

// ─── Styles (Minimal adjustments to keep layout clean) ───────────────────────
const s = {
  page: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 16px 80px', fontFamily: "system-ui, sans-serif", minHeight: '100vh' },
  controls: { width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 },
  tabRow: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  tab: { padding: '6px 16px', borderRadius: 20, border: 'none', fontSize: 13, fontWeight: 800, cursor: 'pointer' },
  modeRow: { display: 'flex', gap: 6 },
  modeBtn: { padding: '6px 20px', borderRadius: 20, border: 'none', fontSize: 13, fontWeight: 800, cursor: 'pointer' },
  typeRow: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  typeBtn: { display: 'flex', alignItems: 'center', padding: '5px 12px', borderRadius: 20, border: 'none', fontSize: 12, fontWeight: 700 },
  progressWrap: { width: '100%', maxWidth: 600, marginBottom: 12 },
  progressRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 },
  progressTrack: { position: 'relative', height: 6, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' },
  progressFill: { position: 'absolute', height: '100%', opacity: 0.3, transition: 'width 0.4s' },
  progressKnown: { position: 'absolute', height: '100%', background: '#22c55e', transition: 'width 0.4s' },
  typeBadge: { fontSize: 11, fontWeight: 800, padding: '3px 12px', borderRadius: 20, border: '1.5px solid', marginBottom: 16 },
  cardOuter: { width: '100%', maxWidth: 560, height: 300, perspective: 1200, cursor: 'pointer', marginBottom: 20 },
  cardInner: { position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform 0.5s' },
  cardFace: { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: '#fff', borderRadius: 24, border: '2.5px solid', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' },
  cardFront: {},
  cardBack: { transform: 'rotateY(180deg)' },
  cardHint: { fontSize: 11, fontWeight: 800, color: '#94a3b8', marginBottom: 12 },
  cardMain: { fontSize: 40, fontWeight: 900, textAlign: 'center' },
  cardRomaji: { fontSize: 16, color: '#94a3b8', marginTop: 8 },
  tapHint: { fontSize: 11, color: '#cbd5e1', marginTop: 'auto' },
  btnRow: { display: 'flex', gap: 12, width: '100%', maxWidth: 560 },
  btnUnknown: { flex: 1, padding: 14, background: '#fef2f2', color: '#dc2626', border: '2px solid #fecaca', borderRadius: 16, fontWeight: 800, cursor: 'pointer' },
  btnKnown: { flex: 1, padding: 14, background: '#f0fdf4', color: '#16a34a', border: '2px solid #bbf7d0', borderRadius: 16, fontWeight: 800, cursor: 'pointer' },
  btnSkip: { padding: '14px 20px', background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: 16, color: '#94a3b8', fontWeight: 800, cursor: 'pointer' },
  resetBtn: { marginTop: 20, background: 'none', border: 'none', color: '#94a3b8', fontWeight: 700, cursor: 'pointer' },
  resultWrap: { width: '100%', maxWidth: 560, background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' },
  resultHeader: { padding: 32, textAlign: 'center' },
  resultSub: { fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 800 },
  resultTitle: { fontSize: 28, color: '#fff', margin: 0 },
  resultBody: { padding: 24 },
  statRow: { display: 'flex', gap: 10 },
  statBox: { flex: 1, border: '2px solid', borderRadius: 14, padding: 12, textAlign: 'center' },
  statNum: { fontSize: 28, fontWeight: 900 },
  statLabel: { fontSize: 11, fontWeight: 700, color: '#64748b' },
  missedSection: { background: '#fef2f2', borderRadius: 14, padding: 16, marginBottom: 16, maxHeight: 150, overflowY: 'auto' },
  missedTitle: { fontSize: 11, fontWeight: 800, color: '#dc2626', marginBottom: 10 },
  missedGrid: { display: 'flex', flexDirection: 'column', gap: 6 },
  missedCard: { display: 'flex', justifyContent: 'space-between', background: '#fff', padding: '8px 12px', borderRadius: 8 },
  missedJP: { fontWeight: 700 },
  missedTH: { color: '#dc2626', fontSize: 13 },
  actionBtn: { flex: 1, padding: 12, borderRadius: 12, border: 'none', fontWeight: 800, cursor: 'pointer' }
};