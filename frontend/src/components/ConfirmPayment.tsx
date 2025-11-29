import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, Shield, Info, Loader2 } from 'lucide-react';

export default function ConfirmPayment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const amount = searchParams.get('amount') || '0';
  const recipientName = searchParams.get('name') || 'Recipient';
  const recipientUPI = searchParams.get('upi') || '';
  const note = searchParams.get('note') || '';
  
  const [pin, setPin] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (pin.length === 4) {
      handlePayment();
    }
  }, [pin]);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      navigate(`/payment-success?amount=${amount}&name=${recipientName}`);
    }, 2000);
  };

  const handlePinClick = (num: string) => {
    if (pin.length < 4) {
      setPin(pin + num);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFFDFA] max-w-md mx-auto flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-5 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            disabled={processing}
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Confirm Payment</h2>
            <p className="text-xs text-gray-500">Verify details before paying</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between p-5">
        {/* Payment Details */}
        <div>
          {/* Amount Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-5">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 mb-2">You're paying</p>
              <div className="text-5xl font-bold text-gray-900 mb-4">
                ₹{parseInt(amount).toLocaleString()}
              </div>
              {note && (
                <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <Info size={14} className="text-gray-500" />
                  <p className="text-xs text-gray-600">"{note}"</p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{recipientName}</h4>
                  <p className="text-sm text-gray-500">{recipientUPI}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
            <Shield size={20} className="text-green-600 flex-shrink-0" />
            <p className="text-xs text-green-700">
              Secure payment protected by UPI encryption
            </p>
          </div>

          {/* PIN Entry */}
          {!processing ? (
            <>
              <p className="text-center text-sm font-semibold text-gray-900 mb-4">
                Enter your 4-digit UPI PIN
              </p>
              <div className="flex justify-center gap-3 mb-8">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-14 h-14 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center"
                  >
                    {pin[i] ? (
                      <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                    ) : (
                      <div className="w-3 h-3 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Loader2 size={48} className="text-[#FF6B35] mx-auto mb-4 animate-spin" />
              <p className="font-semibold text-gray-900 mb-2">Processing Payment...</p>
              <p className="text-sm text-gray-500">Please wait</p>
            </div>
          )}
        </div>

        {/* Number Pad */}
        {!processing && (
          <div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'back'].map((num, index) => {
                if (num === null) return <div key={index}></div>;
                if (num === 'back') {
                  return (
                    <button
                      key={index}
                      onClick={handleBackspace}
                      className="h-16 bg-white rounded-2xl shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center"
                    >
                      <span className="text-2xl">⌫</span>
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    onClick={() => handlePinClick(num.toString())}
                    className="h-16 bg-white rounded-2xl text-2xl font-semibold text-gray-900 shadow-sm hover:shadow-md active:scale-95 transition-all"
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
