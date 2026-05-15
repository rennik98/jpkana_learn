import React, { useState, useMemo } from 'react';
import { ALL_VOCAB, LESSON_META, TYPE_META } from '../data/vocabulary';

// ── Special ordered sets for calendar-style layouts ──────────────────────────
const WEEKDAY_ORDER = [
  'げつようび','かようび','すいようび','もくようび','きんようび','どようび','にちようび'
];
const WEEKDAY_KANJI = ['月','火','水','木','金','土','日'];
const WEEKDAY_EN = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

const DATE_ORDER = [
  'ついたち','ふつか','みっか','よっか','いつか','むいか','なのか',
  'ようか','ここのか','とおか',
  'じゅうよっか','はつか','にじゅうよっか',
];
const DATE_NUMS = [1,2,3,4,5,6,7,8,9,10,14,20,24];

// Words that belong to special grid sections
const WEEKDAY_SET = new Set(WEEKDAY_ORDER);
const DATE_SET    = new Set(DATE_ORDER);

const LESSON_COLORS = {
  0: '#0f172a', 1: '#e11d48', 2: '#0369a1',
  3: '#059669', 4: '#7c3aed', 5: '#b45309', 6: '#0891b2',
};

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title, count, color }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
      <div style={{ width:4, height:22, borderRadius:2, background:color }} />
      <span style={{ fontWeight:900, fontSize:15, color:'#1e293b' }}>{title}</span>
      {count != null && (
        <span style={{ fontSize:11, fontWeight:700, color:'#94a3b8',
          background:'#f1f5f9', borderRadius:8, padding:'1px 8px' }}>{count} คำ</span>
      )}
    </div>
  );
}

