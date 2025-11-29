import { useNavigate } from 'react-router';
import { MessageCircle } from 'lucide-react';

export function FloatingCoach() {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate('/ai-coach')}
      className="fixed bottom-24 right-6 w-16 h-16 bg-[#FF6B35] text-white rounded-full shadow-[0_8px_24px_rgba(255,107,53,0.4)] flex items-center justify-center z-40 active:scale-95 transition-transform"
    >
      <MessageCircle size={28} fill="white" />
    </button>
  );
}
