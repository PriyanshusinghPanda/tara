# Paiso Frontend

React-based frontend for Paiso fintech app.

## 🚀 Setup

```bash
npm install
npm run dev
```

## 📁 Structure

```
frontend/
├── src/
│   ├── components/      # All UI components (40+ screens)
│   ├── styles/          # Global CSS & Tailwind
│   ├── utils/           # Routes & utilities
│   ├── App.tsx          # Main app
│   └── main.tsx         # Entry point
├── index.html
├── package.json
└── vite.config.ts
```

## 🎨 Key Components

- **Splash** - Animated splash screen
- **OnboardingCarousel** - 3-slide onboarding
- **PhoneLogin** - Phone number entry
- **OTPScreen** - OTP verification
- **HomeDashboard** - Main dashboard
- **SendMoney** - UPI payment flow
- **MyQR** - Personal QR code
- **ScanQR** - QR scanner

## 🔌 API Integration

Frontend connects to backend at `http://localhost:5000/api`

Configure in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📱 Mobile Optimization

- Max width: 448px (28rem)
- Touch targets: 60px+
- Animations: 60fps
- Responsive design
