import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center p-6">
      <div className="text-center animate-scaleIn">
        <div className="w-32 h-32 bg-white rounded-[32px] mx-auto flex items-center justify-center shadow-2xl mb-6">
          <span className="text-6xl">💰</span>
        </div>
        <h1 className="text-white text-5xl mb-3">Paiso</h1>
        <p className="text-white text-xl opacity-90">Paise ka sachcha dost</p>
      </div>
    </div>
  );
}
