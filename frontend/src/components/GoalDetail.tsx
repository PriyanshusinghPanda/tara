import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, TrendingUp, Calendar, DollarSign } from 'lucide-react';

export default function GoalDetail() {
  const navigate = useNavigate();

  const goalData = {
    emoji: '🏍️',
    name: 'Bike',
    targetAmount: 120000,
    currentAmount: 32000,
    monthlySIP: 8800,
    remainingMonths: 10,
    startDate: 'Feb 2024',
  };

  const progress = (goalData.currentAmount / goalData.targetAmount) * 100;
  const remaining = goalData.targetAmount - goalData.currentAmount;

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/home')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{goalData.emoji}</span>
          <div>
            <h2>{goalData.name} Goal</h2>
            <p className="text-sm text-[#1A1A1A]/60">Started {goalData.startDate}</p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-[24px] p-6 shadow-xl mb-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/90 text-sm mb-1">Current progress</p>
              <h1 className="text-white">₹{goalData.currentAmount.toLocaleString()}</h1>
            </div>
            <div className="text-right">
              <p className="text-white/90 text-sm mb-1">Target</p>
              <h3 className="text-white">₹{(goalData.targetAmount/1000)}K</h3>
            </div>
          </div>

          <div className="relative">
            <svg viewBox="0 0 200 200" className="w-40 h-40 mx-auto">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="20"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="white"
                strokeWidth="20"
                strokeDasharray={2 * Math.PI * 80}
                strokeDashoffset={2 * Math.PI * 80 * (1 - progress / 100)}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
              <text x="100" y="95" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold">
                {progress.toFixed(0)}%
              </text>
              <text x="100" y="115" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="14">
                complete
              </text>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-[20px] p-4 shadow-md text-center">
            <div className="w-10 h-10 bg-[#34C759]/10 rounded-[12px] flex items-center justify-center mx-auto mb-2">
              <DollarSign size={20} className="text-[#34C759]" />
            </div>
            <p className="text-xs text-[#1A1A1A]/60 mb-1">Monthly SIP</p>
            <h3>₹{goalData.monthlySIP.toLocaleString()}</h3>
          </div>

          <div className="bg-white rounded-[20px] p-4 shadow-md text-center">
            <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-[12px] flex items-center justify-center mx-auto mb-2">
              <Calendar size={20} className="text-[#FF6B35]" />
            </div>
            <p className="text-xs text-[#1A1A1A]/60 mb-1">Time left</p>
            <h3>{goalData.remainingMonths}mo</h3>
          </div>

          <div className="bg-white rounded-[20px] p-4 shadow-md text-center">
            <div className="w-10 h-10 bg-[#FFB800]/10 rounded-[12px] flex items-center justify-center mx-auto mb-2">
              <TrendingUp size={20} className="text-[#FFB800]" />
            </div>
            <p className="text-xs text-[#1A1A1A]/60 mb-1">Remaining</p>
            <h3>₹{(remaining/1000).toFixed(0)}K</h3>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-lg mb-6">
          <h3 className="mb-4">Recent contributions</h3>
          <div className="space-y-3">
            {[
              { date: 'Nov 25, 2024', amount: 8800, type: 'Auto-SIP' },
              { date: 'Nov 10, 2024', amount: 500, type: 'Bonus save' },
              { date: 'Oct 25, 2024', amount: 8800, type: 'Auto-SIP' },
              { date: 'Oct 15, 2024', amount: 1000, type: 'Extra save' },
            ].map((txn, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{txn.type}</p>
                  <p className="text-xs text-[#1A1A1A]/60">{txn.date}</p>
                </div>
                <span className="text-[#34C759]">+₹{txn.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#34C759]/10 rounded-[24px] p-5 border-2 border-[#34C759]/30 mb-6">
          <h3 className="mb-2">🎉 On track!</h3>
          <p className="text-sm text-[#1A1A1A]/70">
            Agar aap aise hi chalte rahe toh <span className="font-semibold">August 2025</span> mein bike le sakte ho! Keep it up 💪
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="h-[60px] bg-[#34C759] text-white rounded-[20px] shadow-lg active:scale-95 transition-transform">
            Add money now
          </button>
          <button
            onClick={() => navigate('/simple-investment')}
            className="h-[60px] bg-white border-2 border-[#FF6B35] text-[#FF6B35] rounded-[20px] shadow-lg active:scale-95 transition-transform"
          >
            Invest options
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
