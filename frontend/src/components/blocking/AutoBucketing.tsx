import { useNavigate } from "react-router";
import BigButton from "../shared/BigButton";
import { ArrowLeft, ShoppingBag, Zap, PiggyBank, Heart } from "lucide-react";

export default function AutoBucketing() {
  const navigate = useNavigate();

  const buckets = [
    { name: "Essentials", amount: 5000, icon: <ShoppingBag size={24} />, color: "bg-primary" },
    { name: "Bills & EMIs", amount: 3000, icon: <Zap size={24} />, color: "bg-yellow" },
    { name: "Savings", amount: 2000, icon: <PiggyBank size={24} />, color: "bg-success" },
    { name: "Lifestyle", amount: 2000, icon: <Heart size={24} />, color: "bg-[#FF3B30]" },
  ];

  return (
    <div className="h-full w-full bg-background flex flex-col p-6 pt-12">
      <button
        onClick={() => navigate("/home")}
        className="mb-6 w-10 h-10 rounded-full bg-white flex items-center justify-center"
      >
        <ArrowLeft className="text-text" />
      </button>

      <div className="mb-8">
        <h2 className="mb-3">Auto Money Buckets</h2>
        <p className="text-gray-medium">
          ₹12,000 ko humne automatically divide kar diya
        </p>
      </div>

      <div className="flex-1 space-y-4">
        {buckets.map((bucket) => (
          <div
            key={bucket.name}
            className={`${bucket.color} rounded-[24px] p-5 text-white shadow-card`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[16px] bg-white/20 flex items-center justify-center">
                  {bucket.icon}
                </div>
                <div>
                  <p className="text-sm opacity-90">{bucket.name}</p>
                  <h2>₹{bucket.amount.toLocaleString("en-IN")}</h2>
                </div>
              </div>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: "100%" }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow/20 rounded-[20px] p-5 border-2 border-yellow mb-6">
        <p className="text-sm">
          💡 <span className="font-medium">Smart Tip:</span> Lifestyle bucket se pehle savings pocket karoge, toh goals jaldi milenge!
        </p>
      </div>

      <BigButton onClick={() => navigate("/spend-resistance")} fullWidth>
        Set Spending Rules
      </BigButton>
    </div>
  );
}
