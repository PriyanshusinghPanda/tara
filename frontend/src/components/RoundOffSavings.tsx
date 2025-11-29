import { useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, ArrowRight, Coins } from 'lucide-react';

const examples = [
  { original: 348, roundedTo: 350, saved: 2 },
  { original: 127, roundedTo: 130, saved: 3 },
  { original: 895, roundedTo: 900, saved: 5 },
];

export default function RoundOffSavings() {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);

  const totalSaved = examples.reduce((sum, ex) => sum + ex.saved, 0);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/spend-resistance')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Coins size={32} className="text-[#FFB800]" />
          <h2>Round-Off Savings</h2>
        </div>
        <p className="text-[#1A1A1A]/70">Har transaction par thoda sa save karo</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-[#FFB800] to-[#FF6B35] rounded-[24px] p-6 shadow-xl mb-6">
          <h3 className="text-white mb-4">Kaise kaam karta hai?</h3>
          <p className="text-white/90 mb-4 text-sm">
            Har kharche ko round-off karke difference automatically save ho jayega! Example:
          </p>
          <div className="space-y-2">
            {examples.map((ex, i) => (
              <div key={i} className="bg-white/20 backdrop-blur-sm rounded-[16px] p-3 flex items-center justify-between">
                <span className="text-white">₹{ex.original} → ₹{ex.roundedTo}</span>
                <span className="text-[#34C759] bg-white/30 px-3 py-1 rounded-full">+₹{ex.saved}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-[16px] p-3 text-center">
            <p className="text-white/90 text-sm mb-1">Is mahine tak saved</p>
            <h2 className="text-white">₹{totalSaved * 30} 🎉</h2>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="mb-1">Enable Round-Off Savings</h3>
              <p className="text-sm text-[#1A1A1A]/60">Automatically chalu ho jayega</p>
            </div>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`w-14 h-8 rounded-full transition-all ${
                enabled ? 'bg-[#34C759]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full transition-all ${
                enabled ? 'ml-7' : 'ml-1'
              }`} />
            </button>
          </div>
        </div>

        {enabled && (
          <div className="bg-[#34C759]/10 rounded-[24px] p-5 border-2 border-[#34C759]/30 mb-6 animate-in fade-in">
            <p className="text-sm text-center">
              ✓ Activated! Ab har transaction automatically round-off hogi aur savings piggy bank mein jayegi 🐷
            </p>
          </div>
        )}

        <button
          onClick={() => navigate('/daily-auto-save')}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span>Next: Daily Auto-Save</span>
          <ArrowRight size={24} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
