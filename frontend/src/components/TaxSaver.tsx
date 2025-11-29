import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, Shield, TrendingUp } from 'lucide-react';

export default function TaxSaver() {
  const navigate = useNavigate();

  const currentInvestment = 25000;
  const maxDeduction = 150000;
  const remaining = maxDeduction - currentInvestment;
  const potentialSave = Math.floor(remaining * 0.3);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/simple-investment')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Shield size={32} className="text-[#34C759]" />
          <h2>Tax Saver</h2>
        </div>
        <p className="text-[#1A1A1A]/70">Smart tarike se tax bachao</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-[#34C759] to-[#00C853] rounded-[24px] p-6 shadow-xl mb-6 text-white">
          <h3 className="text-white mb-4">Tax saving opportunity!</h3>
          <div className="bg-white/20 backdrop-blur-sm rounded-[20px] p-4 mb-3">
            <p className="text-white/90 text-sm mb-2">Agar aap ₹{remaining.toLocaleString()} more invest karo:</p>
            <h1 className="text-white">₹{potentialSave.toLocaleString()}</h1>
            <p className="text-white/90 text-sm">tax bach sakta hai! 🎉</p>
          </div>
          <p className="text-white/90 text-xs">
            Section 80C limit: ₹1,50,000 per year
          </p>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-lg mb-6">
          <h3 className="mb-4">Current status (FY 2024-25)</h3>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-[#1A1A1A]/70">Invested so far:</span>
              <span className="font-semibold">₹{currentInvestment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#1A1A1A]/70">Max limit (80C):</span>
              <span className="font-semibold">₹{maxDeduction.toLocaleString()}</span>
            </div>
            <div className="h-px bg-gray-200" />
            <div className="flex justify-between">
              <span className="text-sm font-semibold">Remaining:</span>
              <span className="font-semibold text-[#FF6B35]">₹{remaining.toLocaleString()}</span>
            </div>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#34C759] rounded-full"
              style={{ width: `${(currentInvestment / maxDeduction) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="bg-white rounded-[20px] p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#34C759]/10 rounded-[14px] flex items-center justify-center">
                <span className="text-xl">🏦</span>
              </div>
              <div className="flex-1">
                <h3 className="mb-1">PPF Account</h3>
                <p className="text-sm text-[#1A1A1A]/60">7.1% return + Tax free</p>
              </div>
              <button className="px-4 py-2 bg-[#34C759] text-white rounded-[12px] text-sm active:scale-95 transition-transform">
                Open
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-[14px] flex items-center justify-center">
                <span className="text-xl">📈</span>
              </div>
              <div className="flex-1">
                <h3 className="mb-1">ELSS Mutual Fund</h3>
                <p className="text-sm text-[#1A1A1A]/60">10-12% return + Tax benefit</p>
              </div>
              <button className="px-4 py-2 bg-[#FF6B35] text-white rounded-[12px] text-sm active:scale-95 transition-transform">
                Start
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-[14px] flex items-center justify-center">
                <span className="text-xl">🏥</span>
              </div>
              <div className="flex-1">
                <h3 className="mb-1">Health Insurance</h3>
                <p className="text-sm text-[#1A1A1A]/60">80D - Extra ₹25K limit</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-[12px] text-sm active:scale-95 transition-transform">
                View
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#FFB800]/20 to-[#FF6B35]/20 rounded-[24px] p-5 border-2 border-[#FFB800]/30 mb-6">
          <h3 className="mb-2">💡 Smart move</h3>
          <p className="text-sm text-[#1A1A1A]/70">
            March se pehle invest kar do! Last minute rush mein galat decision mat lo. Start small, ₹5,000/month bhi kafi hai.
          </p>
        </div>

        <button
          onClick={() => navigate('/tax-tracker')}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg active:scale-95 transition-transform"
        >
          View full tax tracker
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
