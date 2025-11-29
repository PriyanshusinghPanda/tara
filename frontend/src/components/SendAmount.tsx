import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, Check } from 'lucide-react';

export default function SendAmount() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const recipientName = searchParams.get('name') || 'Recipient';
  const recipientUPI = searchParams.get('upi') || '';
  
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleNumberClick = (num: string) => {
    if (amount.length < 6) {
      setAmount(amount + num);
    }
  };

  const handleBackspace = () => {
    setAmount(amount.slice(0, -1));
  };

  const handleProceed = () => {
    if (amount && parseInt(amount) > 0) {
      navigate(`/confirm-payment?amount=${amount}&name=${recipientName}&upi=${recipientUPI}&note=${note}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFFDFA] max-w-md mx-auto flex flex-col">
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
            <h2 className="text-xl font-bold text-gray-900">Pay {recipientName}</h2>
            <p className="text-xs text-gray-500">{recipientUPI}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between p-5">
        {/* Amount Display */}
        <div className="pt-12">
          <p className="text-center text-sm text-gray-500 mb-2">Enter amount</p>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2">
              <span className="text-5xl font-bold text-gray-900">₹</span>
              <span className="text-5xl font-bold text-gray-900">
                {amount || '0'}
              </span>
            </div>
          </div>

          {/* Note Input */}
          <div className="max-w-sm mx-auto mb-8">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note (optional)"
              className="w-full h-12 px-4 bg-white border-2 border-gray-100 rounded-2xl text-sm focus:border-[#FF6B35] focus:outline-none transition-colors text-center"
            />
          </div>

          {/* Quick Amounts */}
          <div className="flex gap-2 justify-center mb-8">
            {['100', '500', '1000', '2000'].map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount)}
                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:border-[#FF6B35] hover:text-[#FF6B35] active:scale-95 transition-all"
              >
                ₹{quickAmount}
              </button>
            ))}
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
            <button
              onClick={() => handleNumberClick('00')}
              className="h-16 bg-white rounded-2xl text-2xl font-semibold text-gray-900 shadow-sm hover:shadow-md active:scale-95 transition-all"
            >
              00
            </button>
            <button
              onClick={() => handleNumberClick('0')}
              className="h-16 bg-white rounded-2xl text-2xl font-semibold text-gray-900 shadow-sm hover:shadow-md active:scale-95 transition-all"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              className="h-16 bg-white rounded-2xl text-2xl shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center"
            >
              ⌫
            </button>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            disabled={!amount || parseInt(amount) === 0}
            className="w-full h-14 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>Proceed to Pay</span>
            <Check size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
