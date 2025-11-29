import { useState } from "react";
import { useNavigate } from "react-router";
import BigButton from "../shared/BigButton";
import { ArrowLeft, ShoppingCart, UtensilsCrossed, Gamepad2 } from "lucide-react";

export default function SpendResistance() {
  const navigate = useNavigate();
  const [rules, setRules] = useState({
    foodDelivery: false,
    shopping: false,
    gaming: false,
  });

  const toggleRule = (rule: keyof typeof rules) => {
    setRules((prev) => ({ ...prev, [rule]: !prev[rule] }));
  };

  return (
    <div className="h-full w-full bg-background flex flex-col p-6 pt-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 w-10 h-10 rounded-full bg-white flex items-center justify-center"
      >
        <ArrowLeft className="text-text" />
      </button>

      <div className="mb-8">
        <h2 className="mb-3">Spend Resistance</h2>
        <p className="text-gray-medium">
          Impulsive kharcha se bachne ke liye blocks lagao
        </p>
      </div>

      <div className="flex-1 space-y-4">
        <RuleToggle
          icon={<UtensilsCrossed size={28} />}
          title="Block Food Delivery Apps"
          description="Swiggy, Zomato jaise apps block karenge"
          enabled={rules.foodDelivery}
          onToggle={() => toggleRule("foodDelivery")}
        />
        <RuleToggle
          icon={<ShoppingCart size={28} />}
          title="Block Online Shopping"
          description="Amazon, Flipkart par impulse buying rokenge"
          enabled={rules.shopping}
          onToggle={() => toggleRule("shopping")}
        />
        <RuleToggle
          icon={<Gamepad2 size={28} />}
          title="Block Gaming Payments"
          description="In-app purchases aur gaming payments"
          enabled={rules.gaming}
          onToggle={() => toggleRule("gaming")}
        />
      </div>

      <div className="bg-yellow/20 rounded-[20px] p-5 border-2 border-yellow mb-6">
        <p className="text-sm">
          🛡️ <span className="font-medium">Protection Mode:</span> Yeh blocks aapko warning denge, payment nahi rokenge. Aap confirm karke proceed kar sakte ho.
        </p>
      </div>

      <BigButton onClick={() => navigate("/home")} fullWidth>
        Save Settings
      </BigButton>
    </div>
  );
}

function RuleToggle({
  icon,
  title,
  description,
  enabled,
  onToggle,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-[24px] p-5 shadow-card">
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-[16px] flex items-center justify-center ${
            enabled ? "bg-primary text-white" : "bg-gray-light text-gray-medium"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <p className="font-medium mb-1">{title}</p>
          <p className="text-sm text-gray-medium">{description}</p>
        </div>
        <button
          onClick={onToggle}
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
    </div>
  );
}
