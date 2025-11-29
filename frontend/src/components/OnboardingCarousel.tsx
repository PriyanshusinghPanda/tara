import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight } from 'lucide-react';

const slides = [
  {
    emoji: "🛵",
    title: "Aapke paise, aapka control",
    subtitle: "Track karo har ek rupaya, automatically",
  },
  {
    emoji: "🎯",
    title: "Savings automatic ho jayega",
    subtitle: "Smart buckets mein paisa khud chala jayega",
  },
  {
    emoji: "🚀",
    title: "Sapne pure karo, tension free",
    subtitle: "EMI, goals aur savings – sab ek jagah",
  },
];

export default function OnboardingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/phone-login');
    }
  };

  const handleSkip = () => {
    navigate('/phone-login');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col max-w-md mx-auto">
      <div className="p-6 flex justify-end">
        <button
          onClick={handleSkip}
          className="text-[#FF6B35] px-4 py-2 text-lg font-semibold active:scale-95 transition-transform"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12 animate-fadeIn">
        <div className="w-64 h-64 rounded-[48px] mx-auto mb-12 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 184, 0, 0.1) 100%)'
          }}
        >
          <span className="text-9xl animate-scaleIn">{slides[currentSlide].emoji}</span>
        </div>

        <h2 className="text-center mb-4 text-[#1A1A1A] text-3xl">
          {slides[currentSlide].title}
        </h2>
        <p className="text-center text-[#1A1A1A]/70 text-lg">
          {slides[currentSlide].subtitle}
        </p>
      </div>

      <div className="px-8 pb-12">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-[#FF6B35]'
                  : 'w-2 bg-[#FF6B35]/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full h-[60px] gradient-primary text-white rounded-[24px] flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform text-lg font-semibold"
        >
          <span>{currentSlide === slides.length - 1 ? 'Shuru karo' : 'Aage badho'}</span>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
