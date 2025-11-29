import { useState } from "react";
import { useNavigate } from "react-router";
import BigButton from "../shared/BigButton";
import { ArrowLeft, Calendar } from "lucide-react";

export default function DailyAutoSave() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(20);

  const monthlyTotal = amount * 30;
  const yearlyTotal = amount * 365;

  return (
    <div className="h-full w-full bg-background flex flex-col p-6 pt-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 w-10 h-10 rounded-full bg-white flex items-center justify-center"
      >
        <ArrowLeft className="text-text" />
      </button>

      <div className="mb-8">
        <h2 className="mb-3">Daily Auto-Save</h2>
        <p className="text-gray-medium">
          Har din automatically save karo
        </p>
      </div>

      <div className="flex-1">
        <div className="bg-white rounded-[24px] p-6 shadow-card mb-6">
          <label className="block text-sm text-gray-medium mb-3">
            Rozana kitna save karoge?
          </label>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setAmount(Math.max(10, amount - 5))}
              className="w-12 h-12 rounded-full bg-gray-light flex items-center justify-center text-2xl"
            >
              -
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-primary">₹{amount}</h1>
              <p className="text-sm text-gray-medium">per day</p>
            </div>
            <button
              onClick={() => setAmount(amount + 5)}
              className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-2xl"
            >
              +
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-[16px] bg-primary/10">
              <span className="text-sm">Monthly Savings</span>
              <span className="font-medium text-primary">₹{monthlyTotal}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-[16px] bg-success/10">
              <span className="text-sm">Yearly Savings</span>
              <span className="font-medium text-success">₹{yearlyTotal}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-card mb-6">
          <div className="flex items-start gap-3">
            <Calendar className="text-primary" size={24} />
            <div>
              <p className="font-medium mb-1">Auto-debit Schedule</p>
              <p className="text-sm text-gray-medium">
                Har raat 11:59 PM pe automatically deduct ho jayega
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow/20 rounded-[20px] p-5 border-2 border-yellow">
          <p className="text-sm">
            🎯 <span className="font-medium">Smart Saving:</span> Chota amount daily save karna better hai than ek baar mein bada amount!
          </p>
        </div>
      </div>

      <div className="pt-6">
        <BigButton onClick={() => navigate("/home")} fullWidth>
          Enable Daily Save
        </BigButton>
      </div>
    </div>
  );
}
