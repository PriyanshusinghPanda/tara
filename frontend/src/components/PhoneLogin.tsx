import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';

export default function PhoneLogin() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (phone.length === 10) {
      navigate('/otp');
    }
  };

  const handleNumberClick = (num: string) => {
    if (phone.length < 10) {
      setPhone(phone + num);
    }
  };

  const handleBackspace = () => {
    setPhone(phone.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col max-w-md mx-auto p-6">
      <div className="text-center mb-12 mt-12 animate-fadeIn">
        <div className="w-20 h-20 gradient-primary rounded-[24px] mx-auto mb-6 flex items-center justify-center shadow-xl">
          <span className="text-4xl">💰</span>
        </div>
        <h2 className="mb-2 text-3xl">Welcome to Paiso!</h2>
        <p className="text-[#1A1A1A]/70 text-lg">Apna mobile number daalo</p>
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-lg mb-8 animate-slideUp">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#1A1A1A]/70 text-xl">+91</span>
          <div className="flex-1 text-3xl tracking-wider">
            {phone || '_ _ _ _ _ _ _ _ _ _'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="h-[70px] bg-white rounded-[24px] text-2xl active:scale-95 transition-transform shadow-md hover:shadow-lg"
          >
            {num}
          </button>
        ))}
        <div className="col-span-1" />
        <button
          onClick={() => handleNumberClick('0')}
          className="h-[70px] bg-white rounded-[24px] text-2xl active:scale-95 transition-transform shadow-md hover:shadow-lg"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="h-[70px] bg-white rounded-[24px] active:scale-95 transition-transform shadow-md hover:shadow-lg flex items-center justify-center text-2xl"
        >
          ⌫
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={phone.length !== 10}
        className="w-full h-[60px] gradient-primary text-white rounded-[24px] flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
      >
        <span>OTP bhejo</span>
        <ArrowRight size={24} />
      </button>
    </div>
  );
}
