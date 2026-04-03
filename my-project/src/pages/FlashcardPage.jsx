import React, { useState, useMemo, useCallback } from 'react';

// ─── All vocabulary with EN translation ────────────────────────────────────
const ALL_VOCAB = [
  // ── Lesson 1 ──────────────────────────────────────────────────────────────
  { jp: 'わたし', th: 'ฉัน / ผม / ดิฉัน', en: 'I / Me', romaji: 'watashi', lesson: 1, type: 'คำนาม' },
  { jp: 'あなた', th: 'คุณ', en: 'You', romaji: 'anata', lesson: 1, type: 'คำนาม' },
  { jp: 'あのひと', th: 'คนนั้น', en: 'That person', romaji: 'ano hito', lesson: 1, type: 'คำนาม' },
  { jp: 'あのかた', th: 'คนนั้น (สุภาพ)', en: 'That person (polite)', romaji: 'ano kata', lesson: 1, type: 'คำนาม' },
  { jp: 'せんせい', th: 'ครู / อาจารย์', en: 'Teacher / Professor', romaji: 'sensei', lesson: 1, type: 'อาชีพ' },
  { jp: 'きょうし', th: 'ครู / ผู้สอน (พูดถึงตัวเอง)', en: 'Teacher (as occupation)', romaji: 'kyoushi', lesson: 1, type: 'อาชีพ' },
  { jp: 'がくせい', th: 'นักเรียน / นักศึกษา', en: 'Student', romaji: 'gakusei', lesson: 1, type: 'อาชีพ' },
  { jp: 'かいしゃいん', th: 'พนักงานบริษัท', en: 'Company employee', romaji: 'kaishain', lesson: 1, type: 'อาชีพ' },
  { jp: 'ぎんこういん', th: 'พนักงานธนาคาร', en: 'Bank employee', romaji: 'ginkouin', lesson: 1, type: 'อาชีพ' },
  { jp: 'いしゃ', th: 'หมอ / แพทย์', en: 'Doctor', romaji: 'isha', lesson: 1, type: 'อาชีพ' },
  { jp: 'けんきゅうしゃ', th: 'นักวิจัย', en: 'Researcher', romaji: 'kenkyuusha', lesson: 1, type: 'อาชีพ' },
  { jp: 'だいがく', th: 'มหาวิทยาลัย', en: 'University', romaji: 'daigaku', lesson: 1, type: 'สถานที่' },
  { jp: 'びょういん', th: 'โรงพยาบาล', en: 'Hospital', romaji: 'byouin', lesson: 1, type: 'สถานที่' },
  { jp: 'だれ', th: 'ใคร', en: 'Who', romaji: 'dare', lesson: 1, type: 'คำถาม' },
  { jp: 'どなた', th: 'ใคร (สุภาพ)', en: 'Who (polite)', romaji: 'donata', lesson: 1, type: 'คำถาม' },
  { jp: 'なんさい', th: 'อายุเท่าไร', en: 'How old', romaji: 'nansai', lesson: 1, type: 'คำถาม' },
  { jp: 'おいくつ', th: 'อายุเท่าไร (สุภาพ)', en: 'How old (polite)', romaji: 'oikutsu', lesson: 1, type: 'คำถาม' },
  { jp: 'はい', th: 'ใช่ / ครับ / ค่ะ', en: 'Yes', romaji: 'hai', lesson: 1, type: 'สำนวน' },
  { jp: 'いいえ', th: 'ไม่ใช่ / เปล่า', en: 'No', romaji: 'iie', lesson: 1, type: 'สำนวน' },
  { jp: 'はじめまして', th: 'ยินดีที่ได้รู้จัก', en: "Nice to meet you", romaji: 'hajimemashite', lesson: 1, type: 'สำนวน' },
  { jp: 'どうぞよろしく', th: 'ขอฝากเนื้อฝากตัวด้วย', en: 'Please be kind to me', romaji: 'douzo yoroshiku', lesson: 1, type: 'สำนวน' },
  { jp: 'しつれいですが', th: 'ขอประทานโทษ', en: 'Excuse me, but...', romaji: 'shitsurei desu ga', lesson: 1, type: 'สำนวน' },
  { jp: 'おなまえは', th: 'ขอทราบชื่อด้วยครับ/ค่ะ', en: 'What is your name?', romaji: 'onamae wa', lesson: 1, type: 'สำนวน' },

  // ── Lesson 2 ──────────────────────────────────────────────────────────────
  { jp: 'これ', th: 'นี่ / สิ่งนี้', en: 'This (near me)', romaji: 'kore', lesson: 2, type: 'คำชี้' },
  { jp: 'それ', th: 'นั่น / สิ่งนั้น', en: 'That (near you)', romaji: 'sore', lesson: 2, type: 'คำชี้' },
  { jp: 'あれ', th: 'โน่น / สิ่งโน้น', en: 'That over there', romaji: 'are', lesson: 2, type: 'คำชี้' },
  { jp: 'この～', th: '~ นี้', en: 'This ~ (modifier)', romaji: 'kono~', lesson: 2, type: 'คำชี้' },
  { jp: 'その～', th: '~ นั้น', en: 'That ~ (modifier)', romaji: 'sono~', lesson: 2, type: 'คำชี้' },
  { jp: 'あの～', th: '~ โน้น', en: 'That ~ over there', romaji: 'ano~', lesson: 2, type: 'คำชี้' },
  { jp: 'ほん', th: 'หนังสือ', en: 'Book', romaji: 'hon', lesson: 2, type: 'ของใช้' },
  { jp: 'じしょ', th: 'พจนานุกรม', en: 'Dictionary', romaji: 'jisho', lesson: 2, type: 'ของใช้' },
  { jp: 'ざっし', th: 'นิตยสาร / วารสาร', en: 'Magazine', romaji: 'zasshi', lesson: 2, type: 'ของใช้' },
  { jp: 'しんぶん', th: 'หนังสือพิมพ์', en: 'Newspaper', romaji: 'shimbun', lesson: 2, type: 'ของใช้' },
  { jp: 'ノート', th: 'สมุดโน้ต', en: 'Notebook', romaji: 'nooto', lesson: 2, type: 'ของใช้' },
  { jp: 'てちょう', th: 'สมุดบันทึกพกพา', en: 'Pocket diary', romaji: 'techou', lesson: 2, type: 'ของใช้' },
  { jp: 'めいし', th: 'นามบัตร', en: 'Business card', romaji: 'meishi', lesson: 2, type: 'ของใช้' },
  { jp: 'えんぴつ', th: 'ดินสอ', en: 'Pencil', romaji: 'enpitsu', lesson: 2, type: 'ของใช้' },
  { jp: 'ボールペン', th: 'ปากกาลูกลื่น', en: 'Ballpoint pen', romaji: 'boorupen', lesson: 2, type: 'ของใช้' },
  { jp: 'シャープペンシル', th: 'ดินสอกด', en: 'Mechanical pencil', romaji: 'shaapupenshiru', lesson: 2, type: 'ของใช้' },
  { jp: 'かぎ', th: 'กุญแจ', en: 'Key', romaji: 'kagi', lesson: 2, type: 'ของใช้' },
  { jp: 'とけい', th: 'นาฬิกา', en: 'Watch / Clock', romaji: 'tokei', lesson: 2, type: 'ของใช้' },
  { jp: 'かさ', th: 'ร่ม', en: 'Umbrella', romaji: 'kasa', lesson: 2, type: 'ของใช้' },
  { jp: 'かばん', th: 'กระเป๋า', en: 'Bag', romaji: 'kaban', lesson: 2, type: 'ของใช้' },
  { jp: 'テレビ', th: 'โทรทัศน์', en: 'TV', romaji: 'terebi', lesson: 2, type: 'ของใช้' },
  { jp: 'ラジオ', th: 'วิทยุ', en: 'Radio', romaji: 'rajio', lesson: 2, type: 'ของใช้' },
  { jp: 'カメラ', th: 'กล้องถ่ายรูป', en: 'Camera', romaji: 'kamera', lesson: 2, type: 'ของใช้' },
  { jp: 'コンピューター', th: 'คอมพิวเตอร์', en: 'Computer', romaji: 'konpyuutaa', lesson: 2, type: 'ของใช้' },
  { jp: 'くるま', th: 'รถยนต์', en: 'Car / Vehicle', romaji: 'kuruma', lesson: 2, type: 'ของใช้' },
  { jp: 'つくえ', th: 'โต๊ะเรียน', en: 'Desk', romaji: 'tsukue', lesson: 2, type: 'ของใช้' },
  { jp: 'いす', th: 'เก้าอี้', en: 'Chair', romaji: 'isu', lesson: 2, type: 'ของใช้' },
  { jp: 'チョコレート', th: 'ช็อกโกแลต', en: 'Chocolate', romaji: 'chokoreeto', lesson: 2, type: 'ของใช้' },
  { jp: 'コーヒー', th: 'กาแฟ', en: 'Coffee', romaji: 'koohii', lesson: 2, type: 'ของใช้' },
  { jp: 'おみやげ', th: 'ของฝาก', en: 'Souvenir', romaji: 'omiyage', lesson: 2, type: 'ของใช้' },
  { jp: 'なん', th: 'อะไร', en: 'What', romaji: 'nan', lesson: 2, type: 'คำถาม' },
  { jp: 'そう', th: 'เช่นนั้น', en: 'So / That way', romaji: 'sou', lesson: 2, type: 'สำนวน' },
  { jp: 'あのう', th: 'เอ่อ...', en: 'Um...', romaji: 'anou', lesson: 2, type: 'สำนวน' },
  { jp: 'どうぞ', th: 'เชิญครับ/ค่ะ', en: 'Here you go / Please', romaji: 'douzo', lesson: 2, type: 'สำนวน' },
  { jp: 'ありがとうございます', th: 'ขอบคุณมาก', en: 'Thank you very much', romaji: 'arigatou gozaimasu', lesson: 2, type: 'สำนวน' },
  { jp: 'そうですか', th: 'งั้นเหรอ', en: 'I see / Is that so?', romaji: 'sou desu ka', lesson: 2, type: 'สำนวน' },
  { jp: 'ちがいます', th: 'ไม่ใช่', en: "No, it isn't / That's wrong", romaji: 'chigaimasu', lesson: 2, type: 'สำนวน' },

  // ── Lesson 3 ──────────────────────────────────────────────────────────────
  { jp: 'ここ', th: 'ที่นี่', en: 'Here', romaji: 'koko', lesson: 3, type: 'สถานที่' },
  { jp: 'そこ', th: 'ที่นั่น', en: 'There', romaji: 'soko', lesson: 3, type: 'สถานที่' },
  { jp: 'あそこ', th: 'ที่โน่น', en: 'Over there', romaji: 'asoko', lesson: 3, type: 'สถานที่' },
  { jp: 'どこ', th: 'ที่ไหน', en: 'Where', romaji: 'doko', lesson: 3, type: 'คำถาม' },
  { jp: 'こちら', th: 'ทางนี้ (สุภาพ)', en: 'This way (polite)', romaji: 'kochira', lesson: 3, type: 'สถานที่' },
  { jp: 'そちら', th: 'ทางนั้น (สุภาพ)', en: 'That way (polite)', romaji: 'sochira', lesson: 3, type: 'สถานที่' },
  { jp: 'あちら', th: 'ทางโน้น (สุภาพ)', en: 'That way over there (polite)', romaji: 'achira', lesson: 3, type: 'สถานที่' },
  { jp: 'どちら', th: 'ทางไหน (สุภาพ)', en: 'Which way (polite)', romaji: 'dochira', lesson: 3, type: 'คำถาม' },
  { jp: 'きょうしつ', th: 'ห้องเรียน', en: 'Classroom', romaji: 'kyoushitsu', lesson: 3, type: 'สถานที่' },
  { jp: 'しょくどう', th: 'โรงอาหาร', en: 'Cafeteria / Dining hall', romaji: 'shokudou', lesson: 3, type: 'สถานที่' },
  { jp: 'じむしょ', th: 'สำนักงาน', en: 'Office', romaji: 'jimusho', lesson: 3, type: 'สถานที่' },
  { jp: 'かいぎしつ', th: 'ห้องประชุม', en: 'Meeting room', romaji: 'kaigishitsu', lesson: 3, type: 'สถานที่' },
  { jp: 'うけつけ', th: 'โต๊ะประชาสัมพันธ์', en: 'Reception desk', romaji: 'uketsuke', lesson: 3, type: 'สถานที่' },
  { jp: 'ロビー', th: 'ล็อบบี้', en: 'Lobby', romaji: 'robii', lesson: 3, type: 'สถานที่' },
  { jp: 'へや', th: 'ห้อง', en: 'Room', romaji: 'heya', lesson: 3, type: 'สถานที่' },
  { jp: 'トイレ', th: 'ห้องน้ำ', en: 'Toilet / Restroom', romaji: 'toire', lesson: 3, type: 'สถานที่' },
  { jp: 'かいだん', th: 'บันได', en: 'Stairs', romaji: 'kaidan', lesson: 3, type: 'สถานที่' },
  { jp: 'エレベーター', th: 'ลิฟต์', en: 'Elevator', romaji: 'erebeetaa', lesson: 3, type: 'สถานที่' },
  { jp: 'エスカレーター', th: 'บันไดเลื่อน', en: 'Escalator', romaji: 'esukareetaa', lesson: 3, type: 'สถานที่' },
  { jp: 'じどうはんばいき', th: 'เครื่องขายของอัตโนมัติ', en: 'Vending machine', romaji: 'jidouhanbaiki', lesson: 3, type: 'สถานที่' },
  { jp: 'でんว', th: 'โทรศัพท์', en: 'Telephone', romaji: 'denwa', lesson: 3, type: 'ของใช้' },
  { jp: 'かいしゃ', th: 'บริษัท', en: 'Company', romaji: 'kaisha', lesson: 3, type: 'สถานที่' },
  { jp: 'うち', th: 'บ้าน', en: 'House / Home', romaji: 'uchi', lesson: 3, type: 'สถานที่' },
  { jp: 'くつ', th: 'รองเท้า', en: 'Shoes', romaji: 'kutsu', lesson: 3, type: 'ของใช้' },
  { jp: 'ネクタイ', th: 'เนกไท', en: 'Necktie', romaji: 'nekutai', lesson: 3, type: 'ของใช้' },
  { jp: 'ワイン', th: 'ไวน์', en: 'Wine', romaji: 'wain', lesson: 3, type: 'ของใช้' },
  { jp: 'うりば', th: 'เคาน์เตอร์ขายของ', en: 'Sales counter', romaji: 'uriba', lesson: 3, type: 'สถานที่' },
  { jp: 'ちか', th: 'ชั้นใต้ดิน', en: 'Basement', romaji: 'chika', lesson: 3, type: 'สถานที่' },
  { jp: 'いくら', th: 'ราคาเท่าไร', en: 'How much', romaji: 'ikura', lesson: 3, type: 'คำถาม' },
  { jp: 'ひゃく', th: '100', en: 'Hundred', romaji: 'hyaku', lesson: 3, type: 'ตัวเลข' },
  { jp: 'せん', th: '1,000', en: 'Thousand', romaji: 'sen', lesson: 3, type: 'ตัวเลข' },
  { jp: 'まん', th: '10,000', en: 'Ten thousand', romaji: 'man', lesson: 3, type: 'ตัวเลข' },
  { jp: 'すみません', th: 'ขอโทษ', en: 'Excuse me / I am sorry', romaji: 'sumimasen', lesson: 3, type: 'สำนวน' },
  { jp: 'どうも', th: 'ขอบคุณ', en: 'Thanks (short)', romaji: 'doumo', lesson: 3, type: 'สำนวน' },
  { jp: 'いらっしゃいませ', th: 'ยินดีต้อนรับ', en: 'Welcome', romaji: 'irasshaimase', lesson: 3, type: 'สำนวน' },
  { jp: 'みせてください', th: 'ขอดูหน่อย', en: 'Please show me', romaji: 'misete kudasai', lesson: 3, type: 'สำนวน' },
  { jp: 'ください', th: 'ขอ...', en: 'Please give me...', romaji: 'kudasai', lesson: 3, type: 'สำนวน' },
  { jp: 'じゃ', th: 'งั้นก็...', en: 'Well then...', romaji: 'ja', lesson: 3, type: 'สำนวน' },
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
  const [showRomaji, setShowRomaji] = useState(true); // New Setting
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
                <p style={{fontSize: 11, fontWeight: 900, marginBottom: 8, color: '#ef4444'}}>คำที่ต้องทวน:</p>
                {deck.filter(c => unknown.has(c.jp)).map((c, i) => (
                  <div key={i} style={s.missedCard}>
                    <div>
                      <b>{c.jp}</b>
                      {showRomaji && <span style={{fontSize: 11, color: '#94a3b8', marginLeft: 8}}>{c.romaji}</span>}
                    </div>
                    <span style={{fontSize: 12, color: '#64748b'}}>{mode.includes('en') ? c.en : c.th}</span>
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
        {/* Top Setting Bar */}
        <div style={s.settingBar}>
           <label style={s.toggleLabel}>
             <input 
               type="checkbox" 
               checked={showRomaji} 
               onChange={() => setShowRomaji(!showRomaji)} 
               style={s.toggleInput}
             />
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
            <button key={m.id} onClick={() => {setMode(m.id); setFlipped(false);}} style={{
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
                {t.icon} {t.label} <small style={{...s.countBadge, color: isActive ? '#fff' : '#94a3b8'}}>{count}</small>
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
              {/* Front */}
              <div style={{ ...s.cardFace, ...s.cardFront, borderColor: currentLesson.color }}>
                <p style={s.cardHint}>{front.label}</p>
                <p style={s.cardMain}>{front.main}</p>
                {front.sub && <p style={s.cardRomaji}>{front.sub}</p>}
                <p style={s.tapHint}>แตะเพื่อเฉลย</p>
              </div>
              {/* Back */}
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
          <p style={{fontSize: 24}}>📭</p>
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
  actionBtn: { flex: 1, padding: '18px', borderRadius: 20, border: 'none', fontWeight: 900, cursor: 'pointer', transition: '0.2s' }
};