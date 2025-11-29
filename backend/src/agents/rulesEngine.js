/**
 * Rules Engine - Evaluates financial patterns and creates actionable tasks
 * This is the "brain" that analyzes user behavior
 */

class RulesEngine {
  /**
   * Evaluate all rules and return actionable tasks
   * @param {Object} context - User financial context
   * @returns {Array} - List of tasks for the agent to execute
   */
  evaluateRules(context) {
    const { transactions, savings, goals, userProfile } = context;
    const tasks = [];

    // Rule 1: Overspending Detection
    tasks.push(...this.detectOverspending(transactions));

    // Rule 2: Income Detection & Auto-Save Suggestion
    tasks.push(...this.detectIncome(transactions, savings));

    // Rule 3: Bill Due Reminders
    tasks.push(...this.detectUpcomingBills(transactions));

    // Rule 4: Goal Progress Alerts
    tasks.push(...this.checkGoalProgress(goals));

    // Rule 5: Emergency Fund Check
    tasks.push(...this.checkEmergencyFund(savings, userProfile));

    // Rule 6: Subscription Waste Detection
    tasks.push(...this.detectSubscriptionWaste(transactions));

    // Rule 7: Large Purchase Warning
    tasks.push(...this.detectLargePurchases(transactions));

    // Rule 8: Weekly Savings Streak
    tasks.push(...this.checkSavingsStreak(savings));

    return tasks;
  }

  /**
   * Rule 1: Detect overspending in categories
   */
  detectOverspending(transactions) {
    const tasks = [];
    const currentMonth = new Date().getMonth();
    
    // Get current month transactions
    const monthTransactions = transactions.filter(t => {
      const txnDate = new Date(t.timestamp);
      return txnDate.getMonth() === currentMonth && t.type === 'debit';
    });

    // Category limits (can be personalized per user)
    const categoryLimits = {
      'Food & Dining': 4000,
      'Entertainment': 2000,
      'Shopping': 3000,
      'Transport': 2500
    };

    // Calculate spending by category
    const categorySpending = monthTransactions.reduce((acc, txn) => {
      acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
      return acc;
    }, {});

    // Check each category
    Object.entries(categorySpending).forEach(([category, amount]) => {
      const limit = categoryLimits[category];
      if (limit && amount > limit) {
        const overspend = amount - limit;
        tasks.push({
          type: 'warning',
          priority: 'high',
          category: 'overspending',
          message: `Overspending alert: ${category}`,
          description: `You've spent ₹${amount} on ${category} this month, which is ₹${overspend} over the recommended ₹${limit}`,
          suggestion: `Try to limit ${category} spending to ₹${Math.round(limit/4)}/week`,
          action: 'set_category_limit',
          data: { category, currentSpend: amount, limit, overspend }
        });
      }
    });

    return tasks;
  }

  /**
   * Rule 2: Detect salary credit and suggest auto-save
   */
  detectIncome(transactions, savings) {
    const tasks = [];
    const recentIncome = transactions.find(t => 
      t.category === 'Income' && 
      this.isRecent(t.timestamp, 24) // Last 24 hours
    );

    if (recentIncome) {
      const suggestedSave = Math.round(recentIncome.amount * 0.1); // 10% of salary
      
      tasks.push({
        type: 'celebration',
        priority: 'high',
        category: 'income',
        message: '🎉 Salary received!',
        description: `Great! ₹${recentIncome.amount} credited to your account`,
        suggestion: `Let's save ₹${suggestedSave} (10%) right away before spending starts`,
        action: 'suggest_auto_save',
        data: { 
          incomeAmount: recentIncome.amount, 
          suggestedSave,
          autoSaveEnabled: savings?.autoSave?.enabled 
        }
      });
    }

    return tasks;
  }

  /**
   * Rule 3: Detect upcoming bills
   */
  detectUpcomingBills(transactions) {
    const tasks = [];
    const recurringPayments = this.findRecurringPayments(transactions);

    recurringPayments.forEach(payment => {
      const daysSinceLastPayment = this.daysSince(payment.lastDate);
      const expectedCycle = payment.cycle; // days

      if (daysSinceLastPayment >= expectedCycle - 3) {
        tasks.push({
          type: 'reminder',
          priority: 'medium',
          category: 'bill_due',
          message: `Bill reminder: ${payment.description}`,
          description: `Your ${payment.description} of ₹${payment.amount} is due in ${expectedCycle - daysSinceLastPayment} days`,
          suggestion: `Should I reserve ₹${payment.amount} to avoid low balance?`,
          action: 'reserve_for_bill',
          data: payment
        });
      }
    });

    return tasks;
  }

  /**
   * Rule 4: Check goal progress
   */
  checkGoalProgress(goals) {
    const tasks = [];

    goals.forEach(goal => {
      const daysLeft = this.daysUntil(goal.deadline);
      const progressPercent = (goal.current / goal.target) * 100;
      const expectedProgress = this.calculateExpectedProgress(goal);

      // Behind on goal
      if (progressPercent < expectedProgress - 10) {
        const shortfall = goal.target - goal.current;
        const dailyNeeded = Math.round(shortfall / daysLeft);

        tasks.push({
          type: 'alert',
          priority: 'medium',
          category: 'goal_behind',
          message: `Goal alert: ${goal.name}`,
          description: `You're ${Math.round(expectedProgress - progressPercent)}% behind on your ${goal.name} goal`,
          suggestion: `Save ₹${dailyNeeded}/day to reach ₹${goal.target} by deadline`,
          action: 'boost_goal_savings',
          data: { goal, dailyNeeded, shortfall }
        });
      }

      // Milestone reached
      if (progressPercent >= 25 && progressPercent < 30 && !goal.milestone25) {
        tasks.push({
          type: 'celebration',
          priority: 'low',
          category: 'goal_milestone',
          message: `${goal.emoji || '🎯'} 25% milestone reached!`,
          description: `Great job! You've saved ₹${goal.current} towards your ${goal.name}`,
          suggestion: 'Keep going! You\'re on track',
          action: 'celebrate_milestone',
          data: { goal, milestone: 25 }
        });
      }
    });

    return tasks;
  }

