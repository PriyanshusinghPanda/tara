import { useState } from "react";
import { useNavigate } from "react-router";
import BigButton from "../shared/BigButton";
import { Smartphone } from "lucide-react";

export default function PhoneLogin() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const handleContinue = () => {
    navigate("/otp");
  };

  return (
    <div className="h-full w-full bg-background flex flex-col p-6 pt-16">
      <div className="mb-12">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
          <Smartphone className="text-white" size={32} />
        </div>
        <h2 className="mb-3">Apna phone number daalo</h2>
        <p className="text-gray-medium">
          OTP bhejenge aapko verify karne ke liye
        </p>
      </div>

      <div className="flex-1">
        <div className="bg-white rounded-[24px] p-6 shadow-card">
          <label className="block text-sm text-gray-medium mb-2">
            Phone Number
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-4 bg-gray-light rounded-[16px]">
              <span className="text-2xl">🇮🇳</span>
              <span className="font-medium">+91</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="98765 43210"
              maxLength={10}
              className="flex-1 px-4 py-4 bg-gray-light rounded-[16px] outline-none border-2 border-transparent focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="mt-8 bg-yellow/20 rounded-[20px] p-4 border-2 border-yellow">
          <p className="text-sm">
            <span className="font-medium">💡 Demo Mode:</span> Koi bhi number
            daal sakte ho, OTP auto-fill ho jayega!
          </p>
        </div>
      </div>

      <div className="pt-6">
        <BigButton
          onClick={handleContinue}
          fullWidth
          disabled={phone.length < 10}
        >
          OTP Bhejo
        </BigButton>
      </div>
    </div>
  );
}
