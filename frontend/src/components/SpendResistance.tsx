import { useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, Shield, ArrowRight } from 'lucide-react';

const resistanceOptions = [
  { emoji: '🍕', label: 'Food Delivery Apps', description: 'Swiggy, Zomato block karein', enabled: false },
  { emoji: '🛍️', label: 'Shopping Apps', description: 'Impulse shopping rokein', enabled: false },
  { emoji: '🎮', label: 'Gaming & In-app', description: 'Game purchases block', enabled: false },
  { emoji: '🎬', label: 'OTT Subscriptions', description: 'Multiple OTT warning', enabled: false },
];

export default function SpendResistance() {
  const navigate = useNavigate();
  const [options, setOptions] = useState(resistanceOptions);

  const toggleOption = (index: number) => {
    setOptions(prev => prev.map((opt, i) => 
      i === index ? { ...opt, enabled: !opt.enabled } : opt
    ));
  };

  const handleContinue = () => {
    navigate('/round-off-savings');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/auto-bucketing')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Shield size={32} className="text-[#FF6B35]" />
          <h2>Spend Resistance</h2>
        </div>
        <p className="text-[#1A1A1A]/70">Impulse spending se bachne ka smart tarika</p>
      </div>

      <div className="px-6">
        <div className="bg-gradient-to-br from-[#FFB800]/20 to-[#FF6B35]/20 rounded-[24px] p-5 border-2 border-[#FFB800]/30 mb-6">
          <p className="text-sm">
            <span className="font-semibold">💡 Kaise kaam karta hai:</span> Jab aap in apps par paise kharch karoge, hum ek confirmation maangenge. Bas 5 second sochne ka time milega. Isse impulse buying rukti hai!
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {options.map((option, index) => (
            <div key={index} className="bg-white rounded-[24px] p-5 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#FF6B35]/10 rounded-[16px] flex items-center justify-center">
                  <span className="text-2xl">{option.emoji}</span>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{option.label}</h3>
                  <p className="text-sm text-[#1A1A1A]/60">{option.description}</p>
                </div>
                <button
                  onClick={() => toggleOption(index)}
                  className={`w-14 h-8 rounded-full transition-all ${
                    option.enabled ? 'bg-[#34C759]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-all ${
                    option.enabled ? 'ml-7' : 'ml-1'
                  }`} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span>Continue to savings setup</span>
          <ArrowRight size={24} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
