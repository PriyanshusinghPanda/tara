import { useNavigate } from "react-router";
import BigButton from "../shared/BigButton";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export default function OnboardingSlide3() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full bg-background flex flex-col items-center justify-between p-6 pt-16 pb-8">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8">
          <ImageWithFallback
            src="https://illustrations.popsy.co/amber/working-vacation.svg"
            alt="Happy person"
            className="w-72 h-72"
          />
        </div>
        <h2 className="text-center mb-4 text-text">
          Apne sapne
          <br />
          pura karo!
        </h2>
        <p className="text-center text-gray-medium max-w-xs">
          Bike, Phone ya ghar - kuch bhi! Paiso batayega kitna save karna hai
          aur kaise!
        </p>
      </div>

      <div className="w-full space-y-4">
        <div className="flex justify-center gap-2 mb-6">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-2 bg-primary rounded-full"></div>
        </div>
        <BigButton onClick={() => navigate("/phone-login")} fullWidth>
          Shuru Karo
        </BigButton>
        <button
          onClick={() => navigate("/onboarding-2")}
          className="w-full text-center text-gray-medium"
        >
          Back
        </button>
      </div>
    </div>
  );
}
