import express from 'express';
import { categorizeTransaction } from '../../aiModel/categorizer.js';
import agent from '../agents/financeAgent.js';

const router = express.Router();

// Mock transaction data
let transactions = [
  {
    id: 1,
    amount: 500,
    type: 'debit',
    description: 'Swiggy Food Order',
    timestamp: new Date().toISOString(),
    category: 'Food & Dining',
    upiId: 'swiggy@paytm',
    status: 'success'
  },
  {
    id: 2,
    amount: 12000,
    type: 'credit',
    description: 'Salary Credit',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    category: 'Income',
    upiId: 'company@sbi',
    status: 'success'
  },
  {
    id: 3,
    amount: 450,
    type: 'debit',
    description: 'Grocery Store',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    category: 'Groceries',
    upiId: 'grocery@paiso',
    status: 'success'
  }
];

// Get all transactions
router.get('/', (req, res) => {
  const { type, limit = 50 } = req.query;
  
  let filteredTransactions = transactions;
  if (type) {
    filteredTransactions = transactions.filter(t => t.type === type);
  }
  
  res.json({
    success: true,
    data: filteredTransactions.slice(0, parseInt(limit)),
    total: filteredTransactions.length
  });
});

// Get transaction by ID
router.get('/:id', (req, res) => {
  const transaction = transactions.find(t => t.id === parseInt(req.params.id));
  
  if (!transaction) {
    return res.status(404).json({ success: false, error: 'Transaction not found' });
  }
  
  res.json({ success: true, data: transaction });
});

// Create new transaction (auto-categorize + run agent)
router.post('/', async (req, res) => {
  const { amount, type, description, upiId, userId = 'user_001' } = req.body;
  
  if (!amount || !type || !description) {
    return res.status(400).json({ 
      success: false, 
      error: 'Amount, type, and description are required' 
    });
  }
  
  // Use AI model to categorize
  const category = await categorizeTransaction(description, amount);
  
  const newTransaction = {
    id: transactions.length + 1,
    amount: parseFloat(amount),
    type,
    description,
    upiId: upiId || 'unknown@upi',
    category,
    timestamp: new Date().toISOString(),
    status: 'success'
  };
  
  transactions.unshift(newTransaction);
  
  // Run Agentic AI after transaction
  const userData = {
    userId,
    transactions,
    savings: { emergency: { current: 1250, target: 5000 }, streak: 7 },
    goals: [{ id: 1, name: 'Bike', current: 32000, target: 120000, deadline: '2025-12-31' }],
    profile: { monthlyIncome: 15000 }
  };
  
  const agentResult = await agent.runAgent(userData);
  
  res.status(201).json({ 
    success: true, 
    data: newTransaction,
    message: 'Transaction created and categorized successfully',
    agent: agentResult // Include agent insights
  });
});

// Batch categorize transactions
router.post('/batch-categorize', async (req, res) => {
  const { transactions: txns } = req.body;
  
  if (!Array.isArray(txns)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Transactions must be an array' 
    });
  }
  
  const categorized = await Promise.all(
    txns.map(async (txn) => ({
      ...txn,
      category: await categorizeTransaction(txn.description, txn.amount)
    }))
  );
  
  res.json({ 
    success: true, 
    data: categorized,
    message: `${categorized.length} transactions categorized`
  });
});

// Get spending by category
router.get('/analytics/by-category', (req, res) => {
  const { startDate, endDate } = req.query;
  
  const debits = transactions.filter(t => t.type === 'debit');
  
  const categoryTotals = debits.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});
  
  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
    count: debits.filter(t => t.category === category).length
  })).sort((a, b) => b.amount - a.amount);
  
  res.json({ success: true, data });
});

export default router;
