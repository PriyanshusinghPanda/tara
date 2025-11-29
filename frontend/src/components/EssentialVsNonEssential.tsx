import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft } from 'lucide-react';

export default function EssentialVsNonEssential() {
  const navigate = useNavigate();

  const essential = [
    { emoji: '🏠', label: 'Rent', amount: 8000 },
    { emoji: '🍚', label: 'Groceries', amount: 2500 },
    { emoji: '⛽', label: 'Fuel', amount: 1800 },
    { emoji: '📱', label: 'Phone bill', amount: 299 },
  ];

  const nonEssential = [
    { emoji: '🍕', label: 'Food delivery', amount: 1200 },
    { emoji: '🎬', label: 'Movies', amount: 400 },
    { emoji: '👕', label: 'Clothes', amount: 1500 },
    { emoji: '☕', label: 'Chai/Coffee', amount: 350 },
  ];

  const essentialTotal = essential.reduce((sum, item) => sum + item.amount, 0);
  const nonEssentialTotal = nonEssential.reduce((sum, item) => sum + item.amount, 0);
  const total = essentialTotal + nonEssentialTotal;

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/weekly-report')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <h2 className="mb-2">Essential vs Non-Essential</h2>
        <p className="text-[#1A1A1A]/70">Dekho kahan zaroorat hai aur kahan shauq</p>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-[24px] p-6 shadow-lg mb-6">
          <h3 className="mb-4 text-center">Total spending: ₹{total.toLocaleString()}</h3>
          <div className="flex gap-2 h-8 rounded-full overflow-hidden mb-4">
            <div
              className="bg-[#34C759] flex items-center justify-center"
              style={{ width: `${(essentialTotal/total)*100}%` }}
            >
              <span className="text-white text-sm">{((essentialTotal/total)*100).toFixed(0)}%</span>
            </div>
            <div
              className="bg-[#FF6B35] flex items-center justify-center"
              style={{ width: `${(nonEssentialTotal/total)*100}%` }}
            >
              <span className="text-white text-sm">{((nonEssentialTotal/total)*100).toFixed(0)}%</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#34C759] rounded-full" />
              <span className="text-sm">Essential</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#FF6B35] rounded-full" />
              <span className="text-sm">Non-Essential</span>
            </div>
          </div>
        </div>

        <div className="bg-[#34C759]/10 rounded-[24px] p-5 border-2 border-[#34C759]/30 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3>✓ Essential</h3>
            <h3 className="text-[#34C759]">₹{essentialTotal.toLocaleString()}</h3>
          </div>
          <div className="space-y-2">
            {essential.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{item.emoji}</span>
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className="text-sm">₹{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FF6B35]/10 rounded-[24px] p-5 border-2 border-[#FF6B35]/30 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3>⚠️ Non-Essential</h3>
            <h3 className="text-[#FF6B35]">₹{nonEssentialTotal.toLocaleString()}</h3>
          </div>
          <div className="space-y-2">
            {nonEssential.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{item.emoji}</span>
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className="text-sm">₹{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#FFB800]/20 to-[#FF6B35]/20 rounded-[24px] p-5 border-2 border-[#FFB800]/30">
          <p className="text-sm">
            <span className="font-semibold">💡 Saving opportunity:</span> Agar aap non-essential spending 30% kam kar do toh ₹{Math.floor(nonEssentialTotal * 0.3)} extra save ho sakta hai!
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
