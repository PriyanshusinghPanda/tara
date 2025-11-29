import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, Shield, TrendingUp, ArrowRight } from 'lucide-react';

export default function EmergencyCushion() {
  const navigate = useNavigate();
  const current = 1250;
  const target = 5000;
  const progress = (current / target) * 100;
  const remaining = target - current;

  const monthlyContribution = 200;
  const monthsToTarget = Math.ceil(remaining / monthlyContribution);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/home')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Shield size={32} className="text-[#34C759]" />
          <h2>Emergency Cushion</h2>
        </div>
        <p className="text-[#1A1A1A]/70">Mushkil waqt ke liye safety net</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-[#34C759] to-[#00C853] rounded-[24px] p-6 shadow-xl mb-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/90 text-sm mb-1">Current balance</p>
              <h1 className="text-white">₹{current.toLocaleString()}</h1>
            </div>
            <div className="text-right">
              <p className="text-white/90 text-sm mb-1">Goal</p>
              <h3 className="text-white">₹{target.toLocaleString()}</h3>
            </div>
          </div>

          <div className="mb-2">
            <div className="h-4 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="text-white/90 text-sm text-center">{progress.toFixed(0)}% complete</p>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-lg mb-6">
          <h3 className="mb-4">Kyon zaroori hai?</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="text-2xl">🏥</span>
              <div>
                <h3 className="mb-1">Medical emergency</h3>
                <p className="text-sm text-[#1A1A1A]/60">Achanak doctor ya hospital ka kharcha</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">🔧</span>
              <div>
                <h3 className="mb-1">Vehicle breakdown</h3>
                <p className="text-sm text-[#1A1A1A]/60">Bike ya auto ka sudden repair</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">💼</span>
              <div>
                <h3 className="mb-1">Job loss / Low income</h3>
                <p className="text-sm text-[#1A1A1A]/60">1-2 mahine ka kharcha cover ho jayega</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#FFB800]/20 to-[#FF6B35]/20 rounded-[24px] p-5 border-2 border-[#FFB800]/30 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp size={24} className="text-[#FF6B35]" />
            <h3>Auto-contribution active</h3>
          </div>
          <p className="text-sm text-[#1A1A1A]/70 mb-3">
            Har mahine ₹{monthlyContribution} automatically emergency fund mein ja rahi hai.
          </p>
          <div className="bg-white rounded-[16px] p-3">
            <p className="text-sm">
              <span className="font-semibold">Target achieve hoga:</span> {monthsToTarget} mahine mein (~ {new Date(Date.now() + monthsToTarget * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="h-[60px] bg-[#34C759] text-white rounded-[20px] shadow-lg active:scale-95 transition-transform">
            Add money now
          </button>
          <button
            onClick={() => navigate('/save-surplus')}
            className="h-[60px] bg-white border-2 border-[#34C759] text-[#34C759] rounded-[20px] shadow-lg active:scale-95 transition-transform"
          >
            View settings
          </button>
        </div>

        <button
          onClick={() => navigate('/weekly-report')}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span>View weekly report</span>
          <ArrowRight size={24} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
