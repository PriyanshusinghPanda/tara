import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft } from 'lucide-react';

const categories = [
  { emoji: '🍽️', label: 'Food & Dining', amount: 4200, percent: 35, color: '#FF6B35' },
  { emoji: '⛽', label: 'Fuel & Transport', amount: 2800, percent: 23, color: '#FFB800' },
  { emoji: '🏠', label: 'Rent & Bills', amount: 3000, percent: 25, color: '#34C759' },
  { emoji: '🎬', label: 'Entertainment', amount: 1500, percent: 12, color: '#8B5CF6' },
  { emoji: '📱', label: 'Other', amount: 600, percent: 5, color: '#6B7280' },
];

export default function SpendingBreakdown() {
  const navigate = useNavigate();
  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/home')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <h2 className="mb-2">Spending breakdown</h2>
        <p className="text-[#1A1A1A]/70">November 2024 ka analysis</p>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-[24px] p-6 shadow-lg mb-6">
          <h3 className="mb-6 text-center">Total spent: ₹{total.toLocaleString()}</h3>
          
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg viewBox="0 0 200 200" className="transform -rotate-90">
              {categories.map((cat, index) => {
                const previousPercent = categories.slice(0, index).reduce((sum, c) => sum + c.percent, 0);
                const circumference = 2 * Math.PI * 80;
                const offset = circumference - (cat.percent / 100) * circumference;
                const rotation = (previousPercent / 100) * 360;
                
                return (
                  <circle
                    key={cat.label}
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke={cat.color}
                    strokeWidth="40"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center' }}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-[#1A1A1A]/60">This month</p>
                <h3>₹{(total/1000).toFixed(1)}K</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {categories.map((cat) => (
            <div key={cat.label} className="bg-white rounded-[20px] p-4 shadow-md">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center" style={{ backgroundColor: `${cat.color}20` }}>
                  <span className="text-xl">{cat.emoji}</span>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{cat.label}</h3>
                  <p className="text-sm text-[#1A1A1A]/60">{cat.percent}% of total</p>
                </div>
                <div>
                  ₹{cat.amount.toLocaleString()}
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/recurring-payments')}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg active:scale-95 transition-transform"
        >
          View recurring payments
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
