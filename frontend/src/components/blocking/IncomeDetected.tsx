import { useEffect } from "react";
import { useNavigate } from "react-router";
import BigButton from "../shared/BigButton";
import { Party } from "lucide-react";

export default function IncomeDetected() {
  const navigate = useNavigate();

  useEffect(() => {
    // Confetti animation placeholder
  }, []);

  return (
    <div className="h-full w-full bg-gradient-to-br from-success to-[#2DB350] flex flex-col items-center justify-center p-6 text-white">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8 text-8xl animate-bounce">🎉</div>
        <h1 className="mb-3 text-center">Salary Aa Gayi!</h1>
        <div className="bg-white/20 backdrop-blur-sm rounded-[24px] p-6 border border-white/30 mb-6">
          <p className="text-sm opacity-90 mb-1 text-center">Credited Amount</p>
          <h1 className="text-center">₹12,000</h1>
        </div>
        <p className="text-center text-lg opacity-90 max-w-xs">
          Badhai ho Ravi bhai! Ab isko smartly use karte hain
        </p>
      </div>

      <div className="w-full">
        <BigButton
          onClick={() => navigate("/auto-bucketing")}
          variant="secondary"
          fullWidth
        >
          Paisa Manage Karo
        </BigButton>
      </div>
    </div>
  );
}
