import express from 'express';
import agent from '../agents/financeAgent.js';
import scheduler from '../agents/taskScheduler.js';

const router = express.Router();

// Mock user data (replace with database in production)
const getUserData = (userId) => {
  return {
    userId,
    profile: { monthlyIncome: 15000, age: 28, jobType: 'delivery_rider' },
    transactions: [
      {
        id: 1,
        amount: 500,
        type: 'debit',
        description: 'Swiggy Food Order',
        timestamp: new Date().toISOString(),
        category: 'Food & Dining'
      },
      {
        id: 2,
        amount: 12000,
        type: 'credit',
        description: 'Salary Credit',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        category: 'Income'
      },
      {
        id: 3,
        amount: 3500,
        type: 'debit',
        description: 'Zomato Orders',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        category: 'Food & Dining'
      },
      {
        id: 4,
        amount: 199,
        type: 'debit',
        description: 'Netflix Subscription',
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        category: 'Subscriptions'
      },
      {
        id: 5,
        amount: 499,
        type: 'debit',
        description: 'Amazon Prime',
        timestamp: new Date(Date.now() - 345600000).toISOString(),
        category: 'Subscriptions'
      },
      {
        id: 6,
        amount: 2500,
        type: 'debit',
        description: 'New Headphones',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        category: 'Shopping'
      }
    ],
    savings: {
      emergency: { current: 1250, target: 5000 },
      autoSave: { enabled: false, dailyAmount: 0 },
      streak: 7
    },
    goals: [
      {
        id: 1,
        name: 'Bike',
        emoji: '🏍️',
        current: 32000,
        target: 120000,
        deadline: '2025-12-31',
        createdAt: '2025-01-01'
      }
    ]
  };
};

// Get agent insights for user
router.get('/insights/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = getUserData(userId);
    
    const result = await agent.runAgent(userData);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get insights by category
router.get('/insights/:userId/:category', async (req, res) => {
  try {
    const { userId, category } = req.params;
    const userData = getUserData(userId);
    
    const result = await agent.getInsightsByCategory(userData, category);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Manually trigger agent for testing
router.post('/run/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = req.body.userData || getUserData(userId);
    
    const result = await agent.runAgent(userData);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Clear agent history for user (useful for testing)
router.delete('/history/:userId', (req, res) => {
  const { userId } = req.params;
  agent.clearHistory(userId);
  
  res.json({
    success: true,
    message: `History cleared for user ${userId}`
  });
});

// Start scheduler
router.post('/scheduler/start', (req, res) => {
  scheduler.start();
  res.json({
    success: true,
    message: 'Task scheduler started'
  });
});

// Stop scheduler
router.post('/scheduler/stop', (req, res) => {
  scheduler.stop();
  res.json({
    success: true,
    message: 'Task scheduler stopped'
  });
});

// Get scheduler status
router.get('/scheduler/status', (req, res) => {
  res.json({
    success: true,
    isRunning: scheduler.isRunning
  });
});

export default router;
