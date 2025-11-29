import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MessageSquare, Bell, Users, CheckCircle } from 'lucide-react';

const permissions = [
  {
    icon: MessageSquare,
    title: 'SMS Access',
    subtitle: 'Transactions auto-track karenge',
    granted: false,
  },
  {
    icon: Bell,
    title: 'Notifications',
    subtitle: 'Important alerts milenge',
    granted: false,
  },
  {
    icon: Users,
    title: 'Contacts (Optional)',
    subtitle: 'Dost ko split bill bhejne ke liye',
    granted: false,
  },
];

export default function Permissions() {
  const [permList, setPermList] = useState(permissions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentIndex < permissions.length) {
      const timer = setTimeout(() => {
        setPermList(prev =>
          prev.map((p, i) =>
            i === currentIndex ? { ...p, granted: true } : p
          )
        );
        setCurrentIndex(currentIndex + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        navigate('/profiling/income');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, navigate]);

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col max-w-md mx-auto p-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="mb-2 text-3xl">Thoda access chahiye</h2>
          <p className="text-[#1A1A1A]/70 text-lg">Smart features ke liye auto-granting...</p>
        </div>

        <div className="space-y-4">
          {permList.map((perm, index) => {
            const Icon = perm.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-[24px] p-6 shadow-lg transition-all duration-300 ${
                  perm.granted ? 'border-2 border-[#34C759] scale-[1.02]' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center transition-colors ${
                    perm.granted ? 'bg-[#34C759]/20' : 'bg-[#FF6B35]/10'
                  }`}>
                    <Icon size={28} className={perm.granted ? 'text-[#34C759]' : 'text-[#FF6B35]'} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 text-xl">{perm.title}</h3>
                    <p className="text-sm text-[#1A1A1A]/60">{perm.subtitle}</p>
                  </div>
                  {perm.granted && (
                    <CheckCircle size={28} className="text-[#34C759] animate-scaleIn" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {currentIndex >= permissions.length && (
          <div className="text-center mt-8 animate-fadeIn">
            <p className="text-[#34C759] text-xl font-semibold">Sab set! Aage chalte hain 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}
