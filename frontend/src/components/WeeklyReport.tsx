import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, TrendingUp, TrendingDown, Award } from 'lucide-react';

export default function WeeklyReport() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/home')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <h2 className="mb-2">Is hafte ka report</h2>
        <p className="text-[#1A1A1A]/70">21 Nov - 28 Nov 2024</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-[#34C759] to-[#00C853] rounded-[24px] p-6 shadow-xl mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Award size={48} className="text-white" />
            <div>
              <h3 className="text-white mb-1">Badhaai ho! 🎉</h3>
              <p className="text-white/90">Aapne ₹450 save kiya this week</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-[20px] p-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/90 text-sm">Earned</p>
              <h3 className="text-white">₹3,200</h3>
            </div>
            <div>
              <p className="text-white/90 text-sm">Spent</p>
              <h3 className="text-white">₹2,750</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-lg mb-6">
          <h3 className="mb-4">Breakdown by day</h3>
          <div className="space-y-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const income = Math.floor(Math.random() * 500) + 300;
              const expense = Math.floor(Math.random() * 400) + 200;
              const net = income - expense;
              return (
                <div key={day}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">{day}</span>
                    <span className={`text-sm ${net > 0 ? 'text-[#34C759]' : 'text-[#FF6B35]'}`}>
                      {net > 0 ? '+' : ''}₹{net}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-2 bg-[#34C759]/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#34C759] rounded-full" style={{ width: `${(income/800)*100}%` }} />
                    </div>
                    <div className="flex-1 h-2 bg-[#FF6B35]/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF6B35] rounded-full" style={{ width: `${(expense/800)*100}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate('/essential-vs-non-essential')}
            className="bg-white rounded-[20px] p-4 shadow-lg active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-[14px] flex items-center justify-center mx-auto mb-2">
              <TrendingDown size={24} className="text-[#FF6B35]" />
            </div>
            <h3 className="mb-1">Spending</h3>
            <p className="text-sm text-[#1A1A1A]/60">Analysis</p>
          </button>

          <button
            onClick={() => navigate('/subscription-waste')}
            className="bg-white rounded-[20px] p-4 shadow-lg active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-[14px] flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="mb-1">Subscriptions</h3>
            <p className="text-sm text-[#1A1A1A]/60">Waste detector</p>
          </button>
        </div>

        <div className="bg-gradient-to-br from-[#FFB800]/20 to-[#FF6B35]/20 rounded-[24px] p-5 border-2 border-[#FFB800]/30">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="mb-1">Agle hafte ka tip</h3>
              <p className="text-sm text-[#1A1A1A]/70">
                Food delivery par thoda control karo. Is hafte ₹800 gaya hai. Home-cooked khana try karo! 🍱
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
