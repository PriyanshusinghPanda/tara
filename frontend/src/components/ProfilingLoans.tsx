import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';

const loanOptions = [
  'Nahi, koi loan nahi hai',
  'Haan, 1 loan hai',
  'Haan, 2-3 loans hain',
  'Haan, 3+ loans hain',
];

export default function ProfilingLoans() {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selected) {
      localStorage.setItem('loans', selected);
      navigate('/profiling/goal');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col max-w-[360px] mx-auto">
      <div className="p-6">
        <div className="mb-2 h-2 bg-white rounded-full">
          <div className="h-full w-[80%] bg-[#FF6B35] rounded-full transition-all" />
        </div>
        <p className="text-sm text-[#1A1A1A]/60 mb-8">Step 4 of 5</p>

        <div className="mb-12">
          <h2 className="mb-2">Koi loan ya EMI chal rahi hai?</h2>
          <p className="text-[#1A1A1A]/70">Personal loan, bike loan, credit card – kuch bhi</p>
        </div>

        <div className="space-y-3 mb-8">
          {loanOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`w-full h-[70px] rounded-[24px] flex items-center px-6 transition-all ${
                selected === option
                  ? 'bg-[#FF6B35] text-white shadow-xl scale-105'
                  : 'bg-white shadow-md active:scale-95'
              }`}
            >
              <span>{option}</span>
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
