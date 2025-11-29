# Paiso Backend API

Express.js backend for Paiso fintech app.

## 🚀 Setup

```bash
npm install
npm run dev
```

Server runs on **http://localhost:5000**

## 📁 Structure

```
backend/
├── src/
│   ├── routes/
│   │   ├── auth.js          # Authentication
│   │   ├── transactions.js  # Transactions + AI
│   │   ├── upi.js           # UPI payments
│   │   ├── savings.js       # Savings & goals
│   │   └── analytics.js     # Analytics
│   └── server.js            # Express server
├── .env
└── package.json
```

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/send-otp
POST /api/auth/verify-otp
GET  /api/auth/profile
```

### UPI Payments
```
POST /api/upi/verify        # Verify UPI ID
POST /api/upi/pay           # Process payment
GET  /api/upi/status/:id    # Payment status
POST /api/upi/generate-qr   # Generate QR
```

### Transactions
```
GET  /api/transactions                      # List all
GET  /api/transactions/:id                  # Get one
POST /api/transactions                      # Create (auto-categorizes!)
POST /api/transactions/batch-categorize     # Batch process
GET  /api/transactions/analytics/by-category # By category
```

### Savings
```
GET  /api/savings                # All savings data
GET  /api/savings/emergency      # Emergency fund
POST /api/savings/emergency/add  # Add to emergency
GET  /api/savings/goals          # All goals
POST /api/savings/goals          # Create goal
POST /api/savings/goals/:id/add  # Add to goal
```

### Analytics
```
GET /api/analytics/spending      # Spending analytics
GET /api/analytics/insights      # AI insights
GET /api/analytics/predictions   # Predictions
```

## 🧪 Testing

```bash
# Health check
curl http://localhost:5000/api/health

# Send OTP
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'

# Create transaction (auto-categorizes!)
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 450,
    "type": "debit",
    "description": "Swiggy Food Order"
  }'
```

## ⚙️ Environment Variables

```env
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## 🤖 AI Integration

Transactions are auto-categorized using `/aiModel/categorizer.js`

```javascript
import { categorizeTransaction } from '../../aiModel/categorizer.js';

const category = await categorizeTransaction(description, amount);
// Returns: "Food & Dining", "Transport", etc.
```

## 🔒 Security

- JWT authentication
- Input validation
- CORS enabled
- Mock UPI (no real money)
