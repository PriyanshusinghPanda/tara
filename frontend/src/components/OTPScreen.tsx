import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle } from 'lucide-react';

export default function OTPScreen() {
  const [otp] = useState(['3', '9', '4', '8', '2', '1']);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVerified(true);
      setTimeout(() => {
        navigate('/permissions');
      }, 1500);
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col max-w-md mx-auto p-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="mb-2 text-3xl">OTP Verify karo</h2>
          <p className="text-[#1A1A1A]/70 text-lg">+91 98765 43210 par bheja gaya</p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <div
              key={index}
              className={`w-14 h-16 rounded-[16px] flex items-center justify-center text-2xl transition-all duration-300 ${
                verified
                  ? 'bg-[#34C759]/20 text-[#34C759] scale-110'
                  : 'bg-white shadow-lg text-[#1A1A1A]'
              }`}
            >
              {digit}
            </div>
          ))}
        </div>

        {verified && (
          <div className="flex flex-col items-center animate-scaleIn">
            <CheckCircle size={64} className="text-[#34C759] mb-4" />
            <p className="text-[#34C759] text-xl font-semibold">Verified! ✓</p>
          </div>
        )}

        {!verified && (
          <div className="text-center">
            <button className="text-[#FF6B35] text-lg font-semibold">
              Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
