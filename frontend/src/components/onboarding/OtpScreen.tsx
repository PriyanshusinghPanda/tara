import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import BigButton from "../shared/BigButton";
import { CheckCircle } from "lucide-react";

export default function OtpScreen() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["3", "9", "4", "8", "2", "1"]);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Auto-fill OTP animation
    const timer = setTimeout(() => {
      setVerified(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (verified) {
      const timer = setTimeout(() => {
        navigate("/permissions");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [verified, navigate]);

  return (
    <div className="h-full w-full bg-background flex flex-col p-6 pt-16">
      <div className="mb-12">
        <h2 className="mb-3">OTP Verify karo</h2>
        <p className="text-gray-medium">
          +91 98765 43210 par bheja gaya OTP daalo
        </p>
      </div>

      <div className="flex-1">
        <div className="flex gap-3 justify-center mb-8">
          {otp.map((digit, index) => (
            <div
              key={index}
              className={`w-12 h-14 rounded-[16px] flex items-center justify-center text-2xl font-medium transition-all ${
                verified
                  ? "bg-success text-white"
                  : "bg-white border-2 border-gray-300"
              }`}
            >
              {digit}
            </div>
          ))}
        </div>

        {verified && (
          <div className="bg-success/10 rounded-[20px] p-6 border-2 border-success flex items-center gap-4 animate-in slide-in-from-bottom">
            <CheckCircle className="text-success" size={32} />
            <div>
              <p className="font-medium text-success">Verified! ✓</p>
              <p className="text-sm text-gray-medium">
                Aap successfully verify ho gaye
              </p>
            </div>
          </div>
        )}

        {!verified && (
          <div className="text-center">
            <button className="text-primary font-medium">Resend OTP</button>
          </div>
        )}

        <div className="mt-8 bg-yellow/20 rounded-[20px] p-4 border-2 border-yellow">
          <p className="text-sm">
            <span className="font-medium">🎉 Demo:</span> OTP auto-fill ho gaya!
            Real app mein aapko manually enter karna padega.
          </p>
        </div>
      </div>

      {!verified && (
        <div className="pt-6">
          <BigButton onClick={() => setVerified(true)} fullWidth>
            Verify Karo
          </BigButton>
        </div>
      )}
    </div>
  );
}
