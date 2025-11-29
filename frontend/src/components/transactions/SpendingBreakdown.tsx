import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import BottomNav from "../shared/BottomNav";

export default function SpendingBreakdown() {
  const navigate = useNavigate();

  const categories = [
    { name: "Food & Dining", amount: 2840, percent: 35, color: "#FF6B35", emoji: "🍽️" },
    { name: "Fuel & Transport", amount: 1960, percent: 24, color: "#FFB800", emoji: "⛽" },
    { name: "Bills & EMIs", amount: 1620, percent: 20, color: "#34C759", emoji: "📄" },
    { name: "Shopping", amount: 1220, percent: 15, color: "#FF3B30", emoji: "🛍️" },
    { name: "Entertainment", amount: 490, percent: 6, color: "#9E9E9E", emoji: "🎬" },
  ];

  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="h-full w-full bg-background flex flex-col overflow-y-auto pb-20">
      <div className="bg-white px-6 pt-12 pb-6 border-b">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-10 h-10 rounded-full bg-gray-light flex items-center justify-center"
        >
          <ArrowLeft className="text-text" />
        </button>
        <h2 className="mb-2">Spending Breakdown</h2>
        <p className="text-gray-medium">Is mahine ka kharch</p>
      </div>

      <div className="p-6">
        {/* Pie Chart Visual */}
        <div className="bg-white rounded-[24px] p-6 shadow-card mb-6">
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                {categories.reduce((acc, cat, i) => {
                  const prevPercent = i === 0 ? 0 : acc.prevPercent;
                  const circumference = 2 * Math.PI * 70;
                  const offset = (prevPercent / 100) * circumference;
                  const dashArray = `${(cat.percent / 100) * circumference} ${circumference}`;
                  
                  acc.circles.push(
                    <circle
                      key={i}
                      cx="96"
                      cy="96"
                      r="70"
                      fill="none"
                      stroke={cat.color}
                      strokeWidth="40"
                      strokeDasharray={dashArray}
                      strokeDashoffset={-offset}
                    />
                  );
                  acc.prevPercent = prevPercent + cat.percent;
                  return acc;
                }, { circles: [] as JSX.Element[], prevPercent: 0 }).circles}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-sm text-gray-medium">Total</p>
                <h3 className="text-primary">₹{total.toLocaleString("en-IN")}</h3>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: cat.color }}
                  ></div>
                  <span className="text-sm flex items-center gap-2">
                    <span>{cat.emoji}</span>
                    {cat.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{cat.amount}</p>
                  <p className="text-xs text-gray-medium">{cat.percent}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-yellow/20 rounded-[20px] p-5 border-2 border-yellow">
          <p className="font-medium mb-2">💡 Tip</p>
          <p className="text-sm">
            Food spending thoda zyada hai. ₹500 mahine mein bachane ke liye ghar ka khana try karo!
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
