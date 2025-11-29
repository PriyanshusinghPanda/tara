import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, ArrowRight } from 'lucide-react';

const buckets = [
  { emoji: '🏠', name: 'Essentials', amount: 5000, percent: 42, color: 'bg-[#34C759]', desc: 'Rent, food, bills' },
  { emoji: '📱', name: 'Bills & EMIs', amount: 3000, percent: 25, color: 'bg-[#FFB800]', desc: 'Phone, Netflix, loans' },
  { emoji: '💰', name: 'Savings', amount: 2000, percent: 17, color: 'bg-[#FF6B35]', desc: 'Emergency + goals' },
  { emoji: '🎬', name: 'Lifestyle', amount: 2000, percent: 16, color: 'bg-purple-500', desc: 'Fun, shopping, eat out' },
];

export default function AutoBucketing() {
  const navigate = useNavigate();
  const [allocated, setAllocated] = useState<string[]>([]);

  useEffect(() => {
    buckets.forEach((bucket, index) => {
      setTimeout(() => {
        setAllocated(prev => [...prev, bucket.name]);
      }, (index + 1) * 600);
    });

    setTimeout(() => {
      navigate('/spend-resistance');
    }, 4000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col max-w-[360px] mx-auto p-6">
      <div className="flex-1">
        <div className="text-center mb-8 mt-8">
          <h2 className="mb-2">Auto-bucketing ho rahi hai</h2>
          <p className="text-[#1A1A1A]/70">₹12,000 ko smart categories mein divide kar rahe hain</p>
        </div>

        <div className="space-y-4">
          {buckets.map((bucket) => {
            const isAllocated = allocated.includes(bucket.name);
            return (
              <div
                key={bucket.name}
                className={`bg-white rounded-[24px] p-5 shadow-lg transition-all duration-500 ${
                  isAllocated ? 'scale-100 opacity-100' : 'scale-95 opacity-50'
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-14 h-14 ${bucket.color} rounded-[16px] flex items-center justify-center`}>
                    <span className="text-2xl">{bucket.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{bucket.name}</h3>
                    <p className="text-sm text-[#1A1A1A]/60">{bucket.desc}</p>
                  </div>
                  {isAllocated ? (
                    <CheckCircle size={28} className="text-[#34C759]" />
                  ) : (
                    <div className="w-6 h-6 border-3 border-[#1A1A1A]/20 border-t-[#FF6B35] rounded-full animate-spin" />
                  )}
                </div>
                {isAllocated && (
                  <div className="flex justify-between items-center">
                    <div className="flex-1 h-3 bg-gray-100 rounded-full mr-4">
                      <div
                        className={`h-full ${bucket.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${bucket.percent}%` }}
                      />
                    </div>
                    <div>
                      <span className="text-xl">₹{bucket.amount.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allocated.length === buckets.length && (
          <div className="mt-8 text-center animate-in fade-in">
            <div className="bg-gradient-to-br from-[#34C759] to-[#00C853] rounded-[24px] p-6 shadow-xl">
              <h3 className="text-white mb-2">Bucketing complete! 🎉</h3>
              <p className="text-white/90">Spend resistance setup kar rahe hain...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
