import { useNavigate } from 'react-router';
import { ArrowLeft, Download, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function MyQR() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const upiId = 'ravikumar@paiso';
  const userName = 'Ravi Kumar';

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-white max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-5 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">My QR Code</h2>
            <p className="text-xs text-gray-500">Share to receive money</p>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col items-center">
        {/* QR Card */}
        <div className="w-full bg-white rounded-3xl p-8 shadow-xl mb-6 mt-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👤</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{userName}</h3>
            <p className="text-sm text-gray-500">{upiId}</p>
          </div>

          {/* QR Code */}
          <div className="bg-white p-6 rounded-2xl border-4 border-gray-100 mb-6">
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
              {/* Simplified QR Code Pattern */}
              <div className="grid grid-cols-8 gap-1 p-4">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${
                      Math.random() > 0.5 ? 'bg-gray-900' : 'bg-white'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* UPI ID */}
          <div className="bg-gradient-to-r from-[#FF6B35]/10 to-[#FFB800]/10 border-2 border-[#FF6B35]/20 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">UPI ID</p>
                <p className="font-mono font-semibold text-gray-900">{upiId}</p>
              </div>
              <button
                onClick={handleCopy}
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
              >
                {copied ? (
                  <Check size={18} className="text-green-600" />
                ) : (
                  <Copy size={18} className="text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <button className="w-full h-14 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Share2 size={20} />
            <span>Share QR Code</span>
          </button>

          <button className="w-full h-14 bg-white border-2 border-gray-200 rounded-2xl font-semibold text-gray-900 hover:border-gray-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Download size={20} />
            <span>Download QR</span>
          </button>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-xs text-blue-900 text-center leading-relaxed">
            💡 Anyone can scan this QR code to send you money instantly via UPI
          </p>
        </div>
      </div>
    </div>
  );
}
