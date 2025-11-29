import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, Calendar } from 'lucide-react';

const recurring = [
  { emoji: '🏠', name: 'House Rent', amount: 8000, frequency: 'Monthly', nextDate: '1st Dec', category: 'Essential' },
  { emoji: '📱', name: 'Mobile Recharge', amount: 299, frequency: 'Monthly', nextDate: '15th Dec', category: 'Essential' },
  { emoji: '🎬', name: 'Netflix', amount: 199, frequency: 'Monthly', nextDate: '20th Dec', category: 'Lifestyle' },
  { emoji: '🏦', name: 'Bike EMI', amount: 3200, frequency: 'Monthly', nextDate: '5th Dec', category: 'EMI' },
  { emoji: '💳', name: 'Credit Card', amount: 1500, frequency: 'Monthly', nextDate: '10th Dec', category: 'EMI' },
];

export default function RecurringPayments() {
  const navigate = useNavigate();
  const totalMonthly = recurring.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/spending-breakdown')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <h2 className="mb-2">Recurring Payments</h2>
        <p className="text-[#1A1A1A]/70">Auto-detected monthly expenses</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-[24px] p-6 shadow-xl mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={32} className="text-white" />
            <div>
              <p className="text-white/90 text-sm">Total monthly commitments</p>
              <h2 className="text-white">₹{totalMonthly.toLocaleString()}</h2>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-[16px] p-3">
            <p className="text-white text-sm">Ye amount automatically reserve kar dete hain har mahine 💡</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {recurring.map((item, index) => (
            <div key={index} className="bg-white rounded-[20px] p-4 shadow-md">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${
                  item.category === 'Essential' ? 'bg-[#34C759]/10' :
                  item.category === 'EMI' ? 'bg-red-100' :
                  'bg-purple-100'
                }`}>
                  <span className="text-xl">{item.emoji}</span>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{item.name}</h3>
                  <p className="text-sm text-[#1A1A1A]/60">{item.frequency} • Next: {item.nextDate}</p>
                </div>
                <div className="text-right">
                  <div>₹{item.amount}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.category === 'Essential' ? 'bg-[#34C759]/20 text-[#34C759]' :
                    item.category === 'EMI' ? 'bg-red-100 text-red-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/income-celebration')}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg active:scale-95 transition-transform"
        >
          Setup auto-payment blocks
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
