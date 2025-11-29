import { useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft } from 'lucide-react';

const unknownTxns = [
  { id: 1, title: 'UPI to Ramesh', amount: 500, time: 'Yesterday 3:45 PM' },
  { id: 2, title: 'ATM withdrawal', amount: 2000, time: 'Yesterday 10:20 AM' },
  { id: 3, title: 'Payment to merchant', amount: 850, time: '2 days ago' },
];

const categories = [
  { emoji: '🍽️', label: 'Food', color: 'bg-orange-100' },
  { emoji: '⛽', label: 'Fuel', color: 'bg-yellow-100' },
  { emoji: '🏠', label: 'Rent', color: 'bg-blue-100' },
  { emoji: '🎬', label: 'Fun', color: 'bg-purple-100' },
  { emoji: '👕', label: 'Shopping', color: 'bg-pink-100' },
  { emoji: '📱', label: 'Bills', color: 'bg-green-100' },
];

export default function UnknownTransactions() {
  const navigate = useNavigate();
  const [categorized, setCategorized] = useState<number[]>([]);

  const handleCategorize = (txnId: number, category: string) => {
    setCategorized([...categorized, txnId]);
    setTimeout(() => {
      if (categorized.length + 1 === unknownTxns.length) {
        navigate('/daily-cashflow');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/daily-cashflow')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <h2 className="mb-2">Unknown transactions</h2>
        <p className="text-[#1A1A1A]/70">In kharcho ko categorize karo</p>
      </div>

      <div className="px-6 space-y-6">
        {unknownTxns.map((txn) => (
          <div
            key={txn.id}
            className={`bg-white rounded-[24px] p-5 shadow-lg transition-all ${
              categorized.includes(txn.id) ? 'opacity-50 scale-95' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="mb-1">{txn.title}</h3>
                <p className="text-sm text-[#1A1A1A]/60">{txn.time}</p>
              </div>
              <div className="text-[#FF6B35]">
                -₹{txn.amount}
              </div>
            </div>

            {!categorized.includes(txn.id) && (
              <>
                <p className="text-sm text-[#1A1A1A]/70 mb-3">Ye kis category mein aata hai?</p>
                <div className="grid grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => handleCategorize(txn.id, cat.label)}
                      className={`${cat.color} rounded-[16px] p-3 flex flex-col items-center gap-2 active:scale-95 transition-transform`}
                    >
                      <span className="text-2xl">{cat.emoji}</span>
                      <span className="text-xs">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {categorized.includes(txn.id) && (
              <div className="flex items-center justify-center gap-2 text-[#34C759]">
                <span>✓ Categorized!</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
