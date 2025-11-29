import express from 'express';

const router = express.Router();

// Get spending analytics
router.get('/spending', (req, res) => {
  const { period = 'month' } = req.query;
  
  const analytics = {
    period,
    totalSpent: 8950,
    totalIncome: 12350,
    balance: 3400,
    categories: [
      { name: 'Food & Dining', amount: 4200, percentage: 47, emoji: '🍽️' },
      { name: 'Transport', amount: 2800, percentage: 31, emoji: '⛽' },
      { name: 'Entertainment', amount: 1500, percentage: 17, emoji: '🎬' },
      { name: 'Shopping', amount: 450, percentage: 5, emoji: '🛍️' }
    ],
    trend: 'down', // up, down, stable
    comparison: {
      lastPeriod: 9200,
      difference: -250,
      percentage: -2.7
    }
  };
  
  res.json({ success: true, data: analytics });
});

// Get insights
router.get('/insights', (req, res) => {
  const insights = [
    {
      type: 'savings',
      title: 'Great savings streak!',
      description: 'You saved ₹600 this week. Keep it up!',
      emoji: '🎉',
      priority: 'high'
    },
    {
      type: 'warning',
      title: 'Food spending high',
      description: 'Your food spending is 20% higher than usual',
      emoji: '⚠️',
      priority: 'medium'
    },
    {
      type: 'tip',
      title: 'Emergency fund tip',
      description: 'Add ₹50 daily to reach your emergency fund goal',
      emoji: '💡',
      priority: 'low'
    }
  ];
  
  res.json({ success: true, data: insights });
});

// Get predictions
router.get('/predictions', (req, res) => {
  const predictions = {
    monthEndBalance: 5200,
    savingsPotential: 1800,
    recurringExpenses: 3200,
    recommendations: [
      'Save ₹20 daily to increase month-end balance',
      'Cancel unused subscriptions worth ₹499',
      'Switch to auto-save for better consistency'
    ]
  };
  
  res.json({ success: true, data: predictions });
});

export default router;
