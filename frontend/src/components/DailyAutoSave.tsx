import { useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';

const amounts = [10, 20, 30, 50];

export default function DailyAutoSave() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(20);
  const [enabled, setEnabled] = useState(false);

  const monthlyTotal = selectedAmount * 30;
  const yearlyTotal = selectedAmount * 365;

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/round-off-savings')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Calendar size={32} className="text-[#FF6B35]" />
          <h2>Daily Auto-Save</h2>
        </div>
        <p className="text-[#1A1A1A]/70">Har din thoda sa save karo, bada result dekho</p>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-[24px] p-6 shadow-lg mb-6">
          <h3 className="mb-4">Roz kitna save karoge?</h3>
          <div className="grid grid-cols-4 gap-3 mb-6">
            {amounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`h-20 rounded-[16px] flex flex-col items-center justify-center transition-all ${
                  selectedAmount === amount
                    ? 'bg-[#FF6B35] text-white scale-110 shadow-lg'
                    : 'bg-gray-100'
                }`}
              >
                <span className="text-2xl mb-1">₹{amount}</span>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#34C759]/10 to-[#00C853]/10 rounded-[20px] p-5 border-2 border-[#34C759]/30">
            <h3 className="mb-3">Impact dekho:</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#1A1A1A]/70">1 mahine mein:</span>
                <span className="font-semibold">₹{monthlyTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1A1A1A]/70">1 saal mein:</span>
                <span className="font-semibold text-[#34C759]">₹{yearlyTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="mb-1">Enable Daily Auto-Save</h3>
              <p className="text-sm text-[#1A1A1A]/60">Har subah ₹{selectedAmount} auto-save</p>
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
              ✓ Activated! Har subah 9 AM ko ₹{selectedAmount} automatically save ho jayega 🌅
            </p>
          </div>
        )}

        <button
          onClick={() => navigate('/emergency-cushion')}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span>Next: Emergency Fund</span>
          <ArrowRight size={24} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
