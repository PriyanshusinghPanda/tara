import { useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, Trophy, Target } from 'lucide-react';

export default function WeeklyChallenge() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const challenge = {
    title: 'Save ₹50 this week',
    description: 'Kisi bhi tarike se ₹50 save karo - food delivery skip, chai kam, kuch bhi!',
    reward: '50 coins + Badge',
    deadline: '5 days left',
    progress: 30,
    current: 30,
    target: 50,
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/home')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Trophy size={32} className="text-[#FFB800]" />
          <h2>Weekly Challenge</h2>
        </div>
        <p className="text-[#1A1A1A]/70">Chhote goals, bade results!</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-[#FFB800] to-[#FF6B35] rounded-[24px] p-6 shadow-xl mb-6">
          <div className="text-center mb-4">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-white mb-2">{challenge.title}</h2>
            <p className="text-white/90">{challenge.description}</p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-[20px] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/90 text-sm">Progress</span>
              <span className="text-white font-semibold">₹{challenge.current} / ₹{challenge.target}</span>
            </div>
            <div className="h-3 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
          </div>
        </div>

        {!accepted ? (
          <div className="bg-white rounded-[24px] p-6 shadow-lg mb-6">
            <h3 className="mb-4">Challenge details</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFB800]/10 rounded-[12px] flex items-center justify-center">
                  <Target size={20} className="text-[#FFB800]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Target: ₹50</p>
                  <p className="text-xs text-[#1A1A1A]/60">Kisi bhi tarike se save karo</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-[12px] flex items-center justify-center">
                  <Trophy size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Reward: {challenge.reward}</p>
                  <p className="text-xs text-[#1A1A1A]/60">Plus bragging rights!</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAccepted(true)}
              className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg active:scale-95 transition-transform"
            >
              Accept Challenge! 💪
            </button>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            <div className="bg-[#34C759]/10 rounded-[24px] p-5 border-2 border-[#34C759]/30 animate-in zoom-in">
              <div className="text-center">
                <div className="text-4xl mb-3">✓</div>
                <h3 className="mb-2">Challenge accepted!</h3>
                <p className="text-sm text-[#1A1A1A]/70">
                  Great! Ab har saving automatically track ho rahi hai. Keep going! 🚀
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-5 shadow-lg">
              <h3 className="mb-4">Tips to complete:</h3>
              <div className="space-y-3">
                {[
                  { emoji: '☕', tip: 'Ek din chai skip karo (₹20 saved)' },
                  { emoji: '🍕', tip: 'Food delivery mat order karo (₹30 saved)' },
                  { emoji: '🚶', tip: 'Walking distance? Auto mat lo!' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <p className="text-sm text-[#1A1A1A]/70">{item.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[24px] p-5 shadow-lg">
          <h3 className="mb-4">Previous challenges</h3>
          <div className="space-y-3">
            {[
              { title: 'No food delivery week', status: 'completed', saved: 150 },
              { title: 'Save ₹100', status: 'completed', saved: 120 },
              { title: 'Track all expenses', status: 'failed', saved: 0 },
            ].map((ch, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {ch.status === 'completed' ? '✅' : '❌'}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{ch.title}</p>
                    <p className="text-xs text-[#1A1A1A]/60">
                      {ch.status === 'completed' ? `Saved ₹${ch.saved}` : 'Try again!'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
