import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, Clock, BookOpen, ArrowRight } from 'lucide-react';

const lessons = [
  {
    id: 1,
    title: 'Credit Score kya hota hai?',
    duration: '2 min read',
    category: 'Basics',
    completed: false,
    emoji: '📊',
  },
  {
    id: 2,
    title: 'EMI vs Cash Payment - Kya better hai?',
    duration: '3 min read',
    category: 'Loans',
    completed: false,
    emoji: '💳',
  },
  {
    id: 3,
    title: 'Emergency Fund kyon zaroori hai?',
    duration: '2 min read',
    category: 'Savings',
    completed: true,
    emoji: '🛡️',
  },
  {
    id: 4,
    title: 'Tax kaise bachaye - Simple guide',
    duration: '4 min read',
    category: 'Tax',
    completed: false,
    emoji: '💰',
  },
];

export default function MiniLesson() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/home')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={32} className="text-purple-600" />
          <h2>Mini Lessons</h2>
        </div>
        <p className="text-[#1A1A1A]/70">2-minute mein finance seekho</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-[24px] p-6 shadow-xl mb-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-[20px] flex items-center justify-center">
              <span className="text-3xl">📚</span>
            </div>
            <div>
              <h3 className="text-white mb-1">Today's lesson</h3>
              <p className="text-white/90 text-sm">Credit Score kya hota hai?</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/ai-coach')}
            className="w-full h-[50px] bg-white text-purple-600 rounded-[16px] active:scale-95 transition-transform"
          >
            Start reading
          </button>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3>Learning streak</h3>
            <span className="text-2xl">🔥</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <h1 className="text-[#FF6B35]">3</h1>
            <span className="text-[#1A1A1A]/70">days in a row</span>
          </div>
          <div className="flex gap-2">
            {[true, true, true, false, false, false, false].map((active, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${
                  active ? 'bg-[#FF6B35]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <h3 className="mb-4">All lessons</h3>
        <div className="space-y-3 mb-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`rounded-[20px] p-4 shadow-md ${
                lesson.completed ? 'bg-[#34C759]/10 border-2 border-[#34C759]/30' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center ${
                  lesson.completed ? 'bg-[#34C759]/20' : 'bg-purple-100'
                }`}>
                  <span className="text-2xl">{lesson.emoji}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
                      {lesson.category}
                    </span>
                    {lesson.completed && (
                      <span className="text-xs text-[#34C759]">✓ Completed</span>
                    )}
                  </div>
                  <h3 className="mb-1">{lesson.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-[#1A1A1A]/60">
                    <Clock size={14} />
                    <span>{lesson.duration}</span>
                  </div>
                </div>
                <button className="text-[#FF6B35]">
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#FFB800]/20 to-[#FF6B35]/20 rounded-[24px] p-5 border-2 border-[#FFB800]/30">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="mb-1">Daily learning habit</h3>
              <p className="text-sm text-[#1A1A1A]/70">
                Roz sirf 2 minute padhoge toh 1 mahine mein finance expert ban jaoge! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
