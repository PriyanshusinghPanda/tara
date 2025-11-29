import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';

const goals = [
  { emoji: '💰', label: 'Zyada save karna hai' },
  { emoji: '🏦', label: 'Debt clear karna hai' },
  { emoji: '🛵', label: 'Badi cheez leni hai' },
  { emoji: '📚', label: 'Finance seekhna hai' },
];

export default function ProfilingGoal() {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selected) {
      localStorage.setItem('goal', selected);
      // Auto-classify user
      const income = localStorage.getItem('income');
      const loans = localStorage.getItem('loans');
      let userClass = 'Beginner Saver';
      
      if (income === '₹10,000 se kam') {
        userClass = 'Struggling';
      } else if (loans && loans.includes('3+')) {
        userClass = 'Debt-Heavy';
      } else if (income === '₹50,000+') {
        userClass = 'Growing Earner';
      }
      
      localStorage.setItem('userClass', userClass);
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col max-w-[360px] mx-auto">
      <div className="p-6">
        <div className="mb-2 h-2 bg-white rounded-full">
          <div className="h-full w-[100%] bg-[#FF6B35] rounded-full transition-all" />
        </div>
        <p className="text-sm text-[#1A1A1A]/60 mb-8">Step 5 of 5</p>

        <div className="mb-12">
          <h2 className="mb-2">Sabse bada goal kya hai?</h2>
          <p className="text-[#1A1A1A]/70">Hum aapki madad karenge achieve karne mein</p>
        </div>

        <div className="space-y-3 mb-8">
          {goals.map((goal) => (
            <button
              key={goal.label}
              onClick={() => setSelected(goal.label)}
              className={`w-full h-[80px] rounded-[24px] flex items-center gap-4 px-6 transition-all ${
                selected === goal.label
                  ? 'bg-[#FF6B35] text-white shadow-xl scale-105'
                  : 'bg-white shadow-md active:scale-95'
              }`}
            >
              <span className="text-3xl">{goal.emoji}</span>
              <span>{goal.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!selected}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Profile complete karo! 🎉</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
