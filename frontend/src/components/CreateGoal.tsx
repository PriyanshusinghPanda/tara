import { useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, Target } from 'lucide-react';

const goalPresets = [
  { emoji: '🏍️', label: 'Bike', amount: 120000, months: 10 },
  { emoji: '📱', label: 'Phone', amount: 35000, months: 6 },
  { emoji: '🏠', label: 'House Down Payment', amount: 500000, months: 36 },
  { emoji: '💍', label: 'Wedding', amount: 200000, months: 18 },
  { emoji: '🎓', label: 'Education', amount: 80000, months: 12 },
  { emoji: '✈️', label: 'Vacation', amount: 50000, months: 8 },
];

export default function CreateGoal() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(goalPresets[0]);
  const [customAmount, setCustomAmount] = useState(selected.amount.toString());
  const [customMonths, setCustomMonths] = useState(selected.months.toString());

  const handleCreate = () => {
    localStorage.setItem('currentGoal', JSON.stringify({
      ...selected,
      amount: parseInt(customAmount),
      months: parseInt(customMonths),
    }));
    navigate('/goal-detail');
  };

  const monthlyTarget = Math.ceil(parseInt(customAmount) / parseInt(customMonths));

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/home')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Target size={32} className="text-[#FF6B35]" />
          <h2>Create Goal</h2>
        </div>
        <p className="text-[#1A1A1A]/70">Badi cheez lena hai? Let's plan!</p>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-[24px] p-5 shadow-lg mb-6">
          <h3 className="mb-4">Kya lena hai?</h3>
          <div className="grid grid-cols-3 gap-3">
            {goalPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setSelected(preset);
                  setCustomAmount(preset.amount.toString());
                  setCustomMonths(preset.months.toString());
                }}
                className={`rounded-[16px] p-4 flex flex-col items-center gap-2 transition-all ${
                  selected.label === preset.label
                    ? 'bg-[#FF6B35] text-white shadow-lg scale-105'
                    : 'bg-gray-100'
                }`}
              >
                <span className="text-3xl">{preset.emoji}</span>
                <span className="text-xs text-center">{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-lg mb-6">
          <h3 className="mb-4">Goal details</h3>
          
          <div className="mb-4">
            <label className="text-sm text-[#1A1A1A]/70 mb-2 block">Target amount (₹)</label>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full h-14 bg-gray-50 rounded-[16px] px-4 border-2 border-gray-200 focus:border-[#FF6B35] outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-[#1A1A1A]/70 mb-2 block">Time period (months)</label>
            <input
              type="number"
              value={customMonths}
              onChange={(e) => setCustomMonths(e.target.value)}
              className="w-full h-14 bg-gray-50 rounded-[16px] px-4 border-2 border-gray-200 focus:border-[#FF6B35] outline-none"
            />
          </div>

          <div className="bg-gradient-to-br from-[#34C759]/10 to-[#00C853]/10 rounded-[20px] p-4 border-2 border-[#34C759]/30">
            <h3 className="mb-2">Monthly SIP needed:</h3>
            <h1 className="text-[#34C759]">₹{monthlyTarget.toLocaleString()}</h1>
            <p className="text-sm text-[#1A1A1A]/60 mt-2">
              {parseInt(customMonths)} mahine mein ₹{parseInt(customAmount).toLocaleString()} save ho jayega
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#FFB800]/20 to-[#FF6B35]/20 rounded-[24px] p-5 border-2 border-[#FFB800]/30 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <p className="text-sm text-[#1A1A1A]/70">
              Hum automatically har mahine ₹{monthlyTarget.toLocaleString()} alag kar denge. Aapko kuch karna nahi padega!
            </p>
          </div>
        </div>

        <button
          onClick={handleCreate}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg active:scale-95 transition-transform"
        >
          Create goal & start saving
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
