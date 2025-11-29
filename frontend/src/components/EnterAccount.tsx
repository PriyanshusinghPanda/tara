import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, Building2 } from 'lucide-react';

const banks = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'Indian Bank',
];

export default function EnterAccount() {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccount, setConfirmAccount] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [showBankList, setShowBankList] = useState(false);

  const handleProceed = () => {
    if (
      accountNumber.length >= 9 &&
      accountNumber === confirmAccount &&
      ifsc.length === 11 &&
      beneficiaryName
    ) {
      navigate(`/send-amount?upi=bank@transfer&name=${beneficiaryName}`);
    }
  };

  const isValid =
    accountNumber.length >= 9 &&
    accountNumber === confirmAccount &&
    ifsc.length === 11 &&
    beneficiaryName;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFFDFA] max-w-md mx-auto pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-5 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Bank Transfer</h2>
            <p className="text-xs text-gray-500">Send money to bank account</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
          <p className="text-xs text-blue-900 leading-relaxed">
            💡 Bank transfers may take 1-2 hours to reflect
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4 mb-6">
          {/* Beneficiary Name */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Beneficiary Name
            </label>
            <input
              type="text"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              placeholder="Enter account holder name"
              className="w-full h-14 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-base focus:border-[#FF6B35] focus:outline-none transition-colors"
            />
          </div>

          {/* Account Number */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Account Number
            </label>
            <input
              type="number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              className="w-full h-14 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-base focus:border-[#FF6B35] focus:outline-none transition-colors"
            />
          </div>

          {/* Confirm Account Number */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Confirm Account Number
            </label>
            <input
              type="number"
              value={confirmAccount}
              onChange={(e) => setConfirmAccount(e.target.value)}
              placeholder="Re-enter account number"
              className="w-full h-14 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-base focus:border-[#FF6B35] focus:outline-none transition-colors"
            />
            {confirmAccount && accountNumber !== confirmAccount && (
              <p className="text-xs text-red-600 mt-2">Account numbers don't match</p>
            )}
            {confirmAccount && accountNumber === confirmAccount && (
              <div className="flex items-center gap-2 text-green-600 mt-2">
                <Check size={16} />
                <span className="text-xs font-semibold">Matched</span>
              </div>
            )}
          </div>

          {/* IFSC Code */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              IFSC Code
            </label>
            <input
              type="text"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value.toUpperCase())}
              placeholder="Enter 11-digit IFSC"
              maxLength={11}
              className="w-full h-14 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-base focus:border-[#FF6B35] focus:outline-none transition-colors font-mono"
            />
            <p className="text-xs text-gray-500 mt-2">Format: SBIN0001234</p>
          </div>

          {/* Bank Selection */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Select Bank
            </label>
            <button
              onClick={() => setShowBankList(!showBankList)}
              className="w-full h-14 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-base text-left flex items-center justify-between focus:border-[#FF6B35] transition-colors"
            >
              <span className={selectedBank ? 'text-gray-900' : 'text-gray-400'}>
                {selectedBank || 'Choose bank'}
              </span>
              <Building2 size={20} className="text-gray-400" />
            </button>
            
            {showBankList && (
              <div className="mt-3 max-h-48 overflow-y-auto space-y-2">
                {banks.map((bank) => (
                  <button
                    key={bank}
                    onClick={() => {
                      setSelectedBank(bank);
                      setShowBankList(false);
                    }}
                    className="w-full h-12 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-left transition-colors"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          disabled={!isValid}
          className="w-full h-14 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>Continue</span>
          <Check size={20} />
        </button>
      </div>
    </div>
  );
}
