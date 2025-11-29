import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check } from 'lucide-react';

export default function EnterMobile() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');

  const handleNumberClick = (num: string) => {
    if (mobile.length < 10) {
      setMobile(mobile + num);
    }
  };

  const handleBackspace = () => {
    setMobile(mobile.slice(0, -1));
  };

  const handleProceed = () => {
    if (mobile.length === 10) {
      navigate(`/send-amount?upi=${mobile}@paiso&name=Mobile User`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFFDVA] max-w-md mx-auto flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-5 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Enter Mobile Number</h2>
            <p className="text-xs text-gray-500">Send money to mobile number</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between p-5">
        {/* Mobile Input Display */}
        <div className="pt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <p className="text-sm text-gray-500 mb-3 text-center">Mobile Number</p>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl font-semibold text-gray-900">+91</span>
              <span className="text-3xl font-bold text-gray-900 tracking-wider">
                {mobile || '_ _ _ _ _ _ _ _ _ _'}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-xs text-blue-900 text-center leading-relaxed">
              💡 Money will be sent to UPI linked with this mobile number
            </p>
          </div>
        </div>

        {/* Number Pad */}
        <div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="h-16 bg-white rounded-2xl text-2xl font-semibold text-gray-900 shadow-sm hover:shadow-md active:scale-95 transition-all"
              >
                {num}
              </button>
            ))}
            <div></div>
            <button
              onClick={() => handleNumberClick('0')}
              className="h-16 bg-white rounded-2xl text-2xl font-semibold text-gray-900 shadow-sm hover:shadow-md active:scale-95 transition-all"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              className="h-16 bg-white rounded-2xl shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center text-2xl"
            >
              ⌫
            </button>
          </div>

          <button
            onClick={handleProceed}
            disabled={mobile.length !== 10}
            className="w-full h-14 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>Continue</span>
            <Check size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
