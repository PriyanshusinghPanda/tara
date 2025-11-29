import express from 'express';

const router = express.Router();

// Mock user database
const users = new Map();

// Send OTP
router.post('/send-otp', (req, res) => {
  const { phone } = req.body;
  
  if (!phone || phone.length !== 10) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid phone number' 
    });
  }
  
  // Mock OTP (always 394821 for demo)
  const otp = '394821';
  
  // Store OTP temporarily (in production, use Redis with expiry)
  users.set(phone, { otp, timestamp: Date.now() });
  
  res.json({ 
    success: true, 
    message: 'OTP sent successfully',
    // In production, don't send OTP in response
    debug: { otp } 
  });
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  
  const userData = users.get(phone);
  
  if (!userData || userData.otp !== otp) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid OTP' 
    });
  }
  
  // Check if OTP expired (5 minutes)
  if (Date.now() - userData.timestamp > 300000) {
    return res.status(400).json({ 
      success: false, 
      error: 'OTP expired' 
    });
  }
  
  // Generate mock JWT token
  const token = 'mock_jwt_' + phone + '_' + Date.now();
  
  res.json({ 
    success: true, 
    data: {
      token,
      user: {
        phone,
        name: 'Ravi Kumar',
        upiId: phone + '@paiso'
      }
    },
    message: 'Login successful'
  });
});

// Get user profile
router.get('/profile', (req, res) => {
  // Mock authentication
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized' 
    });
  }
  
  res.json({ 
    success: true, 
    data: {
      name: 'Ravi Kumar',
      phone: '9876543210',
      upiId: '9876543210@paiso',
      balance: 18400,
      profileComplete: true
    }
  });
});

export default router;
