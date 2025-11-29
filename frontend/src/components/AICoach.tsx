import { useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ArrowLeft, Send } from 'lucide-react';

const initialMessages = [
  {
    id: 1,
    sender: 'coach',
    text: 'Namaste Ravi bhai! Main Neha, tumhari financial coach 😊',
    time: '10:30 AM',
  },
  {
    id: 2,
    sender: 'coach',
    text: 'Aaj kya madad chahiye? Kuch puchho ya advice chahiye?',
    time: '10:30 AM',
  },
  {
    id: 3,
    sender: 'user',
    text: 'Main ek naya phone lena chahta hoon. Kya main afford kar sakta hoon?',
    time: '10:32 AM',
  },
  {
    id: 4,
    sender: 'coach',
    text: 'Great question! Kitne ka phone lena chahte ho? Aur cash mein ya EMI?',
    time: '10:32 AM',
  },
  {
    id: 5,
    sender: 'user',
    text: '₹35,000 ka. EMI better hoga ya cash?',
    time: '10:33 AM',
  },
  {
    id: 6,
    sender: 'coach',
    text: 'Maine tumhare finances check kiye. Tumhari monthly income ₹12,000 hai aur current expenses ₹8,500.',
    time: '10:33 AM',
  },
  {
    id: 7,
    sender: 'coach',
    text: '6-month EMI perfect rahega! Monthly ₹6,200 ka EMI easily handle kar sakte ho 👍',
    time: '10:34 AM',
  },
  {
    id: 8,
    sender: 'coach',
    text: 'Interest bhi sirf ₹2,000 lagega. Want me to create a plan?',
    time: '10:34 AM',
  },
  {
    id: 9,
    sender: 'user',
    text: 'Haan! Plan bana do',
    time: '10:35 AM',
  },
  {
    id: 10,
    sender: 'coach',
    text: '🎉 Done! Maine Big Purchase Advisor mein ek plan create kar diya. Check karo! Aur kuch chahiye?',
    time: '10:35 AM',
  },
];

const quickActions = [
  { emoji: '💰', label: 'Budget tips', message: 'Mujhe budget tips do' },
  { emoji: '🎯', label: 'Goal help', message: 'Goal achieve kaise karun?' },
  { emoji: '💳', label: 'EMI advice', message: 'EMI ke baare mein bataao' },
  { emoji: '📊', label: 'Spending analysis', message: 'Mera spending analysis karo' },
];

export default function AICoach() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: inputText,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      // Auto-reply after 1 second
      setTimeout(() => {
        const reply = {
          id: messages.length + 2,
          sender: 'coach',
          text: 'Great question! Let me analyze your situation... 🤔',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, reply]);
      }, 1000);
    }
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: action.message,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-[160px] max-w-[360px] mx-auto">
      <div className="sticky top-0 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] px-6 pt-8 pb-6 rounded-b-[24px] shadow-lg z-10">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={() => navigate('/home')}>
            <ArrowLeft size={24} className="text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">👩</span>
            </div>
            <div>
              <h3 className="text-white">Neha (AI Coach)</h3>
              <p className="text-white/90 text-sm">Always online</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-6 pb-6">
        <div className="space-y-4 mb-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-[20px] p-4 ${
                  message.sender === 'user'
                    ? 'bg-[#FF6B35] text-white'
                    : 'bg-white shadow-md'
                }`}
              >
                <p className={`text-sm ${message.sender === 'user' ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  {message.text}
                </p>
                <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white/70' : 'text-[#1A1A1A]/50'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <p className="text-sm text-[#1A1A1A]/60 mb-3">Quick actions:</p>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleQuickAction(action)}
                className="bg-white rounded-[16px] p-3 shadow-md active:scale-95 transition-transform"
              >
                <span className="text-2xl mb-2 block">{action.emoji}</span>
                <p className="text-xs">{action.label}</p>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/big-purchase-advisor')}
          className="w-full bg-gradient-to-br from-[#34C759] to-[#00C853] rounded-[20px] p-5 shadow-xl mb-4 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-3 text-white">
            <span className="text-3xl">🛍️</span>
            <div className="flex-1 text-left">
              <h3 className="text-white mb-1">Badi cheez lena hai?</h3>
              <p className="text-white/90 text-sm">Big Purchase Advisor use karo</p>
            </div>
          </div>
        </button>
      </div>

      <div className="fixed bottom-[70px] left-0 right-0 bg-white border-t-2 border-[#F0E6DC] px-6 py-4 max-w-[360px] mx-auto">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 h-12 bg-gray-100 rounded-[16px] px-4 outline-none"
          />
          <button
            onClick={handleSend}
            className="w-12 h-12 bg-[#FF6B35] rounded-[16px] flex items-center justify-center active:scale-95 transition-transform"
          >
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