  /**
   * Rule 5: Emergency fund check
   */
  checkEmergencyFund(savings, userProfile) {
    const tasks = [];
    const emergency = savings?.emergency || { current: 0, target: 5000 };
    const monthlyIncome = userProfile?.monthlyIncome || 15000;
    const recommendedEmergency = monthlyIncome * 3; // 3 months income

    if (emergency.current < recommendedEmergency * 0.5) {
      tasks.push({
        type: 'advice',
        priority: 'high',
        category: 'emergency_fund',
        message: 'Emergency fund too low',
        description: `Your emergency fund is ₹${emergency.current}, but you should have at least ₹${Math.round(recommendedEmergency * 0.5)} (1.5 months income)`,
        suggestion: `Try to save ₹50/day to build a safety cushion`,
        action: 'boost_emergency_fund',
        data: { current: emergency.current, recommended: recommendedEmergency }
      });
    }

    return tasks;
  }

  /**
   * Rule 6: Detect unused subscriptions
   */
  detectSubscriptionWaste(transactions) {
    const tasks = [];
    const subscriptions = transactions.filter(t => 
      t.category === 'Subscriptions' && this.isRecent(t.timestamp, 60)
    );

    if (subscriptions.length > 3) {
      const totalCost = subscriptions.reduce((sum, s) => sum + s.amount, 0);
      tasks.push({
        type: 'advice',
        priority: 'medium',
        category: 'subscription_waste',
        message: 'Too many subscriptions',
        description: `You have ${subscriptions.length} active subscriptions costing ₹${totalCost}/month`,
        suggestion: 'Review and cancel unused ones to save money',
        action: 'review_subscriptions',
        data: { subscriptions, totalCost }
      });
    }

    return tasks;
  }

  /**
   * Rule 7: Large purchase warning
   */
  detectLargePurchases(transactions) {
    const tasks = [];
    const largePurchase = transactions.find(t => 
      t.amount > 2000 && 
      t.type === 'debit' && 
      this.isRecent(t.timestamp, 1) // Last 1 hour
    );

    if (largePurchase) {
      tasks.push({
        type: 'reflection',
        priority: 'medium',
        category: 'large_purchase',
        message: 'Large purchase detected',
        description: `You just spent ₹${largePurchase.amount} on ${largePurchase.description}`,
        suggestion: 'Was this planned? Should I help you adjust your budget?',
        action: 'review_large_purchase',
        data: largePurchase
      });
    }

    return tasks;
  }

  /**
   * Rule 8: Check savings streak
   */
  checkSavingsStreak(savings) {
    const tasks = [];
    const streak = savings?.streak || 0;

    if (streak >= 7) {
      tasks.push({
        type: 'celebration',
        priority: 'low',
        category: 'savings_streak',
        message: `🔥 ${streak}-day savings streak!`,
        description: 'You\'ve been consistently saving. Amazing!',
        suggestion: 'Keep it up! Consistency is the key to wealth',
        action: 'celebrate_streak',
        data: { streak }
      });
    }

    return tasks;
  }

  // Helper functions
  isRecent(timestamp, hours) {
    const txnDate = new Date(timestamp);
    const now = new Date();
    const diffHours = (now - txnDate) / (1000 * 60 * 60);
    return diffHours <= hours;
  }

  daysSince(date) {
    const then = new Date(date);
    const now = new Date();
    return Math.floor((now - then) / (1000 * 60 * 60 * 24));
  }

  daysUntil(date) {
    const future = new Date(date);
    const now = new Date();
    return Math.floor((future - now) / (1000 * 60 * 60 * 24));
  }

  calculateExpectedProgress(goal) {
    const startDate = new Date(goal.createdAt || Date.now());
    const endDate = new Date(goal.deadline);
    const now = new Date();
    
    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const daysPassed = (now - startDate) / (1000 * 60 * 60 * 24);
    
    return (daysPassed / totalDays) * 100;
  }

  findRecurringPayments(transactions) {
    // Simplified: Detect patterns in transaction descriptions
    const recurring = [];
    const seen = new Map();

    transactions.forEach(txn => {
      const key = txn.description?.toLowerCase().trim();
      if (seen.has(key)) {
        seen.get(key).push(txn);
      } else {
        seen.set(key, [txn]);
      }
    });

    // Find transactions that repeat
    seen.forEach((txns, description) => {
      if (txns.length >= 2) {
        const lastTxn = txns[txns.length - 1];
        const prevTxn = txns[txns.length - 2];
        
        const cycle = this.daysSince(prevTxn.timestamp);
        
        if (cycle >= 25 && cycle <= 35) { // Monthly pattern
          recurring.push({
            description,
            amount: lastTxn.amount,
            lastDate: lastTxn.timestamp,
            cycle: 30
          });
        }
      }
    });

    return recurring;
  }
}

module.exports = new RulesEngine();
