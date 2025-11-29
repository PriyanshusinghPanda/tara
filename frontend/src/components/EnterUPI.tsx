import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check } from 'lucide-react';

export default function EnterUPI() {
  const navigate = useNavigate();
  const [upiId, setUpiId] = useState('');
  const [name, setName] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleProceed = () => {
    if (upiId.includes('@')) {
      navigate(`/send-amount?upi=${upiId}&name=${name || 'User'}`);
    }
  };

  const handleValidate = () => {
    if (upiId.includes('@')) {
      setIsValidating(true);
      // Simulate validation
      setTimeout(() => {
        setName('Verified User');
        setIsValidating(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFFDFA] max-w-md mx-auto">
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
            <h2 className="text-xl font-bold text-gray-900">Enter UPI ID</h2>
            <p className="text-xs text-gray-500">Send money to any UPI ID</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
          <p className="text-xs text-blue-900 leading-relaxed">
            💡 UPI ID format: name@bank (e.g., ramesh@paytm, user@phonepe)
          </p>
        </div>

        {/* UPI ID Input */}
        <div className="bg-white rounded-2xl p-5 shadow-lg mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-3 block">
            UPI ID
          </label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value.toLowerCase())}
            placeholder="username@bank"
            className="w-full h-14 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-base focus:border-[#FF6B35] focus:outline-none transition-colors"
          />
          
          {upiId.includes('@') && !name && (
            <button
              onClick={handleValidate}
              disabled={isValidating}
              className="mt-3 w-full h-12 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isValidating ? 'Validating...' : 'Verify UPI ID'}
            </button>
          )}

          {name && (
            <div className="mt-3 flex items-center gap-2 text-green-600">
              <Check size={18} />
              <span className="text-sm font-semibold">{name}</span>
            </div>
          )}
        </div>

        {/* Common UPI handles */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">Common UPI handles</p>
          <div className="flex flex-wrap gap-2">
            {['@paytm', '@phonepe', '@googlepay', '@ybl', '@okaxis', '@oksbi'].map((handle) => (
              <button
                key={handle}
                onClick={() => setUpiId(upiId.split('@')[0] + handle)}
                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:border-[#FF6B35] hover:text-[#FF6B35] active:scale-95 transition-all"
              >
                {handle}
              </button>
            ))}
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          disabled={!upiId.includes('@')}
          className="w-full h-14 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>Continue</span>
          <Check size={20} />
        </button>
      </div>
    </div>
  );
}
