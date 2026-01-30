import React, { useState } from 'react';
import { BookOpen, GraduationCap, ChevronRight, CheckCircle, Volume2 } from 'lucide-react';
import { N5_LESSONS } from '../data/kana';
import WordQuizPage from './WordQuizPage';
import SentenceQuizPage from './SentenceQuizPage';

export default function LessonPage() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [phase, setPhase] = useState('selection'); // selection, study, wordQuiz, sentenceQuiz, complete

  // Speech Synthesis Helper
  const playSound = (text) => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const startLesson = (lesson) => {
    setSelectedLesson(lesson);
    setPhase('study');
  };

  if (phase === 'selection') {
    return (
      <div className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-bold text-slate-800 px-2">JLPT N5 Lessons</h2>
        <div className="grid gap-4">
          {N5_LESSONS.map((lesson) => (
            <button 
              key={lesson.id}
              onClick={() => startLesson(lesson)}
              className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left"
            >
              <div>
                <h3 className="font-bold text-lg text-slate-900">{lesson.title}</h3>
                <p className="text-slate-500 text-sm">{lesson.description}</p>
                <div className="mt-2 flex gap-2">
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-md font-bold text-slate-500 uppercase">{lesson.words.length} Words</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-md font-bold text-slate-500 uppercase">{lesson.sentences.length} Sentences</span>
                </div>
              </div>
              <ChevronRight className="text-slate-300" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'study') {
    return (
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col h-full animate-fade-in">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800">{selectedLesson.title}: Vocabulary Study</h3>
          <button 
            onClick={() => setPhase('wordQuiz')}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-200 hover:scale-105 transition-transform"
          >
            Start Quiz
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedLesson.words.map((word, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-white flex justify-between items-center group hover:border-red-200 transition-colors">
                <div className="flex items-center gap-4">
                  {/* Voice Button for each word */}
                  <button 
                    onClick={() => playSound(word.jp)}
                    className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    title="Listen"
                  >
                    <Volume2 size={18} />
                  </button>
                  <div>
                    <div className="text-xl font-bold text-slate-800">{word.jp}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{word.romaji}</div>
                  </div>
                </div>
                <div className="text-slate-500 font-medium">{word.en}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'wordQuiz') {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-4 flex items-center gap-2 text-slate-400 text-sm font-bold">
          <span className="text-red-500">Step 2:</span> Word Mastery
        </div>
        <div className="flex-1">
          <WordQuizPage 
            wordList={selectedLesson.words} 
            onComplete={() => setPhase('sentenceQuiz')} 
            isLessonMode={true} 
          />
        </div>
        <button onClick={() => setPhase('sentenceQuiz')} className="mt-4 p-4 text-slate-400 font-bold text-sm underline">Skip to Sentences</button>
      </div>
    );
  }

  if (phase === 'sentenceQuiz') {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-4 flex items-center gap-2 text-slate-400 text-sm font-bold">
          <span className="text-red-500">Step 3:</span> Context sentences
        </div>
        <div className="flex-1">
          <SentenceQuizPage 
            lessonSentences={selectedLesson.sentences}
            onComplete={() => setPhase('complete')}
            isLessonMode={true}
          />
        </div>
      </div>
    );
  }

  if (phase === 'complete') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-fade-in">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <CheckCircle size={48} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Lesson Complete!</h2>
          <p className="text-slate-500 mt-2">You've mastered {selectedLesson.title}.</p>
        </div>
        <button 
          onClick={() => setPhase('selection')}
          className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform"
        >
          Back to Lessons
        </button>
      </div>
    );
  }
}