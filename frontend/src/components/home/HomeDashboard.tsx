import { useNavigate } from "react-router";
import BottomNav from "../shared/BottomNav";
import {
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Sparkles,
  Target,
  CreditCard,
  PiggyBank,
  MessageCircle,
} from "lucide-react";

export default function HomeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full bg-background flex flex-col overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-[#FF8C5A] px-6 pt-12 pb-8 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm opacity-90 mb-1">Namaste 👋</p>
            <h2>Ravi bhai!</h2>
          </div>
          <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-2xl">🔔</span>
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-white/15 backdrop-blur-sm rounded-[24px] p-5 border border-white/20">
          <p className="text-sm opacity-90 mb-1">Aaj tak</p>
          <h1 className="mb-3">₹18,400</h1>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp size={16} />
              <span>Income: ₹24,200</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingDown size={16} />
              <span>Spent: ₹5,800</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-4 gap-3">
          <QuickAction
            icon={<Target size={24} />}
            label="Goals"
            onClick={() => navigate("/create-goal")}
          />
          <QuickAction
            icon={<PiggyBank size={24} />}
            label="Savings"
            onClick={() => navigate("/roundoff-savings")}
          />
          <QuickAction
            icon={<CreditCard size={24} />}
            label="EMIs"
            onClick={() => navigate("/emi-calendar")}
          />
          <QuickAction
            icon={<Sparkles size={24} />}
            label="Invest"
            onClick={() => navigate("/simple-investment")}
          />
        </div>
      </div>

      {/* Weekly Challenge */}
      <div className="px-6 mb-4">
        <button
          onClick={() => navigate("/weekly-challenge")}
          className="w-full bg-gradient-to-r from-yellow to-[#FFC933] rounded-[24px] p-5 text-left shadow-card"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-text mb-1">🎯 Weekly Challenge</p>
              <h3 className="text-text mb-2">Save ₹50 this week</h3>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <span className="text-sm text-text">₹30/₹50</span>
              </div>
            </div>
            <ChevronRight className="text-text" />
          </div>
        </button>
      </div>

      {/* Insights */}
      <div className="px-6 mb-4">
        <h3 className="mb-3">Today's Insights</h3>
        <div className="space-y-3">
          <InsightCard
            emoji="🎉"
            title="Badhiya chal raha hai!"
            description="Is hafte ₹200 kam kharch kiya last week se"
            type="success"
            onClick={() => navigate("/weekly-report")}
          />
          <InsightCard
            emoji="⚠️"
            title="EMI due in 3 days"
            description="Bike EMI ₹3,200 - 1 Dec ko"
            type="warning"
            onClick={() => navigate("/emi-calendar")}
          />
          <InsightCard
            emoji="💡"
            title="₹478 waste ho raha hai"
            description="Unused subscriptions cancel karo"
            type="info"
            onClick={() => navigate("/subscription-waste")}
          />
        </div>
      </div>

      {/* Goals Progress */}
      <div className="px-6 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3>Your Goals</h3>
          <button
            onClick={() => navigate("/create-goal")}
            className="text-primary text-sm font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          <GoalCard
            title="New Bike"
            current={45000}
            target={120000}
            emoji="🏍️"
            onClick={() => navigate("/goal-detail")}
          />
          <GoalCard
            title="Emergency Fund"
            current={1250}
            target={5000}
            emoji="🛡️"
            onClick={() => navigate("/emergency-cushion")}
          />
        </div>
      </div>

      {/* Floating Coach Button */}
      <button
        onClick={() => navigate("/ai-coach")}
        className="fixed bottom-24 right-6 bg-primary text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 z-10"
      >
        <MessageCircle size={20} />
        <span>Talk to Neha</span>
      </button>

      <BottomNav />
    </div>
  );
}

function QuickAction({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 rounded-[16px] bg-white shadow-card transition-all active:scale-95"
    >
      <div className="w-12 h-12 rounded-[12px] bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <span className="text-xs text-center">{label}</span>
    </button>
  );
}

function InsightCard({
  emoji,
  title,
  description,
  type,
  onClick,
}: {
  emoji: string;
  title: string;
  description: string;
  type: "success" | "warning" | "info";
  onClick: () => void;
}) {
  const bgColors = {
    success: "bg-success/10 border-success",
    warning: "bg-yellow/20 border-yellow",
    info: "bg-primary/10 border-primary",
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-[20px] border-2 ${bgColors[type]}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{emoji}</span>
        <div className="flex-1">
          <p className="font-medium mb-1">{title}</p>
          <p className="text-sm text-gray-medium">{description}</p>
        </div>
        <ChevronRight className="text-gray-medium" />
      </div>
    </button>
  );
}

function GoalCard({
  title,
  current,
  target,
  emoji,
  onClick,
}: {
  title: string;
  current: number;
  target: number;
  emoji: string;
  onClick: () => void;
}) {
  const progress = (current / target) * 100;

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-5 rounded-[20px] bg-white shadow-card"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          <div>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-gray-medium">
              ₹{current.toLocaleString("en-IN")} / ₹
              {target.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
        <ChevronRight className="text-gray-medium" />
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </button>
  );
}