// Standard table for most word types
function WordTable({ words, accentColor }) {
  return (
    <div style={{ overflowX:'auto', borderRadius:16, border:'1px solid #e2e8f0' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:14 }}>
        <thead>
          <tr style={{ background:'#f8fafc' }}>
            {['ญี่ปุ่น','คำอ่าน','ไทย','English','บท'].map(h => (
              <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:11,
                fontWeight:900, color:'#94a3b8', textTransform:'uppercase',
                letterSpacing:'0.5px', borderBottom:'1px solid #e2e8f0', whiteSpace:'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {words.map((w, i) => (
            <tr key={i} style={{ borderBottom:'1px solid #f1f5f9',
              background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ padding:'10px 14px', fontWeight:800, fontSize:18,
                color:'#1e293b', whiteSpace:'nowrap' }}>{w.jp}</td>
              <td style={{ padding:'10px 14px', color:'#64748b', fontSize:12 }}>{w.romaji}</td>
              <td style={{ padding:'10px 14px', color:'#334155', fontWeight:600 }}>{w.th}</td>
              <td style={{ padding:'10px 14px', color:'#64748b', fontSize:13 }}>{w.en}</td>
              <td style={{ padding:'10px 14px' }}>
                <span style={{ fontSize:10, fontWeight:800, color: LESSON_COLORS[w.lesson],
                  background: LESSON_COLORS[w.lesson] + '18', borderRadius:6,
                  padding:'2px 7px', whiteSpace:'nowrap' }}>บท {w.lesson}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Card grid for food / transport / people
function CardGrid({ words }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px, 1fr))', gap:10 }}>
      {words.map((w, i) => (
        <div key={i} style={{ background:'#fff', borderRadius:16, padding:'14px 12px',
          border:'1px solid #e2e8f0', boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
          display:'flex', flexDirection:'column', gap:4 }}>
          <span style={{ fontSize:22, fontWeight:900, color:'#1e293b' }}>{w.jp}</span>
          <span style={{ fontSize:10, color:'#94a3b8', fontWeight:600 }}>{w.romaji}</span>
          <span style={{ fontSize:12, color:'#334155', fontWeight:700, marginTop:2 }}>{w.th}</span>
          <span style={{ fontSize:11, color:'#64748b' }}>{w.en}</span>
          <span style={{ alignSelf:'flex-start', fontSize:10, fontWeight:800,
            color: LESSON_COLORS[w.lesson], background: LESSON_COLORS[w.lesson] + '18',
            borderRadius:6, padding:'1px 6px', marginTop:4 }}>บท {w.lesson}</span>
        </div>
      ))}
    </div>
  );
}

// Calendar-style 7-column weekday grid
function WeekdayGrid({ words }) {
  const byJp = Object.fromEntries(words.map(w => [w.jp, w]));
  return (
    <div style={{ overflowX:'auto' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'center' }}>
        <thead>
          <tr>
            {WEEKDAY_KANJI.map((k, i) => (
              <th key={i} style={{ padding:'8px 4px', fontSize:18, fontWeight:900,
                color: i === 5 ? '#0369a1' : i === 6 ? '#e11d48' : '#1e293b',
                borderBottom:'2px solid #e2e8f0', minWidth:90 }}>{k}曜日</th>
            ))}
          </tr>
          <tr style={{ background:'#f8fafc' }}>
            {WEEKDAY_EN.map((d, i) => (
              <td key={i} style={{ padding:'4px', fontSize:10, fontWeight:800,
                color: i === 5 ? '#0369a1' : i === 6 ? '#e11d48' : '#94a3b8',
                borderBottom:'1px solid #e2e8f0' }}>{d}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {WEEKDAY_ORDER.map((jp, i) => {
              const w = byJp[jp];
              if (!w) return <td key={i} />;
              return (
                <td key={i} style={{ padding:'12px 6px', verticalAlign:'top',
                  background: i === 5 ? '#eff6ff' : i === 6 ? '#fff1f2' : '#fff',
                  borderRight:'1px solid #f1f5f9' }}>
                  <div style={{ fontSize:20, fontWeight:900, color:'#1e293b', marginBottom:4 }}>{w.jp}</div>
                  <div style={{ fontSize:10, color:'#94a3b8', marginBottom:4 }}>{w.romaji}</div>
                  <div style={{ fontSize:11, color:'#334155', fontWeight:700 }}>{w.th}</div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Calendar-style date grid (like a real calendar page)
function DateGrid({ words }) {
  const byJp = Object.fromEntries(words.map(w => [w.jp, w]));
  const rows = [];
  for (let i = 0; i < DATE_ORDER.length; i += 7) {
    rows.push(DATE_ORDER.slice(i, i + 7));
  }
  return (
    <div style={{ overflowX:'auto' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'center' }}>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((jp, ci) => {
                const w = byJp[jp];
                const num = DATE_NUMS[ri * 7 + ci];
                if (!w) return <td key={ci} style={{ padding:6 }} />;
                return (
                  <td key={ci} style={{ padding:'10px 8px', border:'1px solid #e2e8f0',
                    background:'#fff', verticalAlign:'top', minWidth:80 }}>
                    <div style={{ fontSize:22, fontWeight:900, color:'#94a3b8',
                      marginBottom:4, lineHeight:1 }}>{num}</div>
                    <div style={{ fontSize:16, fontWeight:900, color:'#1e293b' }}>{w.jp}</div>
                    <div style={{ fontSize:9, color:'#94a3b8', marginTop:2 }}>{w.romaji}</div>
                    <div style={{ fontSize:11, color:'#334155', fontWeight:700, marginTop:3 }}>{w.th}</div>
                  </td>
                );
              })}
              {/* fill empty cells in last row */}
              {row.length < 7 && Array.from({ length: 7 - row.length }).map((_, ci) => (
                <td key={`empty-${ci}`} style={{ border:'1px solid #f1f5f9', background:'#fafafa' }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Country / Nationality / Language reference
const COUNTRY_LANG_DATA = [
  { c:'アメリカ',       cTh:'สหรัฐอเมริกา',     p:'アメリカ人',        l:'英語',         lH:'えいご',         lTh:'ภาษาอังกฤษ'   },
  { c:'イギリス',       cTh:'อังกฤษ',            p:'イギリス人',        l:'英語',         lH:'えいご',         lTh:'ภาษาอังกฤษ'   },
  { c:'イタリア',       cTh:'อิตาลี',            p:'イタリア人',        l:'イタリア語',   lH:null,             lTh:'ภาษาอิตาเลียน'},
  { c:'イラン',         cTh:'อิหร่าน',           p:'イラン人',          l:'ペルシア語',   lH:null,             lTh:'ภาษาเปอร์เซีย'},
  { c:'インド',         cTh:'อินเดีย',           p:'インド人',          l:'ヒンディー語', lH:null,             lTh:'ภาษาฮินดี'     },
  { c:'インドネシア',   cTh:'อินโดนีเซีย',       p:'インドネシア人',    l:'インドネシア語',lH:null,            lTh:'ภาษาอินโดนีเซีย'},
  { c:'エジプト',       cTh:'อียิปต์',           p:'エジプト人',        l:'アラビア語',   lH:null,             lTh:'ภาษาอาหรับ'   },
  { c:'オーストラリア', cTh:'ออสเตรเลีย',        p:'オーストラリア人',  l:'英語',         lH:'えいご',         lTh:'ภาษาอังกฤษ'   },
  { c:'カナダ',         cTh:'แคนาดา',            p:'カナダ人',          l:'英語 / フランス語', lH:'えいご',     lTh:'ภาษาอังกฤษ / ฝรั่งเศส'},
  { c:'韓国',           cH:'かんこく', cTh:'เกาหลีใต้', p:'韓国人',  pH:'かんこくじん', l:'韓国語',      lH:'かんこくご',     lTh:'ภาษาเกาหลี'   },
  { c:'サウジアラビア', cTh:'ซาอุดีอาระเบีย',    p:'サウジアラビア人',  l:'アラビア語',   lH:null,             lTh:'ภาษาอาหรับ'   },
  { c:'シンガポール',   cTh:'สิงคโปร์',          p:'シンガポール人',    l:'英語',         lH:'えいご',         lTh:'ภาษาอังกฤษ'   },
  { c:'スペイン',       cTh:'สเปน',              p:'スペイン人',        l:'スペイン語',   lH:null,             lTh:'ภาษาสเปน'     },
  { c:'タイ',           cTh:'ไทย',               p:'タイ人',            l:'タイ語',       lH:null,             lTh:'ภาษาไทย'      },
  { c:'中国',           cH:'ちゅうごく', cTh:'จีน', p:'中国人',  pH:'ちゅうごくじん', l:'中国語',     lH:'ちゅうごくご',    lTh:'ภาษาจีน'      },
  { c:'ドイツ',         cTh:'เยอรมนี',           p:'ドイツ人',          l:'ドイツ語',     lH:null,             lTh:'ภาษาเยอรมัน'  },
  { c:'日本',           cH:'にほん',  cTh:'ญี่ปุ่น', p:'日本人', pH:'にほんじん',    l:'日本語',      lH:'にほんご',       lTh:'ภาษาญี่ปุ่น'  },
  { c:'フィリピン',     cTh:'ฟิลิปปินส์',        p:'フィリピン人',      l:'フィリピノ語', lH:null,             lTh:'ภาษาฟิลิปปินส์'},
  { c:'フランス',       cTh:'ฝรั่งเศส',          p:'フランス人',        l:'フランス語',   lH:null,             lTh:'ภาษาฝรั่งเศส' },
  { c:'ブラジル',       cTh:'บราซิล',            p:'ブラジル人',        l:'ポルトガル語', lH:null,             lTh:'ภาษาโปรตุเกส' },
  { c:'ベトナム',       cTh:'เวียดนาม',          p:'ベトナム人',        l:'ベトナム語',   lH:null,             lTh:'ภาษาเวียดนาม' },
  { c:'マレーシア',     cTh:'มาเลเซีย',          p:'マレーシア人',      l:'マレーシア語', lH:null,             lTh:'ภาษามาเลย์'   },
  { c:'メキシコ',       cTh:'เม็กซิโก',          p:'メキシコ人',        l:'スペイン語',   lH:null,             lTh:'ภาษาสเปน'     },
  { c:'ロシア',         cTh:'รัสเซีย',           p:'ロシア人',          l:'ロシア語',     lH:null,             lTh:'ภาษารัสเซีย'  },
];

function CountryLanguageTable({ accentColor }) {
  const TH = { padding:'10px 14px', textAlign:'left', fontSize:11, fontWeight:900,
    color:'#94a3b8', background:'#f8fafc', borderBottom:'2px solid #e2e8f0', whiteSpace:'nowrap' };
  return (
    <div style={{ overflowX:'auto', borderRadius:16, border:'1px solid #e2e8f0' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:14 }}>
        <thead>
          <tr>
            <th style={TH}>🌏 国 (くに) · ประเทศ</th>
            <th style={TH}>👤 ～人 (じん) · คน / ชาว</th>
            <th style={TH}>💬 ことば · ภาษา</th>
          </tr>
        </thead>
        <tbody>
          {COUNTRY_LANG_DATA.map((d, i) => (
            <tr key={i} style={{ borderBottom:'1px solid #f1f5f9',
              background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ padding:'10px 14px' }}>
                <div style={{ fontSize:18, fontWeight:900, color:'#1e293b' }}>{d.c}</div>
                {d.cH && <div style={{ fontSize:11, color:'#64748b' }}>{d.cH}</div>}
                <div style={{ fontSize:12, color:'#94a3b8' }}>{d.cTh}</div>
              </td>
              <td style={{ padding:'10px 14px' }}>
                <div style={{ fontSize:18, fontWeight:900, color:accentColor }}>{d.p}</div>
                {d.pH && <div style={{ fontSize:11, color:'#64748b' }}>{d.pH}</div>}
              </td>
              <td style={{ padding:'10px 14px' }}>
                <div style={{ fontSize:16, fontWeight:800, color:'#1e293b' }}>{d.l}</div>
                {d.lH && <div style={{ fontSize:11, color:'#64748b' }}>{d.lH}</div>}
                <div style={{ fontSize:12, color:'#94a3b8' }}>{d.lTh}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Number reference data
const NUM_BASIC = [
  { num: 1,  hira: 'いち',   romaji: 'ichi',   th: 'หนึ่ง', alt: null,     altRomaji: null   },
  { num: 2,  hira: 'に',     romaji: 'ni',     th: 'สอง',   alt: null,     altRomaji: null   },
  { num: 3,  hira: 'さん',   romaji: 'san',    th: 'สาม',   alt: null,     altRomaji: null   },
  { num: 4,  hira: 'し',     romaji: 'shi',    th: 'สี่',   alt: 'よん',   altRomaji: 'yon'  },
  { num: 5,  hira: 'ご',     romaji: 'go',     th: 'ห้า',   alt: null,     altRomaji: null   },
  { num: 6,  hira: 'ろく',   romaji: 'roku',   th: 'หก',    alt: null,     altRomaji: null   },
  { num: 7,  hira: 'しち',   romaji: 'shichi', th: 'เจ็ด',  alt: 'なな',   altRomaji: 'nana' },
  { num: 8,  hira: 'はち',   romaji: 'hachi',  th: 'แปด',   alt: null,     altRomaji: null   },
  { num: 9,  hira: 'く',     romaji: 'ku',     th: 'เก้า',  alt: 'きゅう', altRomaji: 'kyuu' },
  { num: 10, hira: 'じゅう', romaji: 'juu',    th: 'สิบ',   alt: null,     altRomaji: null   },
];
const NUM_TENS = [
  { num: 10, hira: 'じゅう',       romaji: 'juu',      th: 'สิบ'     },
  { num: 20, hira: 'にじゅう',     romaji: 'nijuu',    th: 'ยี่สิบ'  },
  { num: 30, hira: 'さんじゅう',   romaji: 'sanjuu',   th: 'สามสิบ'  },
  { num: 40, hira: 'よんじゅう',   romaji: 'yonjuu',   th: 'สี่สิบ'  },
  { num: 50, hira: 'ごじゅう',     romaji: 'gojuu',    th: 'ห้าสิบ'  },
  { num: 60, hira: 'ろくじゅう',   romaji: 'rokujuu',  th: 'หกสิบ'   },
  { num: 70, hira: 'ななじゅう',   romaji: 'nanajuu',  th: 'เจ็ดสิบ' },
  { num: 80, hira: 'はちじゅう',   romaji: 'hachijuu', th: 'แปดสิบ'  },
  { num: 90, hira: 'きゅうじゅう', romaji: 'kyuujuu',  th: 'เก้าสิบ' },
];
const NUM_HUNDREDS = [
  { num: 100, hira: 'ひゃく',       romaji: 'hyaku',    th: 'หนึ่งร้อย', special: false },
  { num: 200, hira: 'にひゃく',     romaji: 'nihyaku',  th: 'สองร้อย',   special: false },
  { num: 300, hira: 'さんびゃく',   romaji: 'sanbyaku', th: 'สามร้อย',   special: true  },
  { num: 400, hira: 'よんひゃく',   romaji: 'yonhyaku', th: 'สี่ร้อย',   special: false },
  { num: 500, hira: 'ごひゃく',     romaji: 'gohyaku',  th: 'ห้าร้อย',   special: false },
  { num: 600, hira: 'ろっぴゃく',   romaji: 'roppyaku', th: 'หกร้อย',    special: true  },
  { num: 700, hira: 'ななひゃく',   romaji: 'nanahyaku',th: 'เจ็ดร้อย',  special: false },
  { num: 800, hira: 'はっぴゃく',   romaji: 'happyaku', th: 'แปดร้อย',   special: true  },
  { num: 900, hira: 'きゅうひゃく', romaji: 'kyuuhyaku',th: 'เก้าร้อย',  special: false },
];
const NUM_THOUSANDS = [
  { num: '1,000',  hira: 'せん',       romaji: 'sen',     th: 'หนึ่งพัน',  special: false },
  { num: '2,000',  hira: 'にせん',     romaji: 'nisen',   th: 'สองพัน',    special: false },
  { num: '3,000',  hira: 'さんぜん',   romaji: 'sanzen',  th: 'สามพัน',    special: true  },
  { num: '4,000',  hira: 'よんせん',   romaji: 'yonsen',  th: 'สี่พัน',    special: false },
  { num: '5,000',  hira: 'ごせん',     romaji: 'gosen',   th: 'ห้าพัน',    special: false },
  { num: '6,000',  hira: 'ろくせん',   romaji: 'rokusen', th: 'หกพัน',     special: false },
  { num: '7,000',  hira: 'ななせん',   romaji: 'nanasen', th: 'เจ็ดพัน',   special: false },
  { num: '8,000',  hira: 'はっせん',   romaji: 'hassen',  th: 'แปดพัน',    special: true  },
  { num: '9,000',  hira: 'きゅうせん', romaji: 'kyuusen', th: 'เก้าพัน',   special: false },
  { num: '10,000', hira: 'いちまん',   romaji: 'ichiman', th: 'หนึ่งหมื่น',special: false },
];

function NumberTable({ accentColor }) {
  const SPECIAL_BG   = '#fef9c3';
  const SPECIAL_COL  = '#b45309';
  const ALT_COL      = '#7c3aed';
  const HEAD_BG      = '#f8fafc';

  const SubTable = ({ label, rows, renderHead, renderCell }) => (
    <div>
      <div style={{ fontSize:12, fontWeight:800, color:'#64748b', marginBottom:8 }}>{label}</div>
      <div style={{ overflowX:'auto' }}>
        <table style={{ borderCollapse:'collapse' }}>
          <thead><tr>{rows.map((d, i) => (
            <th key={i} style={{ padding:'6px 10px', textAlign:'center', fontSize:12,
              fontWeight:900, border:'1px solid #e2e8f0', minWidth:78,
              ...renderHead(d) }}>{d.num}</th>
          ))}</tr></thead>
          <tbody><tr>{rows.map((d, i) => (
            <td key={i} style={{ padding:'10px 8px', textAlign:'center',
              border:'1px solid #e2e8f0', ...renderCell(d) }} />
          ))}</tr></tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={{ background:'#fff', borderRadius:16, border:'1px solid #e2e8f0', padding:20,
      display:'flex', flexDirection:'column', gap:22 }}>

      {/* Legend */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
        <span style={{ fontSize:13, fontWeight:800, color:'#475569' }}>🔢 ตารางตัวเลข</span>
        <span style={{ background:SPECIAL_BG, color:SPECIAL_COL, fontSize:10, fontWeight:800,
          borderRadius:6, padding:'2px 8px' }}>⚠ สีเหลือง = อ่านพิเศษ (เปลี่ยนเสียง)</span>
        <span style={{ background:'#f5f3ff', color:ALT_COL, fontSize:10, fontWeight:800,
          borderRadius:6, padding:'2px 8px' }}>🟣 สีม่วง = อ่านได้อีกแบบ</span>
      </div>

      {/* 1–10 */}
      <div>
        <div style={{ fontSize:12, fontWeight:800, color:'#64748b', marginBottom:8 }}>1 – 10</div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ borderCollapse:'collapse' }}>
            <thead><tr>
              {NUM_BASIC.map(d => (
                <th key={d.num} style={{ padding:'6px 10px', textAlign:'center', fontSize:12,
                  fontWeight:900, color:'#334155', background:HEAD_BG,
                  border:'1px solid #e2e8f0', minWidth:78 }}>{d.num}</th>
              ))}
            </tr></thead>
            <tbody><tr>
              {NUM_BASIC.map(d => (
                <td key={d.num} style={{ padding:'8px', textAlign:'center',
                  border:'1px solid #e2e8f0', background:'#fff' }}>
                  <div style={{ fontSize:15, fontWeight:900, color:accentColor }}>{d.hira}</div>
                  {d.alt && <div style={{ fontSize:12, fontWeight:800, color:ALT_COL }}>/ {d.alt}</div>}
                  <div style={{ fontSize:10, color:'#64748b', marginTop:2 }}>
                    {d.romaji}{d.altRomaji ? ` / ${d.altRomaji}` : ''}
                  </div>
                  <div style={{ fontSize:10, color:'#94a3b8', marginTop:1 }}>{d.th}</div>
                </td>
              ))}
            </tr></tbody>
          </table>
        </div>
      </div>

      {/* Tens */}
      <div>
        <div style={{ fontSize:12, fontWeight:800, color:'#64748b', marginBottom:8 }}>10 – 90</div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ borderCollapse:'collapse' }}>
            <thead><tr>
              {NUM_TENS.map(d => (
                <th key={d.num} style={{ padding:'6px 10px', textAlign:'center', fontSize:12,
                  fontWeight:900, color:'#334155', background:HEAD_BG,
                  border:'1px solid #e2e8f0', minWidth:90 }}>{d.num}</th>
              ))}
            </tr></thead>
            <tbody><tr>
              {NUM_TENS.map(d => (
                <td key={d.num} style={{ padding:'8px', textAlign:'center',
                  border:'1px solid #e2e8f0', background:'#fff' }}>
                  <div style={{ fontSize:15, fontWeight:900, color:accentColor }}>{d.hira}</div>
                  <div style={{ fontSize:10, color:'#64748b', marginTop:2 }}>{d.romaji}</div>
                  <div style={{ fontSize:10, color:'#94a3b8', marginTop:1 }}>{d.th}</div>
                </td>
              ))}
            </tr></tbody>
          </table>
        </div>
      </div>

      {/* Hundreds */}
      <div>
        <div style={{ fontSize:12, fontWeight:800, color:'#64748b', marginBottom:8 }}>100 – 900</div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ borderCollapse:'collapse' }}>
            <thead><tr>
              {NUM_HUNDREDS.map(d => (
                <th key={d.num} style={{ padding:'6px 10px', textAlign:'center', fontSize:12,
                  fontWeight:900, color: d.special ? SPECIAL_COL : '#334155',
                  background: d.special ? SPECIAL_BG : HEAD_BG,
                  border:'1px solid #e2e8f0', minWidth:90 }}>{d.num}</th>
              ))}
            </tr></thead>
            <tbody><tr>
              {NUM_HUNDREDS.map(d => (
                <td key={d.num} style={{ padding:'8px', textAlign:'center',
                  border:'1px solid #e2e8f0', background: d.special ? SPECIAL_BG : '#fff' }}>
                  <div style={{ fontSize:15, fontWeight:900,
                    color: d.special ? SPECIAL_COL : accentColor }}>{d.hira}</div>
                  <div style={{ fontSize:10, color:'#64748b', marginTop:2 }}>{d.romaji}</div>
                  <div style={{ fontSize:10, color:'#94a3b8', marginTop:1 }}>{d.th}</div>
                </td>
              ))}
            </tr></tbody>
          </table>
        </div>
      </div>

      {/* Thousands */}
      <div>
        <div style={{ fontSize:12, fontWeight:800, color:'#64748b', marginBottom:8 }}>1,000 – 10,000</div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ borderCollapse:'collapse' }}>
            <thead><tr>
              {NUM_THOUSANDS.map(d => (
                <th key={d.num} style={{ padding:'6px 10px', textAlign:'center', fontSize:12,
                  fontWeight:900, color: d.special ? SPECIAL_COL : '#334155',
                  background: d.special ? SPECIAL_BG : HEAD_BG,
                  border:'1px solid #e2e8f0', minWidth:90 }}>{d.num}</th>
              ))}
            </tr></thead>
            <tbody><tr>
              {NUM_THOUSANDS.map(d => (
                <td key={d.num} style={{ padding:'8px', textAlign:'center',
                  border:'1px solid #e2e8f0', background: d.special ? SPECIAL_BG : '#fff' }}>
                  <div style={{ fontSize:15, fontWeight:900,
                    color: d.special ? SPECIAL_COL : accentColor }}>{d.hira}</div>
                  <div style={{ fontSize:10, color:'#64748b', marginTop:2 }}>{d.romaji}</div>
                  <div style={{ fontSize:10, color:'#94a3b8', marginTop:1 }}>{d.th}</div>
                </td>
              ))}
            </tr></tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// Hour counter (じ) readings
const JI_DATA = [
  { num: 1,  hira: 'いちじ',       romaji: 'ichi-ji',    th: '1 นาฬิกา',  special: false },
  { num: 2,  hira: 'にじ',         romaji: 'ni-ji',      th: '2 นาฬิกา',  special: false },
  { num: 3,  hira: 'さんじ',       romaji: 'san-ji',     th: '3 นาฬิกา',  special: false },
  { num: 4,  hira: 'よじ',         romaji: 'yo-ji',      th: '4 นาฬิกา',  special: true  },
  { num: 5,  hira: 'ごじ',         romaji: 'go-ji',      th: '5 นาฬิกา',  special: false },
  { num: 6,  hira: 'ろくじ',       romaji: 'roku-ji',    th: '6 นาฬิกา',  special: false },
  { num: 7,  hira: 'しちじ',       romaji: 'shichi-ji',  th: '7 นาฬิกา',  special: true  },
  { num: 8,  hira: 'はちじ',       romaji: 'hachi-ji',   th: '8 นาฬิกา',  special: false },
  { num: 9,  hira: 'くじ',         romaji: 'ku-ji',      th: '9 นาฬิกา',  special: true  },
  { num: 10, hira: 'じゅうじ',     romaji: 'juu-ji',     th: '10 นาฬิกา', special: false },
  { num: 11, hira: 'じゅういちじ', romaji: 'juuichi-ji', th: '11 นาฬิกา', special: false },
  { num: 12, hira: 'じゅうにじ',   romaji: 'juuni-ji',   th: '12 นาฬิกา', special: false },
];

// Minute counter (ふん/ぷん) readings — ふん: 2,5,7,9 · ぷน: others
const FUN_DATA = [
  { num: 1,  hira: 'いっぷん',         romaji: 'ippun',       th: '1 นาที',  pun: true  },
  { num: 2,  hira: 'にふん',           romaji: 'nifun',       th: '2 นาที',  pun: false },
  { num: 3,  hira: 'さんぷん',         romaji: 'sanpun',      th: '3 นาที',  pun: true  },
  { num: 4,  hira: 'よんぷん',         romaji: 'yonpun',      th: '4 นาที',  pun: true  },
  { num: 5,  hira: 'ごふん',           romaji: 'gofun',       th: '5 นาที',  pun: false },
  { num: 6,  hira: 'ろっぷん',         romaji: 'roppun',      th: '6 นาที',  pun: true  },
  { num: 7,  hira: 'ななふん',         romaji: 'nanafun',     th: '7 นาที',  pun: false },
  { num: 8,  hira: 'はっぷん',         romaji: 'happun',      th: '8 นาที',  pun: true  },
  { num: 9,  hira: 'きゅうふん',       romaji: 'kyuufun',     th: '9 นาที',  pun: false },
  { num: 10, hira: 'じゅっぷん',       romaji: 'juppun',      th: '10 นาที', pun: true  },
  { num: 15, hira: 'じゅうごふん',     romaji: 'juugofun',    th: '15 นาที', pun: false },
  { num: 20, hira: 'にじゅっぷん',     romaji: 'nijuppun',    th: '20 นาที', pun: true  },
  { num: 30, hira: 'さんじゅっぷん',   romaji: 'sanjuppun',   th: '30 นาที', pun: true  },
  { num: 45, hira: 'よんじゅうごふん', romaji: 'yonjuugofun', th: '45 นาที', pun: false },
];

function TimeCounterTable({ accentColor }) {
  return (
    <div style={{ background:'#fff', borderRadius:16, border:'1px solid #e2e8f0', padding:20,
      display:'flex', flexDirection:'column', gap:24 }}>

      {/* じ table */}
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12, flexWrap:'wrap' }}>
          <span style={{ fontSize:13, fontWeight:800, color:'#475569' }}>🕐 — じ (時) · อ่านชั่วโมง</span>
          <span style={{ background:'#fef9c3', color:'#b45309', fontSize:10, fontWeight:800,
            borderRadius:6, padding:'2px 8px' }}>⚠ สีเหลือง = อ่านพิเศษ</span>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ borderCollapse:'collapse' }}>
            <thead>
              <tr>
                {JI_DATA.map(d => (
                  <th key={d.num} style={{ padding:'6px 10px', textAlign:'center', fontSize:13,
                    fontWeight:900, color: d.special ? '#b45309' : '#334155',
                    background: d.special ? '#fef9c3' : '#f8fafc',
                    border:'1px solid #e2e8f0', minWidth:80 }}>{d.num}時</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {JI_DATA.map(d => (
                  <td key={d.num} style={{ padding:'8px', textAlign:'center',
                    border:'1px solid #e2e8f0', background: d.special ? '#fef9c3' : '#fff' }}>
                    <div style={{ fontSize:15, fontWeight:900,
                      color: d.special ? '#b45309' : accentColor }}>{d.hira}</div>
                    <div style={{ fontSize:10, color:'#64748b', marginTop:2 }}>{d.romaji}</div>
                    <div style={{ fontSize:10, color:'#94a3b8', marginTop:1 }}>{d.th}</div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ふん / ぷん table */}
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12, flexWrap:'wrap' }}>
          <span style={{ fontSize:13, fontWeight:800, color:'#475569' }}>⏱ — ふん / ぷん (分) · อ่านนาที</span>
          <span style={{ background:'#fff7ed', color:'#c2410c', fontSize:10, fontWeight:800,
            borderRadius:6, padding:'2px 8px' }}>🟠 ぷん (1,3,4,6,8,10,20,30)</span>
          <span style={{ background:'#eff6ff', color:'#1d4ed8', fontSize:10, fontWeight:800,
            borderRadius:6, padding:'2px 8px' }}>🔵 ふん (2,5,7,9)</span>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ borderCollapse:'collapse' }}>
            <thead>
              <tr>
                {FUN_DATA.map(d => (
                  <th key={d.num} style={{ padding:'6px 10px', textAlign:'center', fontSize:13,
                    fontWeight:900, color: d.pun ? '#c2410c' : '#1d4ed8',
                    background: d.pun ? '#fff7ed' : '#eff6ff',
                    border:'1px solid #e2e8f0', minWidth:80 }}>{d.num}分</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {FUN_DATA.map(d => (
                  <td key={d.num} style={{ padding:'8px', textAlign:'center',
                    border:'1px solid #e2e8f0', background: d.pun ? '#fff7ed' : '#eff6ff' }}>
                    <div style={{ fontSize:15, fontWeight:900,
                      color: d.pun ? '#c2410c' : '#1d4ed8' }}>{d.hira}</div>
                    <div style={{ fontSize:10, color:'#64748b', marginTop:2 }}>{d.romaji}</div>
                    <div style={{ fontSize:10, color:'#94a3b8', marginTop:1 }}>{d.th}</div>
                    <div style={{ fontSize:9, fontWeight:800, marginTop:2,
                      color: d.pun ? '#c2410c' : '#1d4ed8' }}>{d.pun ? 'ぷん' : 'ふん'}</div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function WordPage() {
  const [lesson, setLesson] = useState(0);
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');

  const accentColor = LESSON_META.find(l => l.id === lesson)?.color ?? '#0f172a';

  const baseWords = useMemo(() => {
    let w = lesson === 0 ? ALL_VOCAB : ALL_VOCAB.filter(v => v.lesson === lesson);
    if (typeFilter !== 'all') w = w.filter(v => v.type === typeFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      w = w.filter(v =>
        v.jp.includes(q) || v.romaji.toLowerCase().includes(q) ||
        v.th.includes(q)  || v.en.toLowerCase().includes(q)
      );
    }
    return w;
  }, [lesson, typeFilter, search]);

  // Decide which sections to show
  const showWeekdays = useMemo(() =>
    baseWords.some(w => WEEKDAY_SET.has(w.jp)), [baseWords]);
  const showDates = useMemo(() =>
    baseWords.some(w => DATE_SET.has(w.jp)), [baseWords]);
  const showTimeCounters = useMemo(() =>
    baseWords.some(w => w.jp === 'ーじ' || w.jp === 'ーふん'), [baseWords]);
  const showNumbers = useMemo(() =>
    baseWords.some(w => w.jp === 'ひゃく' && w.type === 'ตัวเลข'), [baseWords]);
  const showCountryTable = useMemo(() =>
    baseWords.some(w => w.jp === 'アメリカ' && w.type === 'ประเทศ'), [baseWords]);

  // Card-grid types
  const CARD_GRID_TYPES = new Set(['อาหาร', 'ยานพาหนะ', 'คน']);

  // Partition words
  const weekdayWords  = useMemo(() => baseWords.filter(w => WEEKDAY_SET.has(w.jp)), [baseWords]);
  const dateWords     = useMemo(() => baseWords.filter(w => DATE_SET.has(w.jp)), [baseWords]);
  const specialKeys   = new Set([...WEEKDAY_SET, ...DATE_SET]);
  const remainWords   = useMemo(() => baseWords.filter(w => !specialKeys.has(w.jp)), [baseWords]);

  // Split remainder into card-grid vs table
  const cardWords  = useMemo(() => remainWords.filter(w => CARD_GRID_TYPES.has(w.type)), [remainWords]);
  const tableWords = useMemo(() => remainWords.filter(w => !CARD_GRID_TYPES.has(w.type)), [remainWords]);

  const totalShown = baseWords.length;

  return (
    <div style={{ fontFamily:'system-ui,-apple-system,sans-serif', maxWidth:900, margin:'0 auto', padding:'0 0 40px' }}>

      {/* ── Filters ── */}
      <div style={{ background:'#fff', borderRadius:20, padding:20, marginBottom:20,
        boxShadow:'0 2px 8px rgba(0,0,0,0.06)', border:'1px solid #e2e8f0' }}>

        {/* Search */}
        <div style={{ position:'relative', marginBottom:14 }}>
          <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)',
            fontSize:16, pointerEvents:'none' }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ค้นหาคำศัพท์ (JP / romaji / ไทย / EN)…"
            style={{ width:'100%', boxSizing:'border-box', padding:'10px 14px 10px 40px',
              borderRadius:12, border:'1px solid #e2e8f0', fontSize:14, outline:'none',
              background:'#f8fafc' }}
          />
        </div>

        {/* Lesson tabs */}
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:12 }}>
          {LESSON_META.map(l => (
            <button key={l.id} onClick={() => setLesson(l.id)} style={{
              padding:'7px 14px', borderRadius:12, border:'none', cursor:'pointer',
              fontSize:12, fontWeight:800, transition:'0.15s',
              background: lesson === l.id ? l.color : '#f1f5f9',
              color: lesson === l.id ? '#fff' : '#64748b',
            }}>{l.label}</button>
          ))}
        </div>

        {/* Type chips */}
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {TYPE_META.map(t => {
            const count = (lesson === 0 ? ALL_VOCAB : ALL_VOCAB.filter(v => v.lesson === lesson))
              .filter(v => t.id === 'all' ? true : v.type === t.id).length;
            const active = typeFilter === t.id;
            return (
              <button key={t.id} onClick={() => setTypeFilter(t.id)}
                disabled={count === 0}
                style={{ display:'flex', alignItems:'center', gap:5,
                  padding:'6px 12px', borderRadius:10, border:'1px solid',
                  borderColor: active ? 'transparent' : '#e2e8f0',
                  background: active ? accentColor : '#fff',
                  color: active ? '#fff' : '#64748b',
                  fontSize:11, fontWeight:700, cursor: count === 0 ? 'not-allowed' : 'pointer',
                  opacity: count === 0 ? 0.4 : 1, transition:'0.15s' }}>
                {t.icon} {t.label}
                <span style={{ fontSize:10, fontWeight:800, opacity:0.75 }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Result count ── */}
      <p style={{ fontSize:13, fontWeight:800, color:'#94a3b8', marginBottom:16, paddingLeft:2 }}>
        แสดง {totalShown} คำ
        {search && ` · ค้นหา "${search}"`}
      </p>

      {totalShown === 0 && (
        <div style={{ textAlign:'center', padding:'60px 0', color:'#cbd5e1' }}>
          <div style={{ fontSize:40, marginBottom:8 }}>📭</div>
          <div style={{ fontWeight:700 }}>ไม่พบคำศัพท์</div>
        </div>
      )}

      <div style={{ display:'flex', flexDirection:'column', gap:28 }}>

        {/* ── Weekday calendar grid ── */}
        {showWeekdays && weekdayWords.length > 0 && (
          <section>
            <SectionHeader title="📅 วันในสัปดาห์" count={weekdayWords.length} color={accentColor} />
            <div style={{ background:'#fff', borderRadius:16, border:'1px solid #e2e8f0', overflow:'hidden' }}>
              <WeekdayGrid words={weekdayWords} />
            </div>
          </section>
        )}

        {/* ── Date calendar grid ── */}
        {showDates && dateWords.length > 0 && (
          <section>
            <SectionHeader title="🗓 วันที่ในเดือน (การอ่านพิเศษ)" count={dateWords.length} color={accentColor} />
            <div style={{ background:'#fff', borderRadius:16, border:'1px solid #e2e8f0', overflow:'hidden' }}>
              <DateGrid words={dateWords} />
            </div>
          </section>
        )}

        {/* ── Country / Nationality / Language table ── */}
        {showCountryTable && (
          <section>
            <SectionHeader title="🌏 ตาราง ประเทศ · สัญชาติ · ภาษา" color={accentColor} />
            <CountryLanguageTable accentColor={accentColor} />
          </section>
        )}

        {/* ── Number reference table ── */}
        {showNumbers && (
          <section>
            <SectionHeader title="🔢 ตารางตัวเลข 1 – 10,000" color={accentColor} />
            <NumberTable accentColor={accentColor} />
          </section>
        )}

        {/* ── Time counter reference table ── */}
        {showTimeCounters && (
          <section>
            <SectionHeader title="🕐 ตารางอ่านเวลา — じ และ ふん / ぷん" color={accentColor} />
            <TimeCounterTable accentColor={accentColor} />
          </section>
        )}

        {/* ── Card grids for food / transport / people ── */}
        {cardWords.length > 0 && (() => {
          const byType = {};
          cardWords.forEach(w => { (byType[w.type] = byType[w.type] || []).push(w); });
          return Object.entries(byType).map(([type, words]) => {
            const meta = TYPE_META.find(t => t.id === type);
            return (
              <section key={type}>
                <SectionHeader
                  title={`${meta?.icon ?? ''} ${meta?.label ?? type}`}
                  count={words.length}
                  color={accentColor}
                />
                <CardGrid words={words} />
              </section>
            );
          });
        })()}

        {/* ── Standard table for everything else ── */}
        {tableWords.length > 0 && (() => {
          // Group by type when showing 'all', single block otherwise
          if (typeFilter !== 'all') {
            const meta = TYPE_META.find(t => t.id === typeFilter);
            return (
              <section>
                <SectionHeader
                  title={`${meta?.icon ?? ''} ${meta?.label ?? typeFilter}`}
                  count={tableWords.length}
                  color={accentColor}
                />
                <WordTable words={tableWords} accentColor={accentColor} />
              </section>
            );
          }
          // Group by type
          const byType = {};
          tableWords.forEach(w => { (byType[w.type] = byType[w.type] || []).push(w); });
          return Object.entries(byType).map(([type, words]) => {
            const meta = TYPE_META.find(t => t.id === type);
            return (
              <section key={type}>
                <SectionHeader
                  title={`${meta?.icon ?? ''} ${meta?.label ?? type}`}
                  count={words.length}
                  color={accentColor}
                />
                <WordTable words={words} accentColor={accentColor} />
              </section>
            );
          });
        })()}

      </div>
    </div>
  );
}
