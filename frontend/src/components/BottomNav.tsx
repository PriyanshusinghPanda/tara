import { useNavigate, useLocation } from 'react-router';
import { Home, TrendingUp, Target, User } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: TrendingUp, label: 'Transactions', path: '/daily-cashflow' },
  { icon: Target, label: 'Goals', path: '/goal-detail' },
  { icon: User, label: 'Profile', path: '/ai-coach' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 max-w-md mx-auto z-50 shadow-2xl">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 relative ${
                isActive ? 'text-[#FF6B35]' : 'text-gray-400'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] rounded-b-full"></div>
              )}
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
