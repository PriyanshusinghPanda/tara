import { useState } from "react";
import { useNavigate } from "react-router";
import BigButton from "../shared/BigButton";
import { ArrowLeft, Bike, Car, Home, ShoppingBag, Briefcase, User } from "lucide-react";

export default function ProfileJobType() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const jobTypes = [
    { id: "delivery", label: "Delivery Partner", icon: <Bike size={32} /> },
    { id: "driver", label: "Driver", icon: <Car size={32} /> },
    { id: "maid", label: "House Help", icon: <Home size={32} /> },
    { id: "shop", label: "Shop Owner", icon: <ShoppingBag size={32} /> },
    { id: "freelancer", label: "Freelancer", icon: <User size={32} /> },
    { id: "salaried", label: "Salaried Job", icon: <Briefcase size={32} /> },
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
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-medium">2/5</span>
        </div>
        <h2 className="mb-3">Kya kaam karte ho?</h2>
        <p className="text-gray-medium">Apna kaam type chuniye</p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-3">
        {jobTypes.map((job) => (
          <button
            key={job.id}
            onClick={() => setSelected(job.id)}
            className={`p-5 rounded-[20px] border-2 transition-all flex flex-col items-center gap-3 ${
              selected === job.id
                ? "bg-primary text-white border-primary shadow-soft"
                : "bg-white border-gray-200"
            }`}
          >
            <div
              className={`w-16 h-16 rounded-[16px] flex items-center justify-center ${
                selected === job.id ? "bg-white/20" : "bg-gray-light"
              }`}
            >
              <div className={selected === job.id ? "text-white" : "text-primary"}>
                {job.icon}
              </div>
            </div>
            <span className="text-center text-sm">{job.label}</span>
          </button>
        ))}
      </div>

      <div className="pt-6">
        <BigButton
          onClick={() => navigate("/profile-age")}
          fullWidth
          disabled={!selected}
        >
          Next
        </BigButton>
      </div>
    </div>
  );
}
