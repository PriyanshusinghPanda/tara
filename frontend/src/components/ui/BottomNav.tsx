import { useNavigate, useLocation } from 'react-router';
import { Home, Send, Target, MessageCircle } from 'lucide-react';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#FFE5D9] pb-safe z-50">
      <div className="mx-auto max-w-[360px]">
        <div className="flex items-center justify-around px-4 py-3">
          <button
            onClick={() => navigate('/home')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-[16px] transition-all ${
              isActive('/home') ? 'text-[#FF6B35] bg-[#FFE5D9]' : 'text-[#8E8E93]'
            }`}
          >
            <Home size={24} />
            <span className="text-[12px]">Home</span>
          </button>
          
          <button
            onClick={() => navigate('/pay')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-[16px] transition-all ${
              isActive('/pay') ? 'text-[#FF6B35] bg-[#FFE5D9]' : 'text-[#8E8E93]'
            }`}
          >
            <Send size={24} />
            <span className="text-[12px]">Pay</span>
          </button>
          
          <button
            onClick={() => navigate('/goals')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-[16px] transition-all ${
              isActive('/goals') ? 'text-[#FF6B35] bg-[#FFE5D9]' : 'text-[#8E8E93]'
            }`}
          >
            <Target size={24} />
            <span className="text-[12px]">Goals</span>
          </button>
          
          <button
            onClick={() => navigate('/coach')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-[16px] transition-all ${
              isActive('/coach') ? 'text-[#FF6B35] bg-[#FFE5D9]' : 'text-[#8E8E93]'
            }`}
          >
            <MessageCircle size={24} />
            <span className="text-[12px]">Coach Me</span>
          </button>
        </div>
      </div>
    </div>
  );
}
