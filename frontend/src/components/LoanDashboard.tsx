import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, TrendingDown } from 'lucide-react';

const loans = [
  {
    name: 'Bike Loan',
    bank: 'Bajaj Finance',
    emoji: '🏍️',
    emi: 3200,
    outstanding: 45000,
    total: 80000,
    rate: 12.5,
    tenure: '15 months left',
  },
  {
    name: 'Personal Loan',
    bank: 'HDFC Bank',
    emoji: '💰',
    emi: 2800,
    outstanding: 35000,
    total: 50000,
    rate: 14.0,
    tenure: '13 months left',
  },
  {
    name: 'Credit Card',
    bank: 'ICICI Bank',
    emoji: '💳',
    emi: 1500,
    outstanding: 18000,
    total: 25000,
    rate: 18.0,
    tenure: 'Revolving',
  },
];

export default function LoanDashboard() {
  const navigate = useNavigate();
  
  const totalEMI = loans.reduce((sum, loan) => sum + loan.emi, 0);
  const totalOutstanding = loans.reduce((sum, loan) => sum + loan.outstanding, 0);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/emi-calendar')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <h2 className="mb-2">Loan Dashboard</h2>
        <p className="text-[#1A1A1A]/70">Saare loans ka overview</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-[24px] p-6 shadow-xl mb-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <TrendingDown size={48} />
            <div>
              <p className="text-white/90 text-sm">Total outstanding debt</p>
              <h2 className="text-white">₹{totalOutstanding.toLocaleString()}</h2>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-[20px] p-4 flex justify-between">
            <div>
              <p className="text-white/90 text-sm">Monthly EMI</p>
              <h3 className="text-white">₹{totalEMI.toLocaleString()}</h3>
            </div>
            <div className="text-right">
              <p className="text-white/90 text-sm">Active loans</p>
              <h3 className="text-white">{loans.length}</h3>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {loans.map((loan, i) => {
            const progress = ((loan.total - loan.outstanding) / loan.total) * 100;
            return (
              <div key={i} className="bg-white rounded-[24px] p-5 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-red-100 rounded-[16px] flex items-center justify-center">
                    <span className="text-2xl">{loan.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{loan.name}</h3>
                    <p className="text-sm text-[#1A1A1A]/60">{loan.bank}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600">₹{loan.emi}/mo</div>
                    <span className="text-xs text-[#1A1A1A]/60">{loan.rate}% p.a.</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#1A1A1A]/60">Outstanding</span>
                    <span className="font-semibold">₹{loan.outstanding.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-red-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#34C759] rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-[#1A1A1A]/60">
                    <span>{progress.toFixed(0)}% paid</span>
                    <span>{loan.tenure}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => navigate('/debt-planner')}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg active:scale-95 transition-transform"
        >
          Smart Debt Planner
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
