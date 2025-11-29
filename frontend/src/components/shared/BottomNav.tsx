import { Home, Send, Target, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center">
      <button
        onClick={() => navigate("/home")}
        className="flex flex-col items-center gap-1 transition-all"
      >
        <Home
          size={28}
          className={isActive("/home") ? "text-primary" : "text-gray-medium"}
          fill={isActive("/home") ? "#FF6B35" : "none"}
        />
        <span
          className={`text-xs ${
            isActive("/home") ? "text-primary" : "text-gray-medium"
          }`}
        >
          Home
        </span>
      </button>

      <button
        onClick={() => navigate("/pay")}
        className="flex flex-col items-center gap-1 transition-all"
      >
        <Send
          size={28}
          className={isActive("/pay") ? "text-primary" : "text-gray-medium"}
        />
        <span
          className={`text-xs ${
            isActive("/pay") ? "text-primary" : "text-gray-medium"
          }`}
        >
          Pay
        </span>
      </button>

      <button
        onClick={() => navigate("/create-goal")}
        className="flex flex-col items-center gap-1 transition-all"
      >
        <Target
          size={28}
          className={
            isActive("/create-goal") ? "text-primary" : "text-gray-medium"
          }
        />
        <span
          className={`text-xs ${
            isActive("/create-goal") ? "text-primary" : "text-gray-medium"
          }`}
        >
          Goals
        </span>
      </button>

      <button
        onClick={() => navigate("/ai-coach")}
        className="flex flex-col items-center gap-1 transition-all"
      >
        <MessageCircle
          size={28}
          className={
            isActive("/ai-coach") ? "text-primary" : "text-gray-medium"
          }
          fill={isActive("/ai-coach") ? "#FF6B35" : "none"}
        />
        <span
          className={`text-xs ${
            isActive("/ai-coach") ? "text-primary" : "text-gray-medium"
          }`}
        >
          Coach Me
        </span>
      </button>
    </div>
  );
}
