import { useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';

const emis = [
  { name: 'Bike EMI', amount: 3200, dueDate: 5, autoBlock: false },
  { name: 'Personal Loan', amount: 2800, dueDate: 15, autoBlock: false },
  { name: 'Credit Card', amount: 1500, dueDate: 10, autoBlock: false },
];

export default function EMIAutoBlock() {
  const navigate = useNavigate();
  const [emiList, setEmiList] = useState(emis);

  const toggleAutoBlock = (index: number) => {
    setEmiList(prev => prev.map((emi, i) =>
      i === index ? { ...emi, autoBlock: !emi.autoBlock } : emi
    ));
  };

  const allEnabled = emiList.every(emi => emi.autoBlock);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/debt-planner')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Shield size={32} className="text-[#34C759]" />
          <h2>EMI Auto-Block</h2>
        </div>
        <p className="text-[#1A1A1A]/70">EMI dates se pehle amount reserve kar do</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-[#34C759] to-[#00C853] rounded-[24px] p-6 shadow-xl mb-6 text-white">
          <h3 className="text-white mb-4">Kaise kaam karta hai?</h3>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <span>1️⃣</span>
              <p className="text-white/90">EMI date se 2 din pehle amount block ho jayega</p>
            </div>
            <div className="flex gap-3">
              <span>2️⃣</span>
              <p className="text-white/90">Blocked amount pe spend nahi kar paoge</p>
            </div>
            <div className="flex gap-3">
              <span>3️⃣</span>
              <p className="text-white/90">EMI date pe automatic payment ho jayega</p>
            </div>
            <div className="flex gap-3">
              <span>4️⃣</span>
              <p className="text-white/90">Kabhi EMI miss nahi hogi = Credit score safe!</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {emiList.map((emi, i) => (
            <div key={i} className="bg-white rounded-[20px] p-5 shadow-md">
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${
                  emi.autoBlock ? 'bg-[#34C759]/20' : 'bg-gray-100'
                }`}>
                  {emi.autoBlock ? (
                    <CheckCircle size={24} className="text-[#34C759]" />
                  ) : (
                    <span className="text-xl">💳</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{emi.name}</h3>
                  <p className="text-sm text-[#1A1A1A]/60">Due on {emi.dueDate}th • ₹{emi.amount}</p>
                </div>
                <button
                  onClick={() => toggleAutoBlock(i)}
                  className={`w-14 h-8 rounded-full transition-all ${
                    emi.autoBlock ? 'bg-[#34C759]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-all ${
                    emi.autoBlock ? 'ml-7' : 'ml-1'
                  }`} />
                </button>
              </div>
              {emi.autoBlock && (
                <div className="bg-[#34C759]/10 rounded-[12px] p-3 animate-in fade-in">
                  <p className="text-sm text-[#34C759]">
                    ✓ Amount will be blocked on {emi.dueDate - 2}th Dec
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {allEnabled && (
          <div className="bg-gradient-to-br from-[#34C759] to-[#00C853] rounded-[24px] p-5 shadow-xl mb-6 text-white animate-in zoom-in">
            <div className="text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-white mb-2">Sab set!</h3>
              <p className="text-white/90 text-sm">
                Ab tumhari sab EMIs time pe pay ho jayengi. Tension mat lo!
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate('/create-goal')}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg active:scale-95 transition-transform"
        >
          Create Savings Goal
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
