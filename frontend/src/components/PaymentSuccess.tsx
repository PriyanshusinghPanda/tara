import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { CheckCircle2, Download, Share2, Home } from 'lucide-react';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const amount = searchParams.get('amount') || '0';
  const recipientName = searchParams.get('name') || 'Recipient';

  const transactionId = 'TXN' + Date.now().toString().slice(-10);
  const timestamp = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white max-w-md mx-auto flex flex-col items-center justify-center p-5">
      {/* Success Animation */}
      <div className="mb-8 animate-scaleIn">
        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl mb-6 mx-auto">
          <CheckCircle2 size={56} className="text-white" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 text-center">
          Money sent to {recipientName}
        </p>
      </div>

      {/* Amount Card */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-lg mb-6">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 mb-2">Amount Paid</p>
          <div className="text-5xl font-bold text-green-600 mb-1">
            ₹{parseInt(amount).toLocaleString()}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">To</span>
            <span className="font-semibold text-gray-900">{recipientName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Transaction ID</span>
            <span className="font-mono text-xs text-gray-900">{transactionId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Date & Time</span>
            <span className="text-gray-900">{timestamp}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-600 font-semibold">Success</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3">
        <button className="w-full h-14 bg-white border-2 border-gray-200 rounded-2xl font-semibold text-gray-900 hover:border-gray-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <Download size={20} />
          <span>Download Receipt</span>
        </button>

        <button className="w-full h-14 bg-white border-2 border-gray-200 rounded-2xl font-semibold text-gray-900 hover:border-gray-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <Share2 size={20} />
          <span>Share Receipt</span>
        </button>

        <button
          onClick={() => navigate('/home')}
          className="w-full h-14 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Home size={20} />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
}
