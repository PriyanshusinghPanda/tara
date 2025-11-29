import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function SaveSurplus() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/emergency-cushion')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles size={32} className="text-[#FFB800]" />
          <h2>Save Surplus</h2>
        </div>
        <p className="text-[#1A1A1A]/70">Mahine ke end mein bacha hua automatically save karo</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-[#FFB800] to-[#FF6B35] rounded-[24px] p-6 shadow-xl mb-6 text-white">
          <h3 className="text-white mb-4">Ye kaise hota hai?</h3>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <span>1️⃣</span>
              <p className="text-white/90">Mahine ka last din (30th/31st)</p>
            </div>
            <div className="flex gap-3">
              <span>2️⃣</span>
              <p className="text-white/90">Hum check karte hain kitna paisa bacha</p>
            </div>
            <div className="flex gap-3">
              <span>3️⃣</span>
              <p className="text-white/90">Surplus amount emergency fund ya goal mein transfer</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-lg mb-6">
          <h3 className="mb-4">Current month estimate</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#1A1A1A]/70">Income:</span>
              <span className="font-semibold">₹12,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1A1A1A]/70">Spent so far:</span>
              <span className="text-[#FF6B35]">-₹8,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1A1A1A]/70">Committed (EMI/bills):</span>
              <span className="text-[#FF6B35]">-₹2,000</span>
            </div>
            <div className="h-px bg-gray-200" />
            <div className="flex justify-between">
              <span className="font-semibold">Expected surplus:</span>
              <span className="font-semibold text-[#34C759]">₹1,500</span>
            </div>
          </div>
        </div>

        <div className="bg-[#34C759]/10 rounded-[24px] p-5 border-2 border-[#34C759]/30">
          <p className="text-sm text-center">
            <span className="font-semibold">Great news!</span> Agar aap aise hi chalte rahe toh is mahine ₹1,500 extra save ho jayega 🎉
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
