import React, { useState, useEffect } from 'react';

// ─── All quiz questions derived from 第1・2課 and 第3課 worksheets ───────────
const SECTIONS = [
  {
    id: 'L1L2',
    label: '第1・2課',
    color: '#e11d48',
    bg: '#fff1f2',
    questions: [
      // Exercise 1 – Object names
      {
        id: 'L1Q1', type: 'mcq',
        prompt: '【第1課 Ex.1】 What is item ①? (A calendar/planner)',
        options: ['手帳 (てちょう)', 'カメラ', 'ノート', 'かばん'],
        answer: '手帳 (てちょう)',
      },
      {
        id: 'L1Q2', type: 'mcq',
        prompt: '【第1課 Ex.1】 What is item ⑥? (A notebook with lines)',
        options: ['ノートブック', 'テープ', '雑誌', '新聞'],
        answer: 'ノートブック',
      },
      {
        id: 'L1Q3', type: 'mcq',
        prompt: '【第1課 Ex.1】 What is item ⑨? (A writing tool / pen)',
        options: ['えんぴつ', 'かさ', 'かぎ', 'ペン'],
        answer: 'えんぴつ',
      },
      // Exercise 2 – は vs も particles
      {
        id: 'L1Q4', type: 'mcq',
        prompt: '【第1課 Ex.2】 サントスさんはブラジル人です。マリアさん（　）ブラジル人ですか。\nChoose the correct particle.',
        options: ['は', 'も', 'の', 'が'],
        answer: 'も',
      },
      {
        id: 'L1Q5', type: 'mcq',
        prompt: '【第1課 Ex.2】 ミラーさん（　）ブラジル人じゃありません。\nChoose the correct particle.',
        options: ['は', 'も', 'の', 'を'],
        answer: 'は',
      },
      {
        id: 'L1Q6', type: 'mcq',
        prompt: '【第1課 Ex.2】 グプタさんはIMC（　）社員です。\nChoose the correct particle.',
        options: ['の', 'は', 'も', 'で'],
        answer: 'の',
      },
      // Exercise 3 – これ / それ dialogues
      {
        id: 'L1Q7', type: 'mcq',
        prompt: '【第1課 Ex.3】 A: これはカメラですか。B: はい、（　）はカメラです。\nFill the blank.',
        options: ['それ', 'これ', 'あれ', 'どれ'],
        answer: 'それ',
      },
      // Exercise 4 – はい/いいえ
      {
        id: 'L1Q8', type: 'mcq',
        prompt: '【第1課 Ex.4】 カリナさんは学生ですか。…はい、（　）',
        options: ['カリナさんは学生です。', 'カリナさんは学生じゃありません。', 'はい、そうです。', 'いいえ、ちがいます。'],
        answer: 'カリナさんは学生です。',
      },
      {
        id: 'L1Q9', type: 'mcq',
        prompt: '【第1課 Ex.4】 ワンさんも学生ですか。…いいえ、（　）',
        options: ['ワンさんも学生じゃありません。', 'ワンさんは学生です。', 'いいえ、ちがいます。', 'ワンさんも学生です。'],
        answer: 'ワンさんも学生じゃありません。',
      },
      // Exercise 5 – Q&A matching
      {
        id: 'L1Q10', type: 'mcq',
        prompt: '【第2課 Ex.5】 あの人はだれですか。… どの答えが正しいですか？\nWhich answer matches?',
        options: ['f. 山田さんです。', 'b. 38歳です。', 'a. それはノートです。', 'h. 自動車の雑誌です。'],
        answer: 'f. 山田さんです。',
      },
      {
        id: 'L1Q11', type: 'mcq',
        prompt: '【第2課 Ex.5】 山田さんはおいくつですか。… どの答えが正しいですか？',
        options: ['b. 38歳です。', 'c. はい、山田さんです。', 'g. いいえ、先生です。', 'e. 山田さんのです。'],
        answer: 'b. 38歳です。',
      },
      {
        id: 'L1Q12', type: 'mcq',
        prompt: '【第2課 Ex.5】 それは何の雑誌ですか。… どの答えが正しいですか？',
        options: ['h. 自動車の雑誌です。', 'a. それはノートです。', 'b. 38歳です。', 'f. 山田さんです。'],
        answer: 'h. 自動車の雑誌です。',
      },
      {
        id: 'L1Q13', type: 'mcq',
        prompt: '【第2課 Ex.5】 ワットさんは学生ですか。… どの答えが正しいですか？',
        options: ['g. いいえ、先生です。', 'b. 38歳です。', 'i. はい、わたしのです。', 'c. はい、山田さんです。'],
        answer: 'g. いいえ、先生です。',
      },
      // Exercise 6 – Choose correct word
      {
        id: 'L1Q14', type: 'mcq',
        prompt: '【第2課 Ex.6】 それは {だれ, 何} のかばんですか。…わたし、わたしの です。\nWhich word fits the blank?',
        options: ['だれ', '何', 'どこ', 'いくら'],
        answer: 'だれ',
      },
      {
        id: 'L1Q15', type: 'mcq',
        prompt: '【第2課 Ex.6】 {その, それ} は何のテープですか。…日本語のテープです。\nWhich demonstrative fits?',
        options: ['その', 'それ', 'あの', 'この'],
        answer: 'その',
      },
      {
        id: 'L1Q16', type: 'mcq',
        prompt: '【第2課 Ex.6】 あの人は {何, だれ} ですか。…佐藤さんです。\nWhich question word fits?',
        options: ['だれ', '何', 'どこ', 'いつ'],
        answer: 'だれ',
      },
      // Exercise 7 – Age readings
      {
        id: 'L1Q17', type: 'mcq',
        prompt: '【第2課 Ex.7】 グプタさんは42歳です。How do you read 42 in Japanese?',
        options: ['よんじゅうに', 'しじゅうに', 'よじゅうに', 'よんじゅうじ'],
        answer: 'よんじゅうに',
      },
      {
        id: 'L1Q18', type: 'mcq',
        prompt: '【第2課 Ex.7】 イーさんは35歳です。How do you read 35 in Japanese?',
        options: ['さんじゅうご', 'さんじゅうごさい', 'みじゅうご', 'さんじゅうに'],
        answer: 'さんじゅうご',
      },
      {
        id: 'L1Q19', type: 'mcq',
        prompt: '【第2課 Ex.7】 太郎君は8歳です。How do you read 8 in Japanese?',
        options: ['はっさい', 'はちさい', 'やさい', 'ようさい'],
        answer: 'はっさい',
      },
      {
        id: 'L1Q20', type: 'mcq',
        prompt: '【第2課 Ex.7】 カリナさんは24歳です。How do you read 24 in Japanese?',
        options: ['にじゅうし', 'にじゅうよん', 'ふたじゅうし', 'にじゅうよ'],
        answer: 'にじゅうし',
      },
    ],
  },
  {
    id: 'L3',
    label: '第3課',
    color: '#0369a1',
    bg: '#f0f9ff',
    questions: [
      // Exercise 1 – Prices in Japanese
      {
        id: 'L3Q1', type: 'mcq',
        prompt: '【第3課 Ex.1】 このかばんは¥7,300です。How do you say ¥7,300 in Japanese?',
        options: ['ななせんさんびゃく円', 'しちせんさんひゃく円', 'ななせんさんひゃく円', 'しちせんさんぴゃく円'],
        answer: 'ななせんさんびゃく円',
      },
      {
        id: 'L3Q2', type: 'mcq',
        prompt: '【第3課 Ex.1】 このカメラは¥25,800です。How do you say ¥25,800 in Japanese?',
        options: ['にまんごせんはっぴゃく円', 'にじゅうごせんはっぴゃく円', 'にじゅうごせんやひゃく円', 'にまんごせんはちじゅう円'],
        answer: 'にまんごせんはっぴゃく円',
      },
      {
        id: 'L3Q3', type: 'mcq',
        prompt: '【第3課 Ex.1】 このコンピューターは¥243,000です。How do you say ¥243,000?',
        options: ['にじゅうよんまんさんぜん円', 'にひゃくよんじゅうさんせん円', 'にじゅうよんまんさんびゃく円', 'ふたじゅうよんまんさんせん円'],
        answer: 'にじゅうよんまんさんぜん円',
      },
      {
        id: 'L3Q4', type: 'mcq',
        prompt: '【第3課 Ex.1】 この自動車は¥4,500,000です。How do you say ¥4,500,000?',
        options: ['よんひゃくごじゅうまん円', 'よんせんごひゃくまん円', 'しひゃくごじゅうまん円', 'よんひゃくごまん円'],
        answer: 'よんひゃくごじゅうまん円',
      },
      // Exercise 2 – Demonstratives table
      {
        id: 'L3Q5', type: 'mcq',
        prompt: '【第3課 Ex.2】 これ・この・こちら are all ___ group (near speaker).\nWhat is the correct group label?',
        options: ['こ (ko) group', 'そ (so) group', 'あ (a) group', 'ど (do) group'],
        answer: 'こ (ko) group',
      },
      {
        id: 'L3Q6', type: 'mcq',
        prompt: '【第3課 Ex.2】 "あそこ" refers to:',
        options: ['A place far from both speaker and listener', 'A place near the listener', 'A place near the speaker', 'An unknown place'],
        answer: 'A place far from both speaker and listener',
      },
      {
        id: 'L3Q7', type: 'mcq',
        prompt: '【第3課 Ex.2】 Which is the "thing" demonstrative for something near the listener?',
        options: ['それ', 'この', 'そちら', 'あれ'],
        answer: 'それ',
      },
      {
        id: 'L3Q8', type: 'mcq',
        prompt: '【第3課 Ex.2】 Which is the "direction / polite" demonstrative for something near the speaker?',
        options: ['こちら', 'ここ', 'これ', 'この'],
        answer: 'こちら',
      },
      // Exercise 3 – Particles in dialogue
      {
        id: 'L3Q9', type: 'mcq',
        prompt: '【第3課 Ex.3】 A：それはどこ（　）時計ですか。\nB：日本（　）です。\nWhich particles fill both blanks in order?',
        options: ['の / の', 'は / の', 'の / は', 'が / の'],
        answer: 'の / の',
      },
      {
        id: 'L3Q10', type: 'mcq',
        prompt: '【第3課 Ex.3】 A：マリアさん（　）お国（　）どちらですか。\nB：ブラジルです。\nWhich particles fill both blanks?',
        options: ['の / は', 'は / の', 'は / は', 'の / の'],
        answer: 'の / は',
      },
      {
        id: 'L3Q11', type: 'mcq',
        prompt: '【第3課 Ex.3】 A：パワー電気（　）何（　）会社ですか。\nB：コンピューター（　）会社です。\nWhich particles fill the blanks (in order)?',
        options: ['は / の / の', 'の / は / の', 'は / の / は', 'の / の / の'],
        answer: 'は / の / の',
      },
      {
        id: 'L3Q12', type: 'mcq',
        prompt: '【第3課 Ex.3】 A：すみません。そのワイン（　）見せてください。\nA：じゃ、これ（　）ください。\nWhich particles fill the blanks (in order)?',
        options: ['を / を', 'は / を', 'を / は', 'の / を'],
        answer: 'を / を',
      },
      // Exercise 4 – Question word brackets
      {
        id: 'L3Q13', type: 'mcq',
        prompt: '【第3課 Ex.4】 あの方は [　] ですか。…ミラーさんです。\nWhich question word fits?',
        options: ['どなた', 'だれ', 'どこ', 'なに'],
        answer: 'どなた',
      },
      {
        id: 'L3Q14', type: 'mcq',
        prompt: '【第3課 Ex.4】 カメラ売り場は [　] ですか。…3階です。\nWhich question word fits?',
        options: ['なんがい / どこ', 'なに', 'どなた', 'いくら'],
        answer: 'なんがい / どこ',
      },
      {
        id: 'L3Q15', type: 'mcq',
        prompt: '【第3課 Ex.4】 その時計は [　] ですか。…18,800円です。\nWhich question fits?',
        options: ['いくら', 'なに', 'どこ', 'だれ'],
        answer: 'いくら',
      },
      // Exercise 5 – Rearrange into questions
      {
        id: 'L3Q16', type: 'mcq',
        prompt: '【第3課 Ex.5】 Rearrange: は／会社／か／ヨーネン／の／です／何\nWhat is the correct question?',
        options: ['ヨーネンは何の会社ですか。', '何はヨーネンの会社ですか。', 'ヨーネンの会社は何ですか。', '会社はヨーネン何のですか。'],
        answer: 'ヨーネンは何の会社ですか。',
      },
      {
        id: 'L3Q17', type: 'mcq',
        prompt: '【第3課 Ex.5】 Rearrange: チョコレート／です／会社／の／ヨーネン／は\nWhat is the correct sentence?',
        options: ['ヨーネンはチョコレートの会社です。', 'チョコレートはヨーネンの会社です。', 'ヨーネンの会社はチョコレートです。', 'チョコレートの会社はヨーネンです。'],
        answer: 'ヨーネンはチョコレートの会社です。',
      },
      {
        id: 'L3Q18', type: 'mcq',
        prompt: '【第3課 Ex.5】 Rearrange: かばん／この／か／は／いくら／です\nWhat is the correct question?',
        options: ['このかばんはいくらですか。', 'いくらはこのかばんですか。', 'このかばんですかはいくら。', 'かばんのこれはいくらですか。'],
        answer: 'このかばんはいくらですか。',
      },
      {
        id: 'L3Q19', type: 'mcq',
        prompt: '【第3課 Ex.5】 Rearrange: エレベーター／どちら／です／は／か\nWhat is the correct question?',
        options: ['エレベーターはどちらですか。', 'どちらはエレベーターですか。', 'エレベーターですかどちらは。', 'どちらのエレベーターですか。'],
        answer: 'エレベーターはどちらですか。',
      },
      // Exercise 6 – Personal answers (multiple choice version)
      {
        id: 'L3Q20', type: 'mcq',
        prompt: '【第3課 Ex.6】 うちはどこですか。Which answer pattern is correct?',
        options: ['うちは〇〇（place）です。', 'うちはだれです。', 'うちはいくらです。', 'うちはなんですか。'],
        answer: 'うちは〇〇（place）です。',
      },
      {
        id: 'L3Q21', type: 'mcq',
        prompt: '【第3課 Ex.6】 あなたの部屋は１階ですか。Which is a correct negative answer?',
        options: ['いいえ、〇〇階です。', 'いいえ、１階じゃありません。', 'はい、ちがいます。', 'いいえ、〇〇円です。'],
        answer: 'いいえ、〇〇階です。',
      },
      {
        id: 'L3Q22', type: 'mcq',
        prompt: '【第3課 Ex.6】 あなたの時計は日本のですか。Which is a correct answer pattern?',
        options: ['はい、日本のです。 / いいえ、〇〇のです。', 'はい、日本人です。', 'いいえ、日本語です。', 'はい、日本のどこです。'],
        answer: 'はい、日本のです。 / いいえ、〇〇のです。',
      },
    ],
  },
];

