import { useState } from "react";
import { useNavigate } from "react-router";
import BigButton from "../shared/BigButton";
import { ArrowLeft, TrendingUp } from "lucide-react";
import BottomNav from "../shared/BottomNav";

export default function RoundOffSavings() {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);

  const examples = [
    { spent: 87, rounded: 100, saved: 13 },
    { spent: 245, rounded: 250, saved: 5 },
    { spent: 1432, rounded: 1500, saved: 68 },
  ];

  const monthlySavings = 450;

  return (
    <div className="h-full w-full bg-background flex flex-col overflow-y-auto pb-20">
      <div className="bg-white px-6 pt-12 pb-6 border-b">
        <button
          onClick={() => navigate("/home")}
          className="mb-4 w-10 h-10 rounded-full bg-gray-light flex items-center justify-center"
        >
          <ArrowLeft className="text-text" />
        </button>
        <h2 className="mb-2">Round-Off Savings</h2>
        <p className="text-gray-medium">Har transaction pe thoda save karo</p>
      </div>

      <div className="p-6">
        <div className={`rounded-[24px] p-6 mb-6 border-2 transition-all ${enabled ? "bg-success/10 border-success" : "bg-white border-gray-200"}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-medium mb-1">Round-Off Savings</p>
              <p className="text-sm text-gray-medium">
                {enabled ? "Enabled" : "Disabled"}
              </p>
            </div>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative w-14 h-8 rounded-full transition-all ${
                enabled ? "bg-success" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  enabled ? "transform translate-x-6" : ""
                }`}
              ></div>
            </button>
          </div>
          {enabled && (
            <div className="bg-white rounded-[16px] p-4">
              <p className="text-sm text-gray-medium mb-1">Estimated Monthly Savings</p>
              <h3 className="text-success">₹{monthlySavings}</h3>
            </div>
          )}
        </div>

        <h3 className="mb-4">Kaise kaam karta hai?</h3>
        <div className="bg-white rounded-[24px] p-5 shadow-card mb-6">
          <p className="text-sm text-gray-medium mb-4">
            Har transaction ko next round figure tak round-off karte hain aur difference save kar lete hain.
          </p>

          <div className="space-y-3">
            {examples.map((example, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="text-sm text-gray-medium">You spent</p>
                  <p className="font-medium">₹{example.spent}</p>
                </div>
                <TrendingUp className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-medium">Rounded to</p>
                  <p className="font-medium">₹{example.rounded}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-medium">Saved</p>
                  <p className="font-medium text-success">₹{example.saved}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow/20 rounded-[20px] p-5 border-2 border-yellow">
          <p className="text-sm">
            💡 <span className="font-medium">Pro Tip:</span> Aap ko pata bhi nahi chalega aur mahine ka ₹{monthlySavings} automatically save ho jayega!
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
