import { useState } from "react";
import { useNavigate } from "react-router";
import BigButton from "../shared/BigButton";
import { ArrowLeft } from "lucide-react";

export default function ProfileIncome() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const incomeRanges = [
    "₹10,000 se kam",
    "₹10,000 - ₹20,000",
    "₹20,000 - ₹35,000",
    "₹35,000 - ₹50,000",
    "₹50,000 se zyada",
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
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-medium">1/5</span>
        </div>
        <h2 className="mb-3">Mahine mein kitna kamate ho?</h2>
        <p className="text-gray-medium">
          Isse hum aapke liye sahi tips de payenge
        </p>
      </div>

      <div className="flex-1 space-y-3">
        {incomeRanges.map((range) => (
          <button
            key={range}
            onClick={() => setSelected(range)}
            className={`w-full p-5 rounded-[20px] border-2 transition-all text-left ${
              selected === range
                ? "bg-primary text-white border-primary shadow-soft"
                : "bg-white border-gray-200"
            }`}
          >
            <span className="text-lg">{range}</span>
          </button>
        ))}
      </div>

      <div className="pt-6">
        <BigButton
          onClick={() => navigate("/profile-job")}
          fullWidth
          disabled={!selected}
        >
          Next
        </BigButton>
      </div>
    </div>
  );
}
