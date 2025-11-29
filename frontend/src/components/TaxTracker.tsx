import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft } from 'lucide-react';

const sections = [
  {
    section: '80C',
    limit: 150000,
    invested: 25000,
    items: [
      { name: 'PPF', amount: 12000 },
      { name: 'ELSS Mutual Fund', amount: 8000 },
      { name: 'Life Insurance', amount: 5000 },
    ],
  },
  {
    section: '80D',
    limit: 25000,
    invested: 8000,
    items: [
      { name: 'Health Insurance (Self)', amount: 8000 },
    ],
  },
];

export default function TaxTracker() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/tax-saver')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <h2 className="mb-2">Tax Tracker</h2>
        <p className="text-[#1A1A1A]/70">FY 2024-25 ka full overview</p>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-[24px] p-5 shadow-lg mb-6">
          <h3 className="mb-4">Total tax saving potential</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-[#1A1A1A]/70">Total invested:</span>
              <span className="font-semibold">₹33,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#1A1A1A]/70">Total limit available:</span>
              <span className="font-semibold">₹1,75,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#1A1A1A]/70">Tax saved so far:</span>
              <span className="font-semibold text-[#34C759]">₹9,900</span>
            </div>
            <div className="h-px bg-gray-200" />
            <div className="flex justify-between">
              <span className="text-sm font-semibold">Potential additional saving:</span>
              <span className="font-semibold text-[#FF6B35]">₹42,600</span>
            </div>
          </div>
        </div>

        {sections.map((sec, i) => {
          const progress = (sec.invested / sec.limit) * 100;
          const remaining = sec.limit - sec.invested;
          return (
            <div key={i} className="bg-white rounded-[24px] p-5 shadow-lg mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3>Section {sec.section}</h3>
                <span className="text-sm text-[#1A1A1A]/60">
                  ₹{sec.invested.toLocaleString()} / ₹{(sec.limit/1000)}K
                </span>
              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-[#34C759] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="space-y-2 mb-3">
                {sec.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <span className="text-sm text-[#1A1A1A]/70">{item.name}</span>
                    <span className="text-sm font-semibold">₹{item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#FFB800]/10 rounded-[12px] p-3">
                <p className="text-xs">
                  <span className="font-semibold">₹{remaining.toLocaleString()} remaining</span> - Invest more to save ₹{Math.floor(remaining * 0.3).toLocaleString()} in tax!
                </p>
              </div>
            </div>
          );
        })}

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-[24px] p-5 shadow-xl text-white">
          <h3 className="text-white mb-3">📚 Tax planning guide</h3>
          <p className="text-white/90 text-sm mb-4">
            Confused about tax? Humari free mini-course mein sab samajh aa jayega - simple Hindi mein!
          </p>
          <button
            onClick={() => navigate('/mini-lesson')}
            className="w-full h-[50px] bg-white text-purple-600 rounded-[16px] active:scale-95 transition-transform"
          >
            Start learning
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
