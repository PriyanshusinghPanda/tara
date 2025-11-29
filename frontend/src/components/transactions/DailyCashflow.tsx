import { useNavigate } from "react-router";
import { ArrowLeft, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import BottomNav from "../shared/BottomNav";

export default function DailyCashflow() {
  const navigate = useNavigate();

  const transactions = [
    {
      id: 1,
      type: "income",
      title: "Swiggy Payment",
      amount: 1240,
      time: "2:30 PM",
      category: "Delivery",
    },
    {
      id: 2,
      type: "expense",
      title: "Petrol",
      amount: 120,
      time: "11:45 AM",
      category: "Fuel",
    },
    {
      id: 3,
      type: "expense",
      title: "Lunch",
      amount: 80,
      time: "1:15 PM",
      category: "Food",
    },
    {
      id: 4,
      type: "income",
      title: "Zomato Payment",
      amount: 940,
      time: "6:20 PM",
      category: "Delivery",
    },
    {
      id: 5,
      type: "expense",
      title: "Chai",
      amount: 20,
      time: "4:00 PM",
      category: "Food",
    },
  ];

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const netFlow = totalIncome - totalExpense;

  return (
    <div className="h-full w-full bg-background flex flex-col overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 border-b">
        <button
          onClick={() => navigate("/home")}
          className="mb-4 w-10 h-10 rounded-full bg-gray-light flex items-center justify-center"
        >
          <ArrowLeft className="text-text" />
        </button>
        <h2 className="mb-2">Daily Cashflow</h2>
        <p className="text-gray-medium">Aaj ka paisa ka hisaab</p>
      </div>

      {/* Summary Cards */}
      <div className="p-6 space-y-3">
        <div className="bg-success/10 rounded-[20px] p-5 border-2 border-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-medium mb-1">Income Today</p>
              <h2 className="text-success">₹{totalIncome}</h2>
            </div>
            <TrendingUp className="text-success" size={32} />
          </div>
        </div>

        <div className="bg-danger/10 rounded-[20px] p-5 border-2 border-danger">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-medium mb-1">Expense Today</p>
              <h2 className="text-danger">₹{totalExpense}</h2>
            </div>
            <TrendingDown className="text-danger" size={32} />
          </div>
        </div>

        <div className="bg-primary/10 rounded-[20px] p-5 border-2 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-medium mb-1">Net Flow</p>
              <h2 className="text-primary">₹{netFlow}</h2>
            </div>
            <span className="text-3xl">💰</span>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="px-6 pb-6">
        <div className="flex justify-between items-center mb-4">
          <h3>All Transactions</h3>
          <button
            onClick={() => navigate("/unknown-transactions")}
            className="text-primary text-sm font-medium"
          >
            Categorize
          </button>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white rounded-[20px] p-4 shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.type === "income"
                        ? "bg-success/10"
                        : "bg-danger/10"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <TrendingUp
                        className="text-success"
                        size={20}
                      />
                    ) : (
                      <TrendingDown
                        className="text-danger"
                        size={20}
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.title}</p>
                    <p className="text-sm text-gray-medium">
                      {transaction.time} • {transaction.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      transaction.type === "income"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}₹
                    {transaction.amount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/spending-breakdown")}
          className="w-full mt-4 p-4 rounded-[20px] border-2 border-primary text-primary font-medium flex items-center justify-center gap-2"
        >
          View Spending Breakdown
          <ChevronRight size={20} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
