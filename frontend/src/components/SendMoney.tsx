import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, User, Smartphone, Building2, Search, Clock } from 'lucide-react';

const recentContacts = [
  { id: 1, name: 'Ramesh Kumar', upiId: 'ramesh@paytm', avatar: '👨' },
  { id: 2, name: 'Priya Singh', upiId: 'priya@phonepe', avatar: '👩' },
  { id: 3, name: 'Amit Patel', upiId: 'amit@googlepay', avatar: '👨' },
  { id: 4, name: 'Grocery Store', upiId: 'grocery@paiso', avatar: '🏪' },
];

export default function SendMoney() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = recentContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.upiId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFFDVA] max-w-md mx-auto pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-5 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Send Money</h2>
            <p className="text-xs text-gray-500">Instant & Free transfers</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-5">
        {/* Search Bar */}
        <div className="relative mb-5">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, UPI ID or mobile"
            className="w-full h-12 pl-12 pr-4 bg-white border-2 border-gray-100 rounded-2xl text-sm focus:border-[#FF6B35] focus:outline-none transition-colors"
          />
        </div>

        {/* Quick Options */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => navigate('/enter-upi')}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-xl flex items-center justify-center mx-auto mb-2">
              <User size={22} className="text-white" />
            </div>
            <p className="text-xs font-semibold text-gray-700 text-center">To UPI ID</p>
          </button>

          <button
            onClick={() => navigate('/enter-mobile')}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-xl flex items-center justify-center mx-auto mb-2">
              <Smartphone size={22} className="text-white" />
            </div>
            <p className="text-xs font-semibold text-gray-700 text-center">To Mobile</p>
          </button>

          <button
            onClick={() => navigate('/enter-account')}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#34C759] to-[#00C853] rounded-xl flex items-center justify-center mx-auto mb-2">
              <Building2 size={22} className="text-white" />
            </div>
            <p className="text-xs font-semibold text-gray-700 text-center">To Bank</p>
          </button>
        </div>

        {/* Recent Contacts */}
        <div className="mb-4 flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <h3 className="text-sm font-bold text-gray-900">Recent</h3>
        </div>

        <div className="space-y-2">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => navigate(`/send-amount?upi=${contact.upiId}&name=${contact.name}`)}
              className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-2xl">
                  {contact.avatar}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 text-sm">{contact.name}</h4>
                  <p className="text-xs text-gray-500">{contact.upiId}</p>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <ArrowLeft size={16} className="text-gray-600 rotate-180" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search size={24} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No contacts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
