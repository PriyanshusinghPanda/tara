import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import BigButton from "../shared/BigButton";
import { MessageSquare, Bell, Users, CheckCircle } from "lucide-react";

export default function Permissions() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    sms: false,
    notifications: false,
    contacts: false,
  });
  const [autoGranting, setAutoGranting] = useState(true);

  useEffect(() => {
    // Auto-grant all permissions with animation
    const timers = [
      setTimeout(() => {
        setPermissions((prev) => ({ ...prev, sms: true }));
      }, 500),
      setTimeout(() => {
        setPermissions((prev) => ({ ...prev, notifications: true }));
      }, 1000),
      setTimeout(() => {
        setPermissions((prev) => ({ ...prev, contacts: true }));
      }, 1500),
      setTimeout(() => {
        setAutoGranting(false);
      }, 2000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const allGranted =
    permissions.sms && permissions.notifications && permissions.contacts;

  return (
    <div className="h-full w-full bg-background flex flex-col p-6 pt-16">
      <div className="mb-8">
        <h2 className="mb-3">Kuch permissions chahiye</h2>
        <p className="text-gray-medium">
          Paiso ko sahi se kaam karne ke liye ye zaruri hain
        </p>
      </div>

      <div className="flex-1 space-y-4">
        <PermissionCard
          icon={<MessageSquare size={28} />}
          title="SMS Access"
          description="Bank transactions ko automatically track karne ke liye"
          granted={permissions.sms}
        />
        <PermissionCard
          icon={<Bell size={28} />}
          title="Notifications"
          description="Important reminders aur alerts ke liye"
          granted={permissions.notifications}
        />
        <PermissionCard
          icon={<Users size={28} />}
          title="Contacts"
          description="Aasani se paise bhejne ke liye"
          granted={permissions.contacts}
        />

        {allGranted && (
          <div className="bg-success/10 rounded-[20px] p-4 border-2 border-success animate-in slide-in-from-bottom mt-6">
            <p className="text-success font-medium flex items-center gap-2">
              <CheckCircle size={20} />
              Sab permissions mil gayi! 🎉
            </p>
          </div>
        )}
      </div>

      <div className="pt-6">
        <BigButton
          onClick={() => navigate("/profile-income")}
          fullWidth
          disabled={!allGranted || autoGranting}
        >
          {autoGranting ? "Granting..." : "Continue"}
        </BigButton>
        <button
          onClick={() => navigate("/profile-income")}
          className="w-full text-center text-gray-medium mt-4"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

function PermissionCard({
  icon,
  title,
  description,
  granted,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  granted: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-[24px] p-5 shadow-card border-2 transition-all ${
        granted ? "border-success" : "border-transparent"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-[16px] flex items-center justify-center ${
            granted ? "bg-success text-white" : "bg-gray-light text-primary"
          }`}
        >
          {granted ? <CheckCircle size={28} /> : icon}
        </div>
        <div className="flex-1">
          <h3 className="mb-1">{title}</h3>
          <p className="text-sm text-gray-medium">{description}</p>
        </div>
      </div>
    </div>
  );
}
