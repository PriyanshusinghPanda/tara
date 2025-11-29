import { useState } from "react";
import { useNavigate } from "react-router";
import BigButton from "../shared/BigButton";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function ProfileGoal() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const goals = [
    "Zyada paisa bachana",
    "Loans aur debt kam karna",
    "Koi badi cheez kharidna",
    "Paise ke baare mein seekhna",
  ];

  return (
    <div className="h-full w-full bg-background flex flex-col p-6 pt-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 w-10 h-10 rounded-full bg-white flex items-center justify-center"
      >
        <ArrowLeft className="text-text" />
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <div className="w-8 h-1 bg-primary rounded-full"></div>
          </div>
          <span className="text-sm text-gray-medium">5/5</span>
        </div>
        <h2 className="mb-3">Aapka main goal kya hai?</h2>
        <p className="text-gray-medium">
          Hum aapki help karne ke liye tayar hain!
        </p>
      </div>

      <div className="flex-1 space-y-3">
        {goals.map((goal) => (
          <button
            key={goal}
            onClick={() => setSelected(goal)}
            className={`w-full p-5 rounded-[20px] border-2 transition-all text-left ${
              selected === goal
                ? "bg-primary text-white border-primary shadow-soft"
                : "bg-white border-gray-200"
            }`}
          >
            <span className="text-lg">{goal}</span>
          </button>
        ))}
      </div>

      <div className="pt-6">
        <BigButton
          onClick={() => navigate("/home")}
          fullWidth
          disabled={!selected}
        >
          <span className="flex items-center gap-2 justify-center">
            <Sparkles size={20} />
            Shuru Karo
          </span>
        </BigButton>
      </div>
    </div>
  );
}
