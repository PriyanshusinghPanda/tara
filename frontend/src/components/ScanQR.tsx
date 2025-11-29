import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Camera, Upload, Zap } from 'lucide-react';

export default function ScanQR() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    // Simulate QR scan
    setTimeout(() => {
      navigate('/send-amount?upi=merchant@paiso&name=Local Store');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 max-w-md mx-auto flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 bg-opacity-90">
        <div className="px-5 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-white">Scan QR Code</h2>
            <p className="text-xs text-gray-400">Point camera at QR code</p>
          </div>
        </div>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-5">
        <div className="relative w-72 h-72 mb-8">
          {/* Scanning Frame */}
          <div className="absolute inset-0 border-4 border-white/30 rounded-3xl">
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#FF6B35] rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#FF6B35] rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#FF6B35] rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#FF6B35] rounded-br-3xl"></div>
          </div>

          {/* Scanning Line Animation */}
          {scanning && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent animate-bounce"></div>
          )}

          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Camera size={40} className="text-white" />
            </div>
          </div>
        </div>

        <p className="text-white text-center mb-8">
          {scanning ? 'Scanning...' : 'Position QR code within the frame'}
        </p>

        {!scanning && (
          <button
            onClick={handleScan}
            className="w-full max-w-xs h-14 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Zap size={20} />
            <span>Start Scanning</span>
          </button>
        )}
      </div>

      {/* Upload Option */}
      <div className="p-5 bg-gray-900 bg-opacity-90">
        <button className="w-full h-14 bg-white/10 border-2 border-white/20 text-white rounded-2xl font-semibold hover:bg-white/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <Upload size={20} />
          <span>Upload QR from Gallery</span>
        </button>
      </div>
    </div>
  );
}
