import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const subscriptions = [
  { name: 'Netflix', amount: 199, lastUsed: '2 days ago', status: 'active', emoji: '🎬' },
  { name: 'Amazon Prime', amount: 129, lastUsed: '15 days ago', status: 'warning', emoji: '📦' },
  { name: 'Spotify', amount: 119, lastUsed: '45 days ago', status: 'danger', emoji: '🎵' },
  { name: 'YouTube Premium', amount: 129, lastUsed: '60+ days ago', status: 'danger', emoji: '▶️' },
  { name: 'Disney+ Hotstar', amount: 299, lastUsed: '90+ days ago', status: 'danger', emoji: '🎪' },
];

export default function SubscriptionWaste() {
  const navigate = useNavigate();

  const activeTotal = subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0);
  const wastedTotal = subscriptions.filter(s => s.status === 'danger').reduce((sum, s) => sum + s.amount, 0);
  const totalSpend = subscriptions.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/weekly-report')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <h2 className="mb-2">Subscription Waste Detector</h2>
        <p className="text-[#1A1A1A]/70">Unused subscriptions detect kar rahe hain</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-[24px] p-6 shadow-xl mb-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={48} />
            <div>
              <h3 className="text-white mb-1">Warning!</h3>
              <p className="text-white/90">₹{wastedTotal}/month waste ho raha hai</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-[20px] p-4">
            <p className="text-white/90 text-sm mb-2">Monthly subscription cost:</p>
            <div className="flex items-center justify-between">
              <h2 className="text-white">₹{totalSpend}</h2>
              <div className="text-right">
                <p className="text-white/90 text-sm">Yearly</p>
                <h3 className="text-white">₹{totalSpend * 12}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {subscriptions.map((sub, i) => (
            <div
              key={i}
              className={`rounded-[20px] p-4 shadow-md ${
                sub.status === 'active' ? 'bg-white' :
                sub.status === 'warning' ? 'bg-yellow-50 border-2 border-yellow-300' :
                'bg-red-50 border-2 border-red-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${
                  sub.status === 'active' ? 'bg-[#34C759]/10' :
                  sub.status === 'warning' ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}>
                  <span className="text-xl">{sub.emoji}</span>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{sub.name}</h3>
                  <p className="text-sm text-[#1A1A1A]/60">Last used: {sub.lastUsed}</p>
                </div>
                <div className="text-right">
                  <div className="mb-1">₹{sub.amount}/mo</div>
                  {sub.status === 'danger' && (
                    <span className="text-xs text-red-600 font-semibold">Cancel?</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#34C759]/10 rounded-[24px] p-5 border-2 border-[#34C759]/30 mb-6">
          <h3 className="mb-3">💰 Saving opportunity</h3>
          <p className="text-sm text-[#1A1A1A]/70 mb-3">
            Agar aap unused subscriptions cancel kar do:
          </p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Monthly saving:</span>
              <span className="font-semibold text-[#34C759]">₹{wastedTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Yearly saving:</span>
              <span className="font-semibold text-[#34C759]">₹{wastedTotal * 12}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/emi-calendar')}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg active:scale-95 transition-transform"
        >
          View EMI Calendar
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
