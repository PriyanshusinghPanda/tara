import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding-1");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full w-full bg-primary flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-32 right-5 w-24 h-24 rounded-full bg-white"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white"></div>
      </div>

      <div className="relative z-10 text-center">
        <div className="mb-6">
          <div className="w-28 h-28 bg-yellow rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <span className="text-6xl">₹</span>
          </div>
        </div>
        <h1 className="text-white mb-3">Paiso</h1>
        <p className="text-white text-xl opacity-90">Paise ka sachcha dost</p>
      </div>

      <div className="absolute bottom-12 flex gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
}