const TOTAL = SECTIONS.reduce((s, sec) => s + sec.questions.length, 0);

// ─── Flatten all questions in order ────────────────────────────────────────
const ALL_QUESTIONS = SECTIONS.flatMap(sec =>
  sec.questions.map(q => ({ ...q, sectionId: sec.id, sectionLabel: sec.label, sectionColor: sec.color, sectionBg: sec.bg }))
);

// ─── Component ──────────────────────────────────────────────────────────────
export default function MidtermExamPage() {
  const [phase, setPhase] = useState('intro'); // intro | quiz | result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({}); // id → chosen option
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 min

  // Timer — tick every second; transition to result inside the callback (not effect body)
  useEffect(() => {
    if (phase !== 'quiz') return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(t);
          setPhase('result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  const q = ALL_QUESTIONS[current];
  const score = ALL_QUESTIONS.filter(q => answers[q.id] === q.answer).length;
  const pct = Math.round((score / TOTAL) * 100);

  const handleSelect = (opt) => {
    if (revealed) return;
    setSelected(opt);
  };

  const handleCheck = () => {
    if (!selected) return;
    setAnswers(prev => ({ ...prev, [q.id]: selected }));
    setRevealed(true);
  };

  const handleNext = () => {
    if (current < ALL_QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setPhase('result');
    }
  };

  const handleSkip = () => {
    if (current < ALL_QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setPhase('result');
    }
  };

  const restart = () => {
    setCurrent(0);
    setAnswers({});
    setSelected(null);
    setRevealed(false);
    setTimeLeft(40 * 60);
    setPhase('intro');
  };

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');
  const timerWarning = timeLeft < 300;

  const sectionProgress = SECTIONS.map(sec => {
    const qs = sec.questions;
    const done = qs.filter(q => answers[q.id] !== undefined).length;
    const correct = qs.filter(q => answers[q.id] === q.answer).length;
    return { ...sec, done, correct, total: qs.length };
  });

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div style={styles.page}>
        <div style={styles.introCard}>
          <div style={styles.introTop}>
            <div style={styles.introBadge}>中間試験</div>
            <h1 style={styles.introTitle}>Midterm Exam</h1>
            <p style={styles.introSub}>第1・2課 + 第3課 — Japanese Grammar</p>
          </div>
          <div style={styles.introStats}>
            {[
              { label: 'Questions', value: TOTAL },
              { label: 'Time Limit', value: '40 min' },
              { label: 'Lessons', value: '1 · 2 · 3' },
            ].map(s => (
              <div key={s.label} style={styles.statBox}>
                <span style={styles.statVal}>{s.value}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
          <div style={styles.introTopics}>
            <p style={styles.topicsTitle}>Topics Covered</p>
            <div style={styles.topicList}>
              {[
                'は・も・の particles',
                'これ・それ・あれ / この・その・あの / ここ・そこ・あそこ',
                'こちら・そちら・あちら demonstratives',
                'だれ・どなた・何・どこ・いくら question words',
                'Age readings (〇〇歳)',
                'Number & price readings in Japanese',
                'Sentence rearrangement (word order)',
                'じゃありません negative form',
              ].map(t => (
                <div key={t} style={styles.topicItem}>
                  <span style={styles.topicDot}>●</span> {t}
                </div>
              ))}
            </div>
          </div>
          <button style={styles.startBtn} onClick={() => setPhase('quiz')}>
            試験を始める — Start Exam
          </button>
        </div>
      </div>
    );
  }

  // ── RESULT ─────────────────────────────────────────────────────────────────
  if (phase === 'result') {
    const grade =
      pct >= 90 ? { label: 'A', color: '#16a34a', msg: '素晴らしい！Excellent!' } :
      pct >= 80 ? { label: 'B', color: '#0369a1', msg: 'よくできました。Well done!' } :
      pct >= 70 ? { label: 'C', color: '#d97706', msg: 'もう少し頑張りましょう。Keep going!' } :
      pct >= 60 ? { label: 'D', color: '#ea580c', msg: '復習が必要です。Review needed.' } :
                  { label: 'F', color: '#dc2626', msg: 'もっと練習しましょう。Study more!' };

    return (
      <div style={styles.page}>
        <div style={styles.resultCard}>
          <p style={styles.resultLabel}>試験結果 / Exam Results</p>
          <div style={{ ...styles.gradeBadge, background: grade.color }}>{grade.label}</div>
          <p style={styles.resultScore}>{score} / {TOTAL}</p>
          <p style={styles.resultPct}>{pct}%</p>
          <p style={{ ...styles.resultMsg, color: grade.color }}>{grade.msg}</p>

          <div style={styles.resultBreakdown}>
            {sectionProgress.map(sec => (
              <div key={sec.id} style={{ ...styles.secResult, borderColor: sec.color }}>
                <div style={{ ...styles.secResultLabel, color: sec.color }}>{sec.label}</div>
                <div style={styles.secResultScore}>{sec.correct} / {sec.total}</div>
                <div style={styles.secBar}>
                  <div style={{
                    ...styles.secBarFill,
                    width: `${Math.round((sec.correct / sec.total) * 100)}%`,
                    background: sec.color,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Wrong answers review */}
          <div style={styles.reviewSection}>
            <p style={styles.reviewTitle}>復習 / Review Wrong Answers</p>
            {ALL_QUESTIONS.filter(q => answers[q.id] && answers[q.id] !== q.answer).map(q => (
              <div key={q.id} style={styles.reviewItem}>
                <p style={styles.reviewQ}>{q.prompt}</p>
                <p style={styles.reviewWrong}>✗ Your answer: {answers[q.id]}</p>
                <p style={styles.reviewCorrect}>✓ Correct: {q.answer}</p>
              </div>
            ))}
            {ALL_QUESTIONS.filter(q => answers[q.id] && answers[q.id] !== q.answer).length === 0 && (
              <p style={{ textAlign: 'center', color: '#16a34a', fontWeight: 700 }}>全問正解！Perfect score! 🎉</p>
            )}
          </div>

          <button style={styles.restartBtn} onClick={restart}>もう一度 — Try Again</button>
        </div>
      </div>
    );
  }

  // ── QUIZ ───────────────────────────────────────────────────────────────────
  const progress = ((current) / TOTAL) * 100;
  const isCorrect = revealed && selected === q.answer;

  return (
    <div style={styles.page}>
      {/* Timer bar */}
      <div style={styles.timerBar}>
        <div style={styles.timerLeft}>
          <span style={styles.timerLabel}>中間試験</span>
          <span style={{ ...styles.timerTime, color: timerWarning ? '#dc2626' : '#0f172a' }}>
            {timerWarning ? '⚠ ' : ''}{mm}:{ss}
          </span>
        </div>
        <div style={styles.progressWrapper}>
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <span style={styles.progressText}>{current + 1} / {TOTAL}</span>
        </div>
      </div>

      {/* Section pill */}
      <div style={{ ...styles.sectionPill, background: q.sectionBg, color: q.sectionColor, borderColor: q.sectionColor }}>
        {q.sectionLabel}
      </div>

      {/* Question card */}
      <div style={styles.questionCard}>
        <p style={styles.questionText}>{q.prompt}</p>

        <div style={styles.optionsGrid}>
          {q.options.map(opt => {
            let bg = '#fff';
            let border = '#e2e8f0';
            let color = '#1e293b';
            let shadow = '0 1px 4px rgba(0,0,0,0.06)';

            if (selected === opt && !revealed) {
              bg = '#eff6ff'; border = '#3b82f6'; color = '#1d4ed8'; shadow = '0 0 0 3px #bfdbfe';
            }
            if (revealed) {
              if (opt === q.answer) {
                bg = '#f0fdf4'; border = '#22c55e'; color = '#15803d'; shadow = '0 0 0 3px #bbf7d0';
              } else if (opt === selected && opt !== q.answer) {
                bg = '#fef2f2'; border = '#ef4444'; color = '#b91c1c'; shadow = '0 0 0 3px #fecaca';
              } else {
                bg = '#f8fafc'; border = '#e2e8f0'; color = '#94a3b8';
              }
            }

            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                style={{ ...styles.optionBtn, background: bg, borderColor: border, color, boxShadow: shadow }}
              >
                {revealed && opt === q.answer && <span style={styles.checkIcon}>✓ </span>}
                {revealed && opt === selected && opt !== q.answer && <span style={styles.crossIcon}>✗ </span>}
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {revealed && (
          <div style={{
            ...styles.feedback,
            background: isCorrect ? '#f0fdf4' : '#fef2f2',
            borderColor: isCorrect ? '#22c55e' : '#ef4444',
            color: isCorrect ? '#15803d' : '#b91c1c',
          }}>
            {isCorrect ? '✓ 正解！Correct!' : `✗ 不正解。Correct answer: ${q.answer}`}
          </div>
        )}

        {/* Action buttons */}
        <div style={styles.actionRow}>
          {!revealed ? (
            <>
              <button style={styles.skipBtn} onClick={handleSkip}>Skip →</button>
              <button
                style={{ ...styles.checkBtn, opacity: selected ? 1 : 0.4, cursor: selected ? 'pointer' : 'default' }}
                onClick={handleCheck}
              >
                答え合わせ — Check
              </button>
            </>
          ) : (
            <button style={styles.nextBtn} onClick={handleNext}>
              {current < ALL_QUESTIONS.length - 1 ? '次へ — Next →' : '結果を見る — See Results'}
            </button>
          )}
        </div>
      </div>

      {/* Mini section progress */}
      <div style={styles.miniProgress}>
        {sectionProgress.map(sec => (
          <div key={sec.id} style={styles.miniSec}>
            <span style={{ ...styles.miniLabel, color: sec.color }}>{sec.label}</span>
            <span style={styles.miniCount}>{sec.done}/{sec.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: '100%',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 16px 80px',
    fontFamily: "'Noto Sans JP', 'Hiragino Sans', system-ui, sans-serif",
  },

  // Intro
  introCard: {
    width: '100%', maxWidth: 680,
    background: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
    border: '1px solid #e2e8f0',
  },
  introTop: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    padding: '40px 40px 32px',
    textAlign: 'center',
  },
  introBadge: {
    display: 'inline-block',
    background: '#e11d48',
    color: '#fff',
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 3,
    padding: '4px 14px',
    borderRadius: 20,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  introTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 900,
    margin: '0 0 8px',
    letterSpacing: -1,
  },
  introSub: {
    color: '#94a3b8',
    fontSize: 15,
    fontWeight: 500,
    margin: 0,
  },
  introStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: 24,
    padding: '28px 40px',
    borderBottom: '1px solid #f1f5f9',
    flexWrap: 'wrap',
  },
  statBox: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
  },
  statVal: { fontSize: 28, fontWeight: 900, color: '#0f172a' },
  statLabel: { fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 },
  introTopics: { padding: '24px 40px', borderBottom: '1px solid #f1f5f9' },
  topicsTitle: { fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12, margin: '0 0 12px' },
  topicList: { display: 'flex', flexDirection: 'column', gap: 8 },
  topicItem: { fontSize: 14, color: '#334155', fontWeight: 500 },
  topicDot: { color: '#e11d48', marginRight: 8 },
  startBtn: {
    display: 'block', width: 'calc(100% - 80px)', margin: '24px 40px',
    padding: '16px',
    background: '#0f172a',
    color: '#fff',
    border: 'none',
    borderRadius: 14,
    fontSize: 16,
    fontWeight: 800,
    cursor: 'pointer',
    letterSpacing: 0.5,
    transition: 'background 0.2s',
  },

  // Timer bar
  timerBar: {
    width: '100%', maxWidth: 680,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 16,
  },
  timerLeft: { display: 'flex', flexDirection: 'column', gap: 2 },
  timerLabel: { fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2 },
  timerTime: { fontSize: 24, fontWeight: 900, letterSpacing: -1 },
  progressWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 },
  progressTrack: {
    width: 200, height: 6, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden',
  },
  progressFill: { height: '100%', background: '#0f172a', borderRadius: 4, transition: 'width 0.4s ease' },
  progressText: { fontSize: 12, fontWeight: 700, color: '#64748b' },

  // Section pill
  sectionPill: {
    alignSelf: 'flex-start',
    fontSize: 11, fontWeight: 800, letterSpacing: 2,
    padding: '4px 12px', borderRadius: 20,
    border: '1.5px solid',
    marginBottom: 12,
    textTransform: 'uppercase',
  },

  // Question card
  questionCard: {
    width: '100%', maxWidth: 680,
    background: '#fff',
    borderRadius: 20,
    padding: '28px 28px 24px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16, fontWeight: 600, color: '#0f172a',
    lineHeight: 1.7, marginBottom: 24,
    whiteSpace: 'pre-line',
  },
  optionsGrid: {
    display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20,
  },
  optionBtn: {
    padding: '14px 18px',
    border: '2px solid',
    borderRadius: 12,
    fontSize: 14, fontWeight: 600,
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
    lineHeight: 1.5,
  },
  checkIcon: { color: '#16a34a', marginRight: 4, fontWeight: 900 },
  crossIcon: { color: '#dc2626', marginRight: 4, fontWeight: 900 },

  feedback: {
    padding: '12px 16px',
    borderRadius: 10,
    border: '1.5px solid',
    fontSize: 14, fontWeight: 700,
    marginBottom: 16,
    lineHeight: 1.6,
  },
  actionRow: { display: 'flex', gap: 12, justifyContent: 'flex-end' },
  skipBtn: {
    padding: '10px 20px',
    background: 'transparent', border: '1.5px solid #e2e8f0',
    borderRadius: 10, fontSize: 13, fontWeight: 700, color: '#64748b', cursor: 'pointer',
  },
  checkBtn: {
    padding: '10px 24px',
    background: '#0f172a', border: 'none',
    borderRadius: 10, fontSize: 13, fontWeight: 800, color: '#fff', cursor: 'pointer',
  },
  nextBtn: {
    padding: '10px 28px',
    background: '#e11d48', border: 'none',
    borderRadius: 10, fontSize: 13, fontWeight: 800, color: '#fff', cursor: 'pointer',
    width: '100%',
  },

  // Mini progress
  miniProgress: {
    width: '100%', maxWidth: 680,
    display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
  },
  miniSec: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: '#fff', border: '1px solid #e2e8f0',
    borderRadius: 20, padding: '4px 12px',
  },
  miniLabel: { fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 },
  miniCount: { fontSize: 12, fontWeight: 700, color: '#334155' },

  // Result
  resultCard: {
    width: '100%', maxWidth: 680,
    background: '#fff',
    borderRadius: 24,
    padding: '40px 36px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
  },
  resultLabel: { fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 3, margin: '0 0 20px' },
  gradeBadge: {
    width: 80, height: 80, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 40, fontWeight: 900, color: '#fff',
    margin: '0 auto 16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  },
  resultScore: { fontSize: 36, fontWeight: 900, color: '#0f172a', margin: '0 0 4px' },
  resultPct: { fontSize: 18, fontWeight: 700, color: '#64748b', margin: '0 0 8px' },
  resultMsg: { fontSize: 16, fontWeight: 700, margin: '0 0 28px' },

  resultBreakdown: {
    display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28,
  },
  secResult: {
    border: '2px solid', borderRadius: 14, padding: '12px 20px', minWidth: 140, flex: 1,
  },
  secResultLabel: { fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  secResultScore: { fontSize: 22, fontWeight: 900, color: '#0f172a', marginBottom: 8 },
  secBar: { height: 4, background: '#f1f5f9', borderRadius: 2, overflow: 'hidden' },
  secBarFill: { height: '100%', borderRadius: 2, transition: 'width 0.6s ease' },

  reviewSection: {
    textAlign: 'left', background: '#f8fafc', borderRadius: 14, padding: '20px',
    marginBottom: 24, maxHeight: 360, overflowY: 'auto',
  },
  reviewTitle: { fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, margin: '0 0 16px' },
  reviewItem: { marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #e2e8f0' },
  reviewQ: { fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6, whiteSpace: 'pre-line', margin: '0 0 6px' },
  reviewWrong: { fontSize: 12, color: '#dc2626', fontWeight: 600, margin: '0 0 3px' },
  reviewCorrect: { fontSize: 12, color: '#16a34a', fontWeight: 700, margin: 0 },

  restartBtn: {
    display: 'block', width: '100%',
    padding: '14px',
    background: '#0f172a', color: '#fff', border: 'none',
    borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: 'pointer',
  },
};