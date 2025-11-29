import express from 'express';

const router = express.Router();

// Verify UPI ID
router.post('/verify', async (req, res) => {
  const { upiId } = req.body;
  
  if (!upiId || !upiId.includes('@')) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid UPI ID format' 
    });
  }
  
  // Mock verification (in production, call actual UPI gateway)
  setTimeout(() => {
    res.json({ 
      success: true, 
      data: {
        upiId,
        name: 'Verified User',
        verified: true
      }
    });
  }, 500);
});

// Initiate payment
router.post('/pay', async (req, res) => {
  const { fromUpi, toUpi, amount, note, pin } = req.body;
  
  if (!fromUpi || !toUpi || !amount || !pin) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
    });
  }
  
  if (amount <= 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'Amount must be greater than 0' 
    });
  }
  
  // Mock PIN verification
  if (pin.length !== 4) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid PIN' 
    });
  }
  
  // Simulate payment processing
  setTimeout(() => {
    const transactionId = 'TXN' + Date.now();
    
    res.json({ 
      success: true, 
      data: {
        transactionId,
        fromUpi,
        toUpi,
        amount: parseFloat(amount),
        note,
        status: 'success',
        timestamp: new Date().toISOString()
      },
      message: 'Payment successful'
    });
  }, 2000);
});

// Get payment status
router.get('/status/:transactionId', (req, res) => {
  const { transactionId } = req.params;
  
  res.json({ 
    success: true, 
    data: {
      transactionId,
      status: 'success',
      timestamp: new Date().toISOString()
    }
  });
});

// Generate QR code data
router.post('/generate-qr', (req, res) => {
  const { upiId, name, amount } = req.body;
  
  if (!upiId) {
    return res.status(400).json({ 
      success: false, 
      error: 'UPI ID is required' 
    });
  }
  
  // Generate UPI payment string
  const qrData = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name || 'User')}${amount ? '&am=' + amount : ''}`;
  
  res.json({ 
    success: true, 
    data: {
      qrData,
      upiId,
      name,
      amount: amount || null
    }
  });
});

export default router;
