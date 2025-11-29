import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { 
  Send, QrCode, Smartphone, CreditCard, 
  TrendingUp, TrendingDown, Bell, User,
  ArrowUpRight, ArrowDownRight, Clock,
  Zap, Shield, Gift
} from 'lucide-react';

const quickActions = [
  { icon: Send, label: 'Send Money', path: '/send-money', gradient: 'from-[#FF6B35] to-[#FFB800]' },
  { icon: QrCode, label: 'Scan QR', path: '/scan-qr', gradient: 'from-[#8B5CF6] to-[#EC4899]' },
  { icon: Smartphone, label: 'To Mobile', path: '/to-mobile', gradient: 'from-[#3B82F6] to-[#1D4ED8]' },
  { icon: CreditCard, label: 'To Bank', path: '/to-bank', gradient: 'from-[#34C759] to-[#00C853]' },
];

const recentTransactions = [
  { 
    id: 1, 
    name: 'Ramesh Kumar', 
    upiId: 'ramesh@paytm', 
    amount: 500, 
    type: 'sent', 
    time: '2:30 PM',
    status: 'success'
  },
  { 
    id: 2, 
    name: 'Grocery Store', 
    upiId: 'grocery@paiso', 
    amount: 450, 
    type: 'sent', 
    time: '11:15 AM',
    status: 'success'
  },
  { 
    id: 3, 
    name: 'Delivery Tips', 
    upiId: 'tips@paiso', 
    amount: 150, 
    type: 'received', 
    time: '9:45 AM',
    status: 'success'
  },
  { 
    id: 4, 
    name: 'Salary Credit', 
    upiId: 'company@sbi', 
    amount: 12000, 
    type: 'received', 
    time: 'Yesterday',
    status: 'success'
  },
];

export default function HomeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFFDFA] pb-[90px] max-w-md mx-auto">
      {/* Professional Header */}
      <div className="bg-white shadow-sm">
        <div className="px-5 pt-6 pb-5">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-full flex items-center justify-center">
                <User size={22} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Welcome back</p>
                <h3 className="text-lg font-bold text-gray-900">Ravi Kumar</h3>
              </div>
            </div>
            <button className="relative">
              <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-transform">
                <Bell size={20} className="text-gray-700" />
              </div>
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
          </div>

          {/* Balance Card */}
          <div className="bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-white/80 text-xs font-medium mb-1">Total Balance</p>
                <h1 className="text-white text-3xl font-bold tracking-tight">₹18,400</h1>
              </div>
              <button 
                onClick={() => navigate('/my-qr')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 active:scale-95 transition-all"
              >
                <QrCode size={16} className="text-white" />
                <span className="text-white text-xs font-semibold">My QR</span>
              </button>
            </div>
            
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <ArrowDownRight size={16} className="text-green-300" />
                </div>
                <div>
                  <p className="text-white/70 text-xs">Received</p>
                  <p className="text-white font-semibold">₹12,350</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <ArrowUpRight size={16} className="text-red-300" />
                </div>
                <div>
                  <p className="text-white/70 text-xs">Sent</p>
                  <p className="text-white font-semibold">₹2,150</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 py-6">
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center shadow-md`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Features Banner */}
      <div className="px-5 mb-5">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Instant Transfers</h4>
                <p className="text-white/80 text-xs">24/7 • Free • Secure</p>
              </div>
            </div>
            <ArrowUpRight size={20} className="text-white" />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
          <button 
            onClick={() => navigate('/transactions')}
            className="text-[#FF6B35] text-sm font-semibold"
          >
            View All
          </button>
        </div>

        <div className="space-y-2">
          {recentTransactions.map((txn) => (
            <button
              key={txn.id}
              onClick={() => navigate(`/transaction/${txn.id}`)}
              className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
                    txn.type === 'received' 
                      ? 'bg-green-100' 
                      : 'bg-red-100'
                  }`}>
                    {txn.type === 'received' ? (
                      <ArrowDownRight size={20} className="text-green-600" />
                    ) : (
                      <ArrowUpRight size={20} className="text-red-600" />
                    )}
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-sm">{txn.name}</h4>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">{txn.upiId}</p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-gray-500">{txn.time}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-base ${
                    txn.type === 'received' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {txn.type === 'received' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 justify-end">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <p className="text-xs text-gray-500">Success</p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Features */}
      <div className="px-5 mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate('/emergency-cushion')}
          className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
              <Shield size={18} className="text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">Safety Fund</h4>
          </div>
          <p className="text-xs text-gray-500 mb-2">₹1,250 / ₹5,000</p>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-[25%] bg-green-500 rounded-full"></div>
          </div>
        </button>

        <button
          onClick={() => navigate('/weekly-challenge')}
          className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center">
              <Gift size={18} className="text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">Rewards</h4>
          </div>
          <p className="text-xs text-gray-500 mb-2">Weekly Challenge</p>
          <p className="text-xs font-semibold text-orange-600">Save ₹50 & Win!</p>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
