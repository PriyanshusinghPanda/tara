import { useNavigate } from "react-router";
import { ArrowLeft, Calendar, AlertCircle } from "lucide-react";
import BottomNav from "../shared/BottomNav";

export default function RecurringPayments() {
  const navigate = useNavigate();

  const payments = [
    { id: 1, name: "House Rent", amount: 5000, date: 5, status: "upcoming", days: 3 },
    { id: 2, name: "Netflix", amount: 199, date: 10, status: "active", days: 8 },
    { id: 3, name: "Bike EMI", amount: 3200, date: 1, status: "paid", days: -2 },
    { id: 4, name: "Mobile Recharge", amount: 299, date: 15, status: "upcoming", days: 13 },
    { id: 5, name: "YouTube Premium", amount: 129, date: 20, status: "active", days: 18 },
  ];

  return (
    <div className="h-full w-full bg-background flex flex-col overflow-y-auto pb-20">
      <div className="bg-white px-6 pt-12 pb-6 border-b">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-10 h-10 rounded-full bg-gray-light flex items-center justify-center"
        >
          <ArrowLeft className="text-text" />
        </button>
        <h2 className="mb-2">Recurring Payments</h2>
        <p className="text-gray-medium">Auto-detect kiye gaye payments</p>
      </div>

      <div className="p-6">
        <div className="bg-primary/10 rounded-[20px] p-5 border-2 border-primary mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-primary" size={24} />
            <div>
              <p className="font-medium mb-1">Total Monthly Recurring</p>
              <h2 className="text-primary">₹8,827</h2>
              <p className="text-sm text-gray-medium mt-1">
                Paiso automatically block kar lega yeh amount har mahine
              </p>
            </div>
          </div>
        </div>

        <h3 className="mb-4">All Recurring Payments</h3>
        <div className="space-y-3">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white rounded-[20px] p-4 shadow-card"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium">{payment.name}</p>
                  <p className="text-sm text-gray-medium flex items-center gap-1 mt-1">
                    <Calendar size={14} />
                    Every {payment.date}th of month
                  </p>
                </div>
                <h3 className="text-primary">₹{payment.amount}</h3>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    payment.status === "paid"
                      ? "bg-success/10 text-success"
                      : payment.status === "upcoming"
                      ? "bg-yellow/20 text-yellow"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {payment.status === "paid"
                    ? "✓ Paid"
                    : payment.status === "upcoming"
                    ? `Due in ${payment.days} days`
                    : "Active"}
                </span>
                {payment.status === "upcoming" && payment.days <= 5 && (
                  <button
                    onClick={() => navigate("/emi-autoblock")}
                    className="text-xs text-primary font-medium"
                  >
                    Set Reminder
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/emi-calendar")}
          className="w-full mt-6 p-4 rounded-[20px] border-2 border-primary text-primary font-medium"
        >
          View Calendar
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
