import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function ProfileLoans() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');
  
  const options = [
    { value: 'no', label: 'Nahi, koi loan nahi hai', emoji: '✅' },
    { value: 'small', label: 'Haan, thoda sa (under ₹50k)', emoji: '📱' },
    { value: 'medium', label: 'Haan, moderate (₹50k-2L)', emoji: '🏍️' },
    { value: 'large', label: 'Haan, bada loan hai (₹2L+)', emoji: '🏠' },
  ];
  
  return (
    <div className="h-screen flex flex-col bg-[#FFF8F0]">
      <div className="px-6 pt-8 pb-6 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-[#FF6B35]">
          <ArrowLeft size={28} />
        </button>
        <div className="flex-1 mx-4 bg-[#FFE5D9] rounded-full h-2">
          <div className="bg-[#FF6B35] h-2 rounded-full" style={{ width: '80%' }}></div>
        </div>
        <span className="text-[#8E8E93] text-[16px]">4/5</span>
      </div>
      
      <div className="flex-1 px-6">
        <div className="mb-8">
          <h2 className="text-[#1A1A1A] mb-3">
            Koi loan ya EMI<br />chal rahi hai?
          </h2>
          <p className="text-[#8E8E93] text-[19px]">
            Paiso aapko better plan karne mein help karega
          </p>
        </div>
        
        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelected(option.value)}
              className={`w-full p-5 rounded-[24px] flex items-center gap-4 transition-all ${
                selected === option.value
                  ? 'bg-[#FF6B35] text-white shadow-[0_4px_16px_rgba(255,107,53,0.3)]'
                  : 'bg-white text-[#1A1A1A] shadow-[0_2px_8px_rgba(255,107,53,0.1)]'
              }`}
            >
              <span className="text-[36px]">{option.emoji}</span>
              <span className="text-[20px]">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="px-6 pb-8">
        <Button 
          onClick={() => navigate('/profile-goal')} 
          className="w-full"
          disabled={!selected}
        >
          Aage badhein
        </Button>
      </div>
    </div>
  );
}
