import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, TrendingUp, Shield, Zap } from 'lucide-react';

const investmentOptions = [
  {
    icon: Shield,
    name: 'Recurring Deposit (RD)',
    returns: '6-7% p.a.',
    risk: 'Very Low',
    minAmount: 500,
    emoji: '🏦',
    color: 'bg-[#34C759]',
    pros: ['100% safe', 'Fixed returns', 'Any bank'],
  },
  {
    icon: TrendingUp,
    name: 'Mutual Fund SIP',
    returns: '10-12% p.a.',
    risk: 'Medium',
    minAmount: 500,
    emoji: '📈',
    color: 'bg-[#FF6B35]',
    pros: ['Higher returns', 'Professional managed', 'Tax benefits'],
  },
  {
    icon: Zap,
    name: 'Digital Gold',
    returns: '8-10% p.a.',
    risk: 'Low',
    minAmount: 100,
    emoji: '🪙',
    color: 'bg-[#FFB800]',
    pros: ['Safe investment', 'Flexible amount', 'Can sell anytime'],
  },
];

export default function SimpleInvestment() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/goal-detail')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <h2 className="mb-2">Investment Options</h2>
        <p className="text-[#1A1A1A]/70">Simple aur safe tareeke se paisa badhao</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-[#FFB800]/20 to-[#FF6B35]/20 rounded-[24px] p-5 border-2 border-[#FFB800]/30 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="mb-1">Investment tip</h3>
              <p className="text-sm text-[#1A1A1A]/70">
                Savings account mein paisa mat rakho! Invest karo aur paisa khud badhta rahega 🚀
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {investmentOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.name} className="bg-white rounded-[24px] p-5 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 ${option.color} rounded-[16px] flex items-center justify-center`}>
                    <span className="text-2xl">{option.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{option.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#34C759] font-semibold">{option.returns}</span>
                      <span className="text-xs text-[#1A1A1A]/60">• {option.risk} risk</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-[16px] p-3 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#1A1A1A]/70">Minimum amount:</span>
                    <span className="font-semibold">₹{option.minAmount}/month</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {option.pros.map((pro, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#34C759] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-[#1A1A1A]/70">{pro}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full h-[50px] bg-[#FF6B35] text-white rounded-[16px] active:scale-95 transition-transform">
                  Start investing
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-lg mb-6">
          <h3 className="mb-3">Investment calculator</h3>
          <p className="text-sm text-[#1A1A1A]/70 mb-4">
            Agar aap ₹2,000/month invest karo @ 10% returns:
          </p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-[#1A1A1A]/60">1 year mein:</span>
              <span className="font-semibold">₹25,200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#1A1A1A]/60">3 years mein:</span>
              <span className="font-semibold">₹83,600</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#1A1A1A]/60">5 years mein:</span>
              <span className="font-semibold text-[#34C759]">₹1,55,000</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/tax-saver')}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg active:scale-95 transition-transform"
        >
          View tax saving options
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
