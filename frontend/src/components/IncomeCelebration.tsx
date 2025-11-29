import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles } from 'lucide-react';

export default function IncomeCelebration() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auto-bucketing');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#34C759] to-[#00C853] flex flex-col items-center justify-center p-6 max-w-[360px] mx-auto">
      <div className="text-center animate-in zoom-in duration-500">
        <div className="mb-8">
          <Sparkles size={80} className="text-white mx-auto mb-4 animate-pulse" />
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
        </div>
        
        <h1 className="text-white mb-4">Salary aaya!</h1>
        <div className="bg-white/20 backdrop-blur-md rounded-[32px] px-8 py-6 border-2 border-white/40 mb-6">
          <h1 className="text-white text-5xl">₹12,000</h1>
        </div>
        
        <p className="text-white text-xl mb-2">Badhaai ho, Ravi bhai! 🎊</p>
        <p className="text-white/90">Ab smart bucketing shuru karte hain...</p>
      </div>
    </div>
  );
}
