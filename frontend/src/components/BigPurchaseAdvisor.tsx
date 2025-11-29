import { useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, ShoppingBag, CheckCircle, AlertCircle } from 'lucide-react';

export default function BigPurchaseAdvisor() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'input' | 'analyzing' | 'result'>('input');
  const [amount, setAmount] = useState('35000');

  const handleAnalyze = () => {
    setStep('analyzing');
    setTimeout(() => {
      setStep('result');
    }, 3000);
  };

  const monthlyIncome = 12000;
  const currentExpenses = 8500;
  const surplus = monthlyIncome - currentExpenses;
  const purchaseAmount = parseInt(amount);
  const recommendedEMI = 6;
  const monthlyEMI = Math.ceil(purchaseAmount / recommendedEMI);
  const totalInterest = Math.floor(purchaseAmount * 0.12 * (recommendedEMI / 12));
  const canAfford = monthlyEMI <= surplus * 0.7;

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[90px] max-w-[360px] mx-auto">
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate('/ai-coach')} className="mb-6">
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <ShoppingBag size={32} className="text-[#FF6B35]" />
          <h2>Big Purchase Advisor</h2>
        </div>
        <p className="text-[#1A1A1A]/70">Badi cheez lena hai? Pehle plan karo!</p>
      </div>

      <div className="px-6">
        {step === 'input' && (
          <>
            <div className="bg-white rounded-[24px] p-6 shadow-lg mb-6">
              <h3 className="mb-4">Kitne ki cheez lena chahte ho?</h3>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full h-16 bg-gray-50 rounded-[20px] px-6 text-2xl border-2 border-gray-200 focus:border-[#FF6B35] outline-none mb-4"
              />
              <div className="grid grid-cols-3 gap-3">
                {['25000', '35000', '50000'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className={`h-12 rounded-[12px] transition-all ${
                      amount === preset
                        ? 'bg-[#FF6B35] text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    ₹{parseInt(preset).toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#FFB800]/20 to-[#FF6B35]/20 rounded-[24px] p-5 border-2 border-[#FFB800]/30 mb-6">
              <h3 className="mb-3">Hum kya check karenge:</h3>
              <div className="space-y-2">
                {[
                  'Tumhari current income & expenses',
                  'Monthly surplus kitna hai',
                  'EMI afford kar sakte ho ya nahi',
                  'Best payment plan (EMI vs Cash)',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-sm text-[#1A1A1A]/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              className="w-full h-[60px] bg-[#FF6B35] text-white rounded-[24px] shadow-lg active:scale-95 transition-transform"
            >
              Analyze karo!
            </button>
          </>
        )}

        {step === 'analyzing' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mb-6" />
            <h3 className="mb-2">Analyzing your finances...</h3>
            <p className="text-[#1A1A1A]/70 text-center">
              Bank statement, income, expenses, EMIs - sab check kar rahe hain
            </p>
          </div>
        )}

        {step === 'result' && (
          <>
            <div className={`rounded-[24px] p-6 shadow-xl mb-6 ${
              canAfford
                ? 'bg-gradient-to-br from-[#34C759] to-[#00C853]'
                : 'bg-gradient-to-br from-red-500 to-orange-500'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                {canAfford ? (
                  <CheckCircle size={64} className="text-white" />
                ) : (
                  <AlertCircle size={64} className="text-white" />
                )}
                <div>
                  <h2 className="text-white mb-2">
                    {canAfford ? 'Haan! Le sakte ho 🎉' : 'Thoda risky hai ⚠️'}
                  </h2>
                  <p className="text-white/90">
                    {canAfford
                      ? '₹' + purchaseAmount.toLocaleString() + ' comfortably afford kar sakte ho'
                      : 'Budget thoda tight ho jayega'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-lg mb-6">
              <h3 className="mb-4">Financial breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#1A1A1A]/70">Monthly income:</span>
                  <span className="font-semibold">₹{monthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#1A1A1A]/70">Current expenses:</span>
                  <span className="font-semibold text-[#FF6B35]">₹{currentExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#1A1A1A]/70">Monthly surplus:</span>
                  <span className="font-semibold text-[#34C759]">₹{surplus.toLocaleString()}</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between">
                  <span className="text-sm font-semibold">Recommended EMI:</span>
                  <span className="font-semibold text-[#FF6B35]">₹{monthlyEMI.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className={`rounded-[24px] p-5 border-2 mb-6 ${
              canAfford
                ? 'bg-[#34C759]/10 border-[#34C759]/30'
                : 'bg-red-50 border-red-300'
            }`}>
              <h3 className="mb-3">Recommended plan:</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">EMI tenure:</span>
                  <span className="font-semibold">{recommendedEMI} months</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Monthly payment:</span>
                  <span className="font-semibold">₹{monthlyEMI.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total interest:</span>
                  <span className="font-semibold">₹{totalInterest.toLocaleString()}</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Total payment:</span>
                  <span className="font-semibold text-[#FF6B35]">
                    ₹{(purchaseAmount + totalInterest).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {canAfford ? (
              <div className="bg-gradient-to-br from-[#FFB800]/20 to-[#FF6B35]/20 rounded-[24px] p-5 border-2 border-[#FFB800]/30 mb-6">
                <h3 className="mb-2">💡 Pro tips</h3>
                <ul className="space-y-2 text-sm text-[#1A1A1A]/70">
                  <li>• Down payment kar sako toh EMI aur kam ho jayega</li>
                  <li>• 0% EMI offers check karo (no interest!)</li>
                  <li>• Credit card rewards use kar sakte ho</li>
                  <li>• Emergency fund touch mat karna</li>
                </ul>
              </div>
            ) : (
              <div className="bg-red-50 rounded-[24px] p-5 border-2 border-red-300 mb-6">
                <h3 className="mb-2 text-red-600">⚠️ Suggestions</h3>
                <ul className="space-y-2 text-sm text-[#1A1A1A]/70">
                  <li>• 2-3 months aur wait karo, savings badha lo</li>
                  <li>• Sasta option dekho (₹25,000 range mein)</li>
                  <li>• Extra income source try karo</li>
                  <li>• Unnecessary expenses cut karo</li>
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setStep('input')}
                className="h-[60px] bg-white border-2 border-[#FF6B35] text-[#FF6B35] rounded-[20px] shadow-lg active:scale-95 transition-transform"
              >
                Try different amount
              </button>
              <button
                onClick={() => navigate('/home')}
                className="h-[60px] bg-[#FF6B35] text-white rounded-[20px] shadow-lg active:scale-95 transition-transform"
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
