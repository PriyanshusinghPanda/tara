import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';

const jobTypes = [
  { emoji: '🛵', label: 'Delivery / Rider' },
  { emoji: '🚗', label: 'Driver / Auto' },
  { emoji: '🧹', label: 'Maid / Helper' },
  { emoji: '🏪', label: 'Shop / Business' },
  { emoji: '💼', label: 'Freelancer' },
  { emoji: '🏢', label: 'Salaried Job' },
];

export default function ProfilingJobType() {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selected) {
      localStorage.setItem('jobType', selected);
      navigate('/profiling/age');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col max-w-[360px] mx-auto">
      <div className="p-6">
        <div className="mb-2 h-2 bg-white rounded-full">
          <div className="h-full w-[40%] bg-[#FF6B35] rounded-full transition-all" />
        </div>
        <p className="text-sm text-[#1A1A1A]/60 mb-8">Step 2 of 5</p>

        <div className="mb-12">
          <h2 className="mb-2">Aap kya kaam karte ho?</h2>
          <p className="text-[#1A1A1A]/70">Isse hum aapke liye best tips de payenge</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {jobTypes.map((job) => (
            <button
              key={job.label}
              onClick={() => setSelected(job.label)}
              className={`h-[120px] rounded-[24px] flex flex-col items-center justify-center gap-3 transition-all ${
                selected === job.label
                  ? 'bg-[#FF6B35] text-white shadow-xl scale-105'
                  : 'bg-white shadow-md active:scale-95'
              }`}
            >
              <span className="text-4xl">{job.emoji}</span>
              <span className="text-sm">{job.label}</span>
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
