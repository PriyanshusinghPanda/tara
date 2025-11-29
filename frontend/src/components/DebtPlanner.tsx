import { useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, Zap, Mountain } from 'lucide-react';

export default function DebtPlanner() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'snowball' | 'avalanche'>('snowball');

  const snowballOrder = [
    { name: 'Credit Card', outstanding: 18000, emi: 1500, priority: 1, reason: 'Lowest balance' },
    { name: 'Personal Loan', outstanding: 35000, emi: 2800, priority: 2, reason: 'Medium balance' },
    { name: 'Bike Loan', outstanding: 45000, emi: 3200, priority: 3, reason: 'Highest balance' },
  ];

  const avalancheOrder = [
    { name: 'Credit Card', outstanding: 18000, emi: 1500, rate: 18.0, priority: 1, reason: 'Highest interest (18%)' },
    { name: 'Personal Loan', outstanding: 35000, emi: 2800, rate: 14.0, priority: 2, reason: 'Medium interest (14%)' },
    { name: 'Bike Loan', outstanding: 45000, emi: 3200, rate: 12.5, priority: 3, reason: 'Lowest interest (12.5%)' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/loan-dashboard')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <h2 className="mb-2">Debt Planner</h2>
        <p className="text-[#1A1A1A]/70">Smart tarike se debt clear karo</p>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-[24px] p-5 shadow-lg mb-6">
          <h3 className="mb-4">Choose your strategy</h3>
          
          <button
            onClick={() => setMethod('snowball')}
            className={`w-full rounded-[20px] p-5 mb-3 transition-all ${
              method === 'snowball'
                ? 'bg-gradient-to-br from-[#34C759] to-[#00C853] text-white shadow-lg scale-105'
                : 'bg-gray-50 border-2 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center ${
                method === 'snowball' ? 'bg-white/20' : 'bg-[#34C759]/10'
              }`}>
                <Zap size={28} className={method === 'snowball' ? 'text-white' : 'text-[#34C759]'} />
              </div>
              <div className="flex-1 text-left">
                <h3 className={method === 'snowball' ? 'text-white mb-1' : 'mb-1'}>Snowball Method</h3>
                <p className={`text-sm ${method === 'snowball' ? 'text-white/90' : 'text-[#1A1A1A]/60'}`}>
                  Sabse chhota loan pehle clear karo (motivation milti hai)
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setMethod('avalanche')}
            className={`w-full rounded-[20px] p-5 transition-all ${
              method === 'avalanche'
                ? 'bg-gradient-to-br from-[#FF6B35] to-[#FFB800] text-white shadow-lg scale-105'
                : 'bg-gray-50 border-2 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center ${
                method === 'avalanche' ? 'bg-white/20' : 'bg-[#FF6B35]/10'
              }`}>
                <Mountain size={28} className={method === 'avalanche' ? 'text-white' : 'text-[#FF6B35]'} />
              </div>
              <div className="flex-1 text-left">
                <h3 className={method === 'avalanche' ? 'text-white mb-1' : 'mb-1'}>Avalanche Method</h3>
                <p className={`text-sm ${method === 'avalanche' ? 'text-white/90' : 'text-[#1A1A1A]/60'}`}>
                  Highest interest wala loan pehle clear (paisa bachega)
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-lg mb-6">
          <h3 className="mb-4">Payment priority order:</h3>
          <div className="space-y-3">
            {(method === 'snowball' ? snowballOrder : avalancheOrder).map((loan, i) => (
              <div key={i} className="bg-gray-50 rounded-[16px] p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i === 0 ? 'bg-[#FFB800]' : i === 1 ? 'bg-gray-300' : 'bg-orange-300'
                  }`}>
                    <span className="text-white text-sm font-semibold">{loan.priority}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{loan.name}</h3>
                    <p className="text-sm text-[#1A1A1A]/60">{loan.reason}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#1A1A1A]/60">Outstanding:</span>
                  <span className="font-semibold">₹{loan.outstanding.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#FFB800]/20 to-[#FF6B35]/20 rounded-[24px] p-5 border-2 border-[#FFB800]/30 mb-6">
          <h3 className="mb-2">💡 Pro tip</h3>
          <p className="text-sm text-[#1A1A1A]/70">
            Agar aap extra ₹500/month pay karo, toh aap <span className="font-semibold">6 months pehle</span> debt-free ho jaoge aur <span className="font-semibold">₹8,400 interest save</span> ho jayega!
          </p>
        </div>

        <button
          onClick={() => navigate('/emi-auto-block')}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg active:scale-95 transition-transform"
        >
          Setup EMI Auto-Block
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
