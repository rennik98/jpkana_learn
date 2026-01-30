// --- Data: The Basic 46 Kana Characters ---
export const  kanaData = [
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

export const KANA_ROWS = [
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
// export const INITIAL_WORD_DATA = [
//   { jp: 'こんにちは', en: 'Hello', romaji: 'Konnichiwa' },
//   { jp: 'ありがとう', en: 'Thank you', romaji: 'Arigatou' },
//   { jp: 'ねこ', en: 'Cat', romaji: 'Neko' },
//   { jp: 'いぬ', en: 'Dog', romaji: 'Inu' },
//   { jp: 'とり', en: 'Bird', romaji: 'Tori' },
//   { jp: 'みず', en: 'Water', romaji: 'Mizu' },
//   { jp: 'ほん', en: 'Book', romaji: 'Hon' },
//   { jp: 'にほん', en: 'Japan', romaji: 'Nihon' },
//   { jp: 'はい', en: 'Yes', romaji: 'Hai' },
//   { jp: 'いいえ', en: 'No', romaji: 'Iie' },
//   { jp: 'おはよう', en: 'Good Morning', romaji: 'Ohayou' },
//   { jp: 'おやすみ', en: 'Good Night', romaji: 'Oyasumi' },
//   { jp: 'ともだち', en: 'Friend', romaji: 'Tomodachi' },
//   { jp: 'おいしい', en: 'Delicious', romaji: 'Oishii' },
//   { jp: 'さむらい', en: 'Samurai', romaji: 'Samurai' },
//   { jp: 'すし', en: 'Sushi', romaji: 'Sushi' },
//   { jp: 'せんせい', en: 'Teacher', romaji: 'Sensei' },
//   { jp: 'あい', en: 'Love', romaji: 'Ai' },
//   { jp: 'あか', en: 'Red', romaji: 'Aka' },
//   { jp: 'あお', en: 'Blue', romaji: 'Ao' },
//   { jp: 'さくら', en: 'Cherry Blossom', romaji: 'Sakura' },
//   { jp: 'やま', en: 'Mountain', romaji: 'Yama' },
//   { jp: 'かわ', en: 'River', romaji: 'Kawa' },
//   { jp: 'ひと', en: 'Person', romaji: 'Hito' },
//   { jp: 'なまえ', en: 'Name', romaji: 'Namae' },
//   { jp: 'たべる', en: 'Eat', romaji: 'Taberu' },
//   { jp: 'のむ', en: 'Drink', romaji: 'Nomu' },
//   { jp: 'みる', en: 'See', romaji: 'Miru' },
//   { jp: 'きく', en: 'Listen / Ask', romaji: 'Kiku' },
//   { jp: 'はなす', en: 'Speak', romaji: 'Hanasu' },
//   { jp: 'いく', en: 'Go', romaji: 'Iku' },
//   { jp: 'くる', en: 'Come', romaji: 'Kuru' },
//   { jp: 'かえる', en: 'Return', romaji: 'Kaeru' },
//   { jp: 'ねる', en: 'Sleep', romaji: 'Neru' },
//   { jp: 'おきる', en: 'Wake up', romaji: 'Okiru' },

//   { jp: 'ひ', en: 'Fire', romaji: 'Hi' },
//   { jp: 'つき', en: 'Moon', romaji: 'Tsuki' },
//   { jp: 'ほし', en: 'Star', romaji: 'Hoshi' },
//   { jp: 'そら', en: 'Sky', romaji: 'Sora' },
//   { jp: 'あめ', en: 'Rain', romaji: 'Ame' },

//   { jp: 'くるま', en: 'Car', romaji: 'Kuruma' },
//   { jp: 'でんしゃ', en: 'Train', romaji: 'Densha' },
//   { jp: 'えき', en: 'Station', romaji: 'Eki' },
//   { jp: 'みち', en: 'Road', romaji: 'Michi' },
//   { jp: 'いえ', en: 'House', romaji: 'Ie' },

//   { jp: 'がっこう', en: 'School', romaji: 'Gakkou' },
//   { jp: 'だいがく', en: 'University', romaji: 'Daigaku' },
//   { jp: 'しごと', en: 'Work', romaji: 'Shigoto' },
//   { jp: 'かいしゃ', en: 'Company', romaji: 'Kaisha' },
//   { jp: 'やすみ', en: 'Holiday', romaji: 'Yasumi' },

//   { jp: 'じかん', en: 'Time', romaji: 'Jikan' },
//   { jp: 'きょう', en: 'Today', romaji: 'Kyou' },
//   { jp: 'あした', en: 'Tomorrow', romaji: 'Ashita' },
//   { jp: 'きのう', en: 'Yesterday', romaji: 'Kinou' },
//   { jp: 'いま', en: 'Now', romaji: 'Ima' },

//   { jp: 'おおきい', en: 'Big', romaji: 'Ookii' },
//   { jp: 'ちいさい', en: 'Small', romaji: 'Chiisai' },
//   { jp: 'あたらしい', en: 'New', romaji: 'Atarashii' },
//   { jp: 'ふるい', en: 'Old', romaji: 'Furui' },
//   { jp: 'はやい', en: 'Fast', romaji: 'Hayai' },

//   { jp: 'すき', en: 'Like', romaji: 'Suki' },
//   { jp: 'きらい', en: 'Dislike', romaji: 'Kirai' },
//   { jp: 'たのしい', en: 'Fun', romaji: 'Tanoshii' },
//   { jp: 'かなしい', en: 'Sad', romaji: 'Kanashii' },
//   { jp: 'うれしい', en: 'Happy', romaji: 'Ureshii' },

//   { jp: 'ひとり', en: 'One person', romaji: 'Hitori' },
//   { jp: 'ふたり', en: 'Two people', romaji: 'Futari' },
//   { jp: 'みんな', en: 'Everyone', romaji: 'Minna' },
//   { jp: 'とも', en: 'Together', romaji: 'Tomo' },

//   { jp: 'たべもの', en: 'Food', romaji: 'Tabemono' },
//   { jp: 'のみもの', en: 'Drink (noun)', romaji: 'Nomimono' },
//   { jp: 'ごはん', en: 'Rice / Meal', romaji: 'Gohan' },
//   { jp: 'にく', en: 'Meat', romaji: 'Niku' },
//   { jp: 'さかな', en: 'Fish', romaji: 'Sakana' },

//   { jp: 'でんわ', en: 'Phone', romaji: 'Denwa' },
//   { jp: 'てがみ', en: 'Letter', romaji: 'Tegami' },
//   { jp: 'ほんや', en: 'Bookstore', romaji: 'Honya' },
//   { jp: 'びょういん', en: 'Hospital', romaji: 'Byouin' },
//   { jp: 'ぎんこう', en: 'Bank', romaji: 'Ginkou' },

//   { jp: 'はいしゃ', en: 'Dentist', romaji: 'Haisha' },
//   { jp: 'せかい', en: 'World', romaji: 'Sekai' },
//   { jp: 'ぶんか', en: 'Culture', romaji: 'Bunka' },
//   { jp: 'えいご', en: 'English', romaji: 'Eigo' },
//   { jp: 'にほんご', en: 'Japanese language', romaji: 'Nihongo' },
// ];

export const INITIAL_WORD_DATA = [
  { jp: 'こんにちは', en: 'Hello', romaji: 'Konnichiwa', category: 'Greetings' },
  { jp: 'ありがとう', en: 'Thank you', romaji: 'Arigatou', category: 'Greetings' },
  { jp: 'ねこ', en: 'Cat', romaji: 'Neko', category: 'Animals' },
  { jp: 'いぬ', en: 'Dog', romaji: 'Inu', category: 'Animals' },
  { jp: 'とり', en: 'Bird', romaji: 'Tori', category: 'Animals' },
  { jp: 'みず', en: 'Water', romaji: 'Mizu', category: 'Basic' },
  { jp: 'ほん', en: 'Book', romaji: 'Hon', category: 'Objects' },
  { jp: 'にほん', en: 'Japan', romaji: 'Nihon', category: 'Places' },
  // ... apply categories to the rest of your data
];

// --- Data: Numbers ---
export const NUMBER_DATA = [
  { value: '0', romaji: 'zero / rei', hiragana: 'ぜろ / れい', katakana: 'ゼロ / レイ' },
  { value: '1', romaji: 'ichi', hiragana: 'いち', katakana: 'イチ' },
  { value: '2', romaji: 'ni', hiragana: 'に', katakana: 'ニ' },
  { value: '3', romaji: 'san', hiragana: 'さん', katakana: 'サン' },
  { value: '4', romaji: 'yon / shi', hiragana: 'よん / し', katakana: 'ヨン / シ' },
  { value: '5', romaji: 'go', hiragana: 'ご', katakana: 'ゴ' },
  { value: '6', romaji: 'roku', hiragana: 'ろく', katakana: 'ロク' },
  { value: '7', romaji: 'nana / shichi', hiragana: 'なな / しち', katakana: 'ナナ / シチ' },
  { value: '8', romaji: 'hachi', hiragana: 'はち', katakana: 'ハチ' },
  { value: '9', romaji: 'kyuu / ku', hiragana: 'きゅう / く', katakana: 'キュウ / ク' },
  { value: '10', romaji: 'juu', hiragana: 'じゅう', katakana: 'ジュウ' },
  
  { value: '11', romaji: 'juu-ichi', hiragana: 'じゅういち', katakana: 'ジュウイチ' },
  { value: '12', romaji: 'juu-ni', hiragana: 'じゅうに', katakana: 'ジュウニ' },
  { value: '20', romaji: 'ni-juu', hiragana: 'にじゅう', katakana: 'ニジュウ' },
  { value: '30', romaji: 'san-juu', hiragana: 'さんじゅう', katakana: 'サンジュウ' },
  { value: '40', romaji: 'yon-juu', hiragana: 'よんじゅう', katakana: 'ヨンジュウ' },
  { value: '50', romaji: 'go-juu', hiragana: 'ごじゅう', katakana: 'ゴジュウ' },
  { value: '60', romaji: 'roku-juu', hiragana: 'ろくじゅう', katakana: 'ロクジュウ' },
  { value: '70', romaji: 'nana-juu', hiragana: 'ななじゅう', katakana: 'ナナジュウ' },
  { value: '80', romaji: 'hachi-juu', hiragana: 'はちじゅう', katakana: 'ハチジュウ' },
  { value: '90', romaji: 'kyuu-juu', hiragana: 'きゅうじゅう', katakana: 'キュウジュウ' },
  
  { value: '100', romaji: 'hyaku', hiragana: 'ひゃく', katakana: 'ヒャク' },
  { value: '1,000', romaji: 'sen', hiragana: 'せん', katakana: 'セン' },
  { value: '10,000', romaji: 'man', hiragana: 'まん', katakana: 'マン' },
];

// --- Data: Fill-in-the-blank Sentences ---
export const SENTENCE_DATA = [
  { 
    sentence: "わたしは ___ をたべます。", 
    answer: "ごはん", 
    romaji: "Gohan",
    translation: "I eat rice/meal.",
    easyTranslation: "I eat ___.", // Context for Easy Mode
    targetMeaning: "rice / meal", 
    distractors: ["みず", "ほん", "いえ"] 
  },
  { 
    sentence: "これは ___ ですか？", 
    answer: "なん", 
    romaji: "Nan",
    translation: "What is this?",
    easyTranslation: "___ is this?",
    targetMeaning: "what", 
    distractors: ["だれ", "どこ", "いつ"] 
  },
  { 
    sentence: "きょうは ___ です。", 
    answer: "あつい", 
    romaji: "Atsui",
    translation: "Today is hot.",
    easyTranslation: "Today is ___.",
    targetMeaning: "hot", 
    distractors: ["さむい", "おいしい", "はやい"] 
  }
];


// --- Data: JLPT N5 Lessons ---
export const N5_LESSONS = [
  {
    id: 1,
    title: "Lesson 1: Greetings & People",
    description: "Master basic introductions and common people nouns.",
    words: [
      { jp: 'こんにちは', en: 'Hello', romaji: 'Konnichiwa' },
      { jp: 'ありがとう', en: 'Thank you', romaji: 'Arigatou' },
      { jp: 'はい', en: 'Yes', romaji: 'Hai' },
      { jp: 'いいえ', en: 'No', romaji: 'Iie' },
      { jp: 'せんせい', en: 'Teacher', romaji: 'Sensei' },
      { jp: 'がくせい', en: 'Student', romaji: 'Gakusei' },
      { jp: 'ともだち', en: 'Friend', romaji: 'Tomodachi' },
      { jp: 'なまえ', en: 'Name', romaji: 'Namae' },
      { jp: 'わたし', en: 'I / Me', romaji: 'Watashi' },
      { jp: 'ひと', en: 'Person', romaji: 'Hito' }
    ],
    sentences: [
      { 
        sentence: "わたしは ___ です。", 
        answer: "がくせい", 
        romaji: "Gakusei",
        translation: "I am a student.",
        easyTranslation: "I am a ___.",
        targetMeaning: "student",
        distractors: ["がっこう", "なまえ", "はい"]
      },
      { 
        sentence: "あの方は ___ です。", 
        answer: "せんせい", 
        romaji: "Sensei",
        translation: "That person is a teacher.",
        easyTranslation: "That person is a ___.",
        targetMeaning: "teacher",
        distractors: ["ひと", "ともだち", "いいえ"]
      },
      { 
        sentence: "お ___ は何ですか？", 
        answer: "なまえ", 
        romaji: "Namae",
        translation: "What is your name?",
        easyTranslation: "What is your ___?",
        targetMeaning: "name",
        distractors: ["わたし", "がくせい", "はい"]
      },
      { 
        sentence: "田中さんは ___ です。", 
        answer: "ともだち", 
        romaji: "Tomodachi",
        translation: "Mr. Tanaka is a friend.",
        easyTranslation: "Mr. Tanaka is a ___.",
        targetMeaning: "friend",
        distractors: ["せんせい", "なまえ", "いいえ"]
      },
      { 
        sentence: "___ 、お元気ですか？", 
        answer: "こんにちは", 
        romaji: "Konnichiwa",
        translation: "Hello, how are you?",
        easyTranslation: "___, how are you?",
        targetMeaning: "hello",
        distractors: ["ありがとう", "おやすみ", "はい"]
      }
    ]
  },
  {
    id: 2,
    title: "Lesson 2: Daily Objects & Places",
    description: "Learn about items you find in a school or office.",
    words: [
      { jp: 'ほん', en: 'Book', romaji: 'Hon' },
      { jp: 'くるま', en: 'Car', romaji: 'Kuruma' },
      { jp: 'みず', en: 'Water', romaji: 'Mizu' },
      { jp: 'いえ', en: 'House', romaji: 'Ie' },
      { jp: 'えき', en: 'Station', romaji: 'Eki' },
      { jp: 'がっこう', en: 'School', romaji: 'Gakkou' },
      { jp: 'つくえ', en: 'Desk', romaji: 'Tsukue' },
      { jp: 'いす', en: 'Chair', romaji: 'Isu' },
      { jp: 'とけい', en: 'Clock / Watch', romaji: 'Tokei' },
      { jp: 'かばん', en: 'Bag', romaji: 'Kaban' }
    ],
    sentences: [
      { 
        sentence: "___ を読みます。", 
        answer: "ほん", 
        romaji: "Hon",
        translation: "I read a book.",
        easyTranslation: "I read a ___.",
        targetMeaning: "book",
        distractors: ["つくえ", "みず", "いす"]
      },
      { 
        sentence: "これはわたしの ___ です。", 
        answer: "かばん", 
        romaji: "Kaban",
        translation: "This is my bag.",
        easyTranslation: "This is my ___.",
        targetMeaning: "bag",
        distractors: ["くるま", "えき", "いえ"]
      },
      { 
        sentence: "___ へ行きます。", 
        answer: "がっこう", 
        romaji: "Gakkou",
        translation: "I go to school.",
        easyTranslation: "I go to ___.",
        targetMeaning: "school",
        distractors: ["ほん", "とけい", "みず"]
      },
      { 
        sentence: "___ はどこですか？", 
        answer: "えき", 
        romaji: "Eki",
        translation: "Where is the station?",
        easyTranslation: "Where is the ___?",
        targetMeaning: "station",
        distractors: ["いす", "かばん", "つくえ"]
      },
      { 
        sentence: "___ を飲みます。", 
        answer: "みず", 
        romaji: "Mizu",
        translation: "I drink water.",
        easyTranslation: "I drink ___.",
        targetMeaning: "water",
        distractors: ["とけい", "くるま", "ほん"]
      }
    ]
  },
  {
    id: 3,
    title: "Lesson 3: Basic Verbs",
    description: "Common actions for your daily routine.",
    words: [
      { jp: 'たべる', en: 'Eat', romaji: 'Taberu' },
      { jp: 'のむ', en: 'Drink', romaji: 'Nomu' },
      { jp: 'いく', en: 'Go', romaji: 'Iku' },
      { jp: 'くる', en: 'Come', romaji: 'Kuru' },
      { jp: 'みる', en: 'See / Watch', romaji: 'Miru' },
      { jp: 'ねる', en: 'Sleep', romaji: 'Neru' },
      { jp: 'おきる', en: 'Wake up', romaji: 'Okiru' },
      { jp: 'よむ', en: 'Read', romaji: 'Yomu' },
      { jp: 'かく', en: 'Write', romaji: 'Kaku' },
      { jp: 'きく', en: 'Listen', romaji: 'Kiku' }
    ],
    sentences: [
      { 
        sentence: "テレビを ___ 。", 
        answer: "みる", 
        romaji: "Miru",
        translation: "I watch TV.",
        easyTranslation: "I ___ TV.",
        targetMeaning: "watch",
        distractors: ["たべる", "かく", "ねる"]
      },
      { 
        sentence: "あした、ここへ ___ 。", 
        answer: "くる", 
        romaji: "Kuru",
        translation: "I will come here tomorrow.",
        easyTranslation: "I will ___ here tomorrow.",
        targetMeaning: "come",
        distractors: ["いく", "きく", "のむ"]
      },
      { 
        sentence: "よる１１じに ___ 。", 
        answer: "ねる", 
        romaji: "Neru",
        translation: "I sleep at 11 PM.",
        easyTranslation: "I ___ at 11 PM.",
        targetMeaning: "sleep",
        distractors: ["おきる", "よむ", "たべる"]
      },
      { 
        sentence: "あさ６じに ___ 。", 
        answer: "おきる", 
        romaji: "Okiru",
        translation: "I wake up at 6 AM.",
        easyTranslation: "I ___ at 6 AM.",
        targetMeaning: "wake up",
        distractors: ["くる", "ねる", "いく"]
      },
      { 
        sentence: "手紙を ___ 。", 
        answer: "かく", 
        romaji: "Kaku",
        translation: "I write a letter.",
        easyTranslation: "I ___ a letter.",
        targetMeaning: "write",
        distractors: ["のむ", "よむ", "きく"]
      }
    ]
  },
  {
    id: 4,
    title: "Lesson 4: Time & Calendar",
    description: "Talking about days and time.",
    words: [
      { jp: 'きょう', en: 'Today', romaji: 'Kyou' },
      { jp: 'あした', en: 'Tomorrow', romaji: 'Ashita' },
      { jp: 'きのう', en: 'Yesterday', romaji: 'Kinou' },
      { jp: 'いま', en: 'Now', romaji: 'Ima' },
      { jp: 'じかん', en: 'Time', romaji: 'Jikan' },
      { jp: 'あさ', en: 'Morning', romaji: 'Asa' },
      { jp: 'ひる', en: 'Noon', romaji: 'Hiru' },
      { jp: 'よる', en: 'Night', romaji: 'Yoru' },
      { jp: 'やすみ', en: 'Holiday / Rest', romaji: 'Yasumi' },
      { jp: 'しゅうまつ', en: 'Weekend', romaji: 'Shuumatsu' }
    ],
    sentences: [
      { 
        sentence: "___ は何じですか？", 
        answer: "いま", 
        romaji: "Ima",
        translation: "What time is it now?",
        easyTranslation: "What time is it ___?",
        targetMeaning: "now",
        distractors: ["あした", "きのう", "よる"]
      },
      { 
        sentence: "___ は日曜日です。", 
        answer: "きょう", 
        romaji: "Kyou",
        translation: "Today is Sunday.",
        easyTranslation: "___ is Sunday.",
        targetMeaning: "today",
        distractors: ["あさ", "ひる", "じかん"]
      },
      { 
        sentence: "きのうは ___ でした。", 
        answer: "やすみ", 
        romaji: "Yasumi",
        translation: "Yesterday was a holiday.",
        easyTranslation: "Yesterday was a ___.",
        targetMeaning: "holiday",
        distractors: ["きょう", "いま", "しゅうまつ"]
      },
      { 
        sentence: "___ に勉強します。", 
        answer: "よる", 
        romaji: "Yoru",
        translation: "I study at night.",
        easyTranslation: "I study at ___.",
        targetMeaning: "night",
        distractors: ["あさ", "ひる", "じかん"]
      },
      { 
        sentence: "よい ___ を！", 
        answer: "しゅうまつ", 
        romaji: "Shuumatsu",
        translation: "Have a good weekend!",
        easyTranslation: "Have a good ___!",
        targetMeaning: "weekend",
        distractors: ["あした", "きのう", "いま"]
      }
    ]
  },
  {
    id: 5,
    title: "Lesson 5: Essential Adjectives",
    description: "Describe things using basic i-adjectives.",
    words: [
      { jp: 'おおきい', en: 'Big', romaji: 'Ookii' },
      { jp: 'ちいさい', en: 'Small', romaji: 'Chiisai' },
      { jp: 'たかい', en: 'Expensive / High', romaji: 'Takai' },
      { jp: 'やすい', en: 'Cheap', romaji: 'Yasui' },
      { jp: 'いい', en: 'Good', romaji: 'Ii' },
      { jp: 'わるい', en: 'Bad', romaji: 'Warui' },
      { jp: 'あつい', en: 'Hot', romaji: 'Atsui' },
      { jp: 'さむい', en: 'Cold', romaji: 'Samui' },
      { jp: 'おいしい', en: 'Delicious', romaji: 'Oishii' },
      { jp: 'むずかしい', en: 'Difficult', romaji: 'Mazukashii' }
    ],
    sentences: [
      { 
        sentence: "このりゅうごは ___ です。", 
        answer: "おいしい", 
        romaji: "Oishii",
        translation: "This apple is delicious.",
        easyTranslation: "This apple is ___.",
        targetMeaning: "delicious",
        distractors: ["あつい", "わるい", "やすい"]
      },
      { 
        sentence: "日本のごはんは ___ ですか？", 
        answer: "やすい", 
        romaji: "Yasui",
        translation: "Is Japanese food cheap?",
        easyTranslation: "Is Japanese food ___?",
        targetMeaning: "cheap",
        distractors: ["さむい", "おおきい", "むずかしい"]
      },
      { 
        sentence: "きょうはとても ___ ですね。", 
        answer: "あつい", 
        romaji: "Atsui",
        translation: "It is very hot today, isn't it?",
        easyTranslation: "It is very ___ today.",
        targetMeaning: "hot",
        distractors: ["おいしい", "ちいさい", "たかい"]
      },
      { 
        sentence: "日本語は ___ です。", 
        answer: "むずかしい", 
        romaji: "Mazukashii",
        translation: "Japanese is difficult.",
        easyTranslation: "Japanese is ___.",
        targetMeaning: "difficult",
        distractors: ["いい", "わるい", "やすい"]
      },
      { 
        sentence: "この家はとても ___ です。", 
        answer: "おおきい", 
        romaji: "Ookii",
        translation: "This house is very big.",
        easyTranslation: "This house is very ___.",
        targetMeaning: "big",
        distractors: ["さむい", "たかい", "おいしい"]
      }
    ]
  }
];