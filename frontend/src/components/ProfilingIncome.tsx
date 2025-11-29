import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';

const incomeRanges = [
  '₹10,000 se kam',
  '₹10,000 - ₹20,000',
  '₹20,000 - ₹35,000',
  '₹35,000 - ₹50,000',
  '₹50,000+',
];

export default function ProfilingIncome() {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selected) {
      localStorage.setItem('income', selected);
      navigate('/profiling/job-type');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col max-w-[360px] mx-auto">
      <div className="p-6">
        <div className="mb-2 h-2 bg-white rounded-full">
          <div className="h-full w-[20%] bg-[#FF6B35] rounded-full transition-all" />
        </div>
        <p className="text-sm text-[#1A1A1A]/60 mb-8">Step 1 of 5</p>

        <div className="mb-12">
          <h2 className="mb-2">Monthly income kitni hai?</h2>
          <p className="text-[#1A1A1A]/70">Salary, tips, delivery – sab milake</p>
        </div>

        <div className="space-y-3 mb-8">
          {incomeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelected(range)}
              className={`w-full h-[70px] rounded-[24px] flex items-center px-6 transition-all ${
                selected === range
                  ? 'bg-[#FF6B35] text-white shadow-xl scale-105'
                  : 'bg-white shadow-md active:scale-95'
              }`}
            >
              <span>{range}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!selected}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Aage badho</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
