import express from 'express';

const router = express.Router();

// Mock savings data
const savings = {
  emergency: {
    current: 1250,
    target: 5000,
    percentage: 25
  },
  goals: [
    {
      id: 1,
      name: 'Bike',
      emoji: '🏍️',
      current: 32000,
      target: 120000,
      percentage: 27,
      deadline: '2025-12-31'
    }
  ],
  autoSave: {
    enabled: true,
    dailyAmount: 20,
    monthlyTotal: 600,
    roundOff: true
  }
};

// Get all savings
router.get('/', (req, res) => {
  res.json({ success: true, data: savings });
});

// Get emergency fund
router.get('/emergency', (req, res) => {
  res.json({ success: true, data: savings.emergency });
});

// Add to emergency fund
router.post('/emergency/add', (req, res) => {
  const { amount } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid amount' 
    });
  }
  
  savings.emergency.current += parseFloat(amount);
  savings.emergency.percentage = Math.round(
    (savings.emergency.current / savings.emergency.target) * 100
  );
  
  res.json({ 
    success: true, 
    data: savings.emergency,
    message: `₹${amount} added to emergency fund`
  });
});

// Get all goals
router.get('/goals', (req, res) => {
  res.json({ success: true, data: savings.goals });
});

// Create new goal
router.post('/goals', (req, res) => {
  const { name, target, deadline, emoji } = req.body;
  
  if (!name || !target) {
    return res.status(400).json({ 
      success: false, 
      error: 'Name and target are required' 
    });
  }
  
  const newGoal = {
    id: savings.goals.length + 1,
    name,
    emoji: emoji || '🎯',
    current: 0,
    target: parseFloat(target),
    percentage: 0,
    deadline: deadline || null
  };
  
  savings.goals.push(newGoal);
  
  res.status(201).json({ 
    success: true, 
    data: newGoal,
    message: 'Goal created successfully'
  });
});

// Add to goal
router.post('/goals/:id/add', (req, res) => {
  const { amount } = req.body;
  const goalId = parseInt(req.params.id);
  
  const goal = savings.goals.find(g => g.id === goalId);
  
  if (!goal) {
    return res.status(404).json({ 
      success: false, 
      error: 'Goal not found' 
    });
  }
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid amount' 
    });
  }
  
  goal.current += parseFloat(amount);
  goal.percentage = Math.round((goal.current / goal.target) * 100);
  
  res.json({ 
    success: true, 
    data: goal,
    message: `₹${amount} added to ${goal.name}`
  });
});

// Get auto-save settings
router.get('/auto-save', (req, res) => {
  res.json({ success: true, data: savings.autoSave });
});

// Update auto-save settings
router.put('/auto-save', (req, res) => {
  const { enabled, dailyAmount, roundOff } = req.body;
  
  if (enabled !== undefined) savings.autoSave.enabled = enabled;
  if (dailyAmount !== undefined) savings.autoSave.dailyAmount = parseFloat(dailyAmount);
  if (roundOff !== undefined) savings.autoSave.roundOff = roundOff;
  
  savings.autoSave.monthlyTotal = savings.autoSave.dailyAmount * 30;
  
  res.json({ 
    success: true, 
    data: savings.autoSave,
    message: 'Auto-save settings updated'
  });
});

export default router;
