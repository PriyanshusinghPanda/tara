import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const emis = [
  { date: 5, name: 'Bike EMI', amount: 3200, status: 'upcoming' },
  { date: 10, name: 'Credit Card', amount: 1500, status: 'upcoming' },
  { date: 15, name: 'Personal Loan', amount: 2800, status: 'upcoming' },
];

export default function EMICalendar() {
  const navigate = useNavigate();
  const totalEMI = emis.reduce((sum, emi) => sum + emi.amount, 0);

  const daysInMonth = 30;
  const today = 28;

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/subscription-waste')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Calendar size={32} className="text-[#FF6B35]" />
          <h2>EMI Calendar</h2>
        </div>
        <p className="text-[#1A1A1A]/70">Sab EMIs ek jagah dekho</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-[24px] p-6 shadow-xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <button className="text-white">
              <ChevronLeft size={24} />
            </button>
            <h3 className="text-white">December 2024</h3>
            <button className="text-white">
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-[20px] p-4 text-center">
            <p className="text-white/90 text-sm mb-1">Total EMI this month</p>
            <h2 className="text-white">₹{totalEMI.toLocaleString()}</h2>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-lg mb-6">
          <div className="grid grid-cols-7 gap-2 mb-3">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} className="text-center text-xs text-[#1A1A1A]/60 font-semibold">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const hasEMI = emis.find(emi => emi.date === day);
              const isToday = day === today;
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-[10px] flex items-center justify-center text-sm relative ${
                    isToday ? 'bg-[#34C759] text-white font-semibold' :
                    hasEMI ? 'bg-red-100 text-red-600 font-semibold' :
                    'bg-gray-50'
                  }`}
                >
                  {day}
                  {hasEMI && !isToday && (
                    <div className="absolute bottom-1 w-1 h-1 bg-red-500 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <h3 className="mb-3">Upcoming EMIs</h3>
        <div className="space-y-3 mb-6">
          {emis.map((emi, i) => {
            const daysLeft = emi.date - today;
            return (
              <div key={i} className="bg-white rounded-[20px] p-4 shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-[14px] flex items-center justify-center">
                    <span className="text-xl">💳</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{emi.name}</h3>
                    <p className="text-sm text-[#1A1A1A]/60">
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Due today!'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600">₹{emi.amount}</div>
                    <span className="text-xs text-[#1A1A1A]/60">{emi.date} Dec</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => navigate('/loan-dashboard')}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg active:scale-95 transition-transform"
        >
          View all loans
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
