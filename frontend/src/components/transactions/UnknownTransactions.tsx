import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ShoppingBag, Utensils, Fuel, Home, MoreHorizontal } from "lucide-react";
import BigButton from "../shared/BigButton";

export default function UnknownTransactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([
    { id: 1, title: "UPI-RAJESH", amount: 150, categorized: false, category: "" },
    { id: 2, title: "ATM Withdrawal", amount: 2000, categorized: false, category: "" },
    { id: 3, title: "POS-XYZ Store", amount: 450, categorized: false, category: "" },
  ]);

  const categories = [
    { id: "food", label: "Food", icon: <Utensils size={20} /> },
    { id: "shopping", label: "Shopping", icon: <ShoppingBag size={20} /> },
    { id: "fuel", label: "Fuel", icon: <Fuel size={20} /> },
    { id: "rent", label: "Rent/Bills", icon: <Home size={20} /> },
    { id: "other", label: "Other", icon: <MoreHorizontal size={20} /> },
  ];

  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null);

  const handleCategorize = (transactionId: number, category: string) => {
    setTransactions(
      transactions.map((t) =>
        t.id === transactionId
          ? { ...t, categorized: true, category }
          : t
      )
    );
    setSelectedTransaction(null);
  };

  return (
    <div className="h-full w-full bg-background flex flex-col overflow-y-auto pb-24">
      <div className="bg-white px-6 pt-12 pb-6 border-b">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-10 h-10 rounded-full bg-gray-light flex items-center justify-center"
        >
          <ArrowLeft className="text-text" />
        </button>
        <h2 className="mb-2">Unknown Transactions</h2>
        <p className="text-gray-medium">In transactions ko categorize karo</p>
      </div>

      <div className="p-6 space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            <div
              className={`bg-white rounded-[20px] p-4 shadow-card border-2 ${
                selectedTransaction === transaction.id
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-sm text-gray-medium">
                    {transaction.categorized
                      ? `Category: ${transaction.category}`
                      : "Not categorized"}
                  </p>
                </div>
                <p className="font-medium text-danger">-₹{transaction.amount}</p>
              </div>

              {!transaction.categorized && (
                <button
                  onClick={() => setSelectedTransaction(transaction.id)}
                  className="w-full mt-3 py-2 px-4 rounded-[16px] bg-primary/10 text-primary font-medium text-sm"
                >
                  Categorize
                </button>
              )}

              {transaction.categorized && (
                <div className="mt-3 py-2 px-4 rounded-[16px] bg-success/10 text-success font-medium text-sm text-center">
                  ✓ Categorized
                </div>
              )}
            </div>

            {selectedTransaction === transaction.id && (
              <div className="mt-3 bg-white rounded-[20px] p-4 shadow-card">
                <p className="text-sm font-medium mb-3">Select category:</p>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorize(transaction.id, cat.label)}
                      className="flex flex-col items-center gap-2 p-3 rounded-[12px] bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                    >
                      {cat.icon}
                      <span className="text-xs">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-6 left-6 right-6">
        <BigButton onClick={() => navigate("/home")} fullWidth>
          Done
        </BigButton>
      </div>
    </div>
  );
}
