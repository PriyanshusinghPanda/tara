import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const transactions = [
  { id: 1, type: 'income', title: 'Salary credit', amount: 12000, time: '9:30 AM', category: 'Salary' },
  { id: 2, type: 'expense', title: 'Grocery - DMart', amount: 450, time: '11:15 AM', category: 'Food' },
  { id: 3, type: 'expense', title: 'Petrol pump', amount: 300, time: '2:45 PM', category: 'Fuel' },
  { id: 4, type: 'income', title: 'Delivery tips', amount: 150, time: '5:20 PM', category: 'Income' },
  { id: 5, type: 'expense', title: 'Chai & snacks', amount: 80, time: '6:00 PM', category: 'Food' },
];

export default function DailyCashflow() {
  const navigate = useNavigate();

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#FFB800] px-6 pt-8 pb-8 rounded-b-[32px]">
        <button onClick={() => navigate('/home')} className="mb-6">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h2 className="text-white mb-6">Aaj ka cashflow</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-md rounded-[20px] p-4 border border-white/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-[#34C759]" />
              <p className="text-white/90 text-sm">Income</p>
            </div>
            <h3 className="text-white">₹{totalIncome.toLocaleString()}</h3>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-[20px] p-4 border border-white/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={20} className="text-red-400" />
              <p className="text-white/90 text-sm">Expense</p>
            </div>
            <h3 className="text-white">₹{totalExpense.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3>Today's transactions</h3>
          <button
            onClick={() => navigate('/unknown-transactions')}
            className="text-[#FF6B35] text-sm"
          >
            Categorize →
          </button>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white rounded-[20px] p-4 shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-[#34C759]/10' : 'bg-[#FF6B35]/10'
                }`}>
                  <span className="text-xl">
                    {transaction.category === 'Salary' && '💰'}
                    {transaction.category === 'Food' && '🍽️'}
                    {transaction.category === 'Fuel' && '⛽'}
                    {transaction.category === 'Income' && '💵'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{transaction.title}</h3>
                  <p className="text-sm text-[#1A1A1A]/60">{transaction.time}</p>
                </div>
                <div className={`${transaction.type === 'income' ? 'text-[#34C759]' : 'text-[#FF6B35]'}`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/spending-breakdown')}
          className="w-full mt-6 h-[60px] bg-white rounded-[24px] shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span>View full breakdown</span>
          <ArrowRight size={20} className="text-[#FF6B35]" />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
