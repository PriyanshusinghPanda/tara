/**
 * Task Scheduler - Runs agent periodically for all users
 * This enables proactive, time-based notifications
 */

const agent = require('./financeAgent');

class TaskScheduler {
  constructor() {
    this.scheduledTasks = new Map();
    this.isRunning = false;
  }

  /**
   * Start the scheduler
   * In production, use a proper cron library like 'node-cron'
   */
  start() {
    if (this.isRunning) {
      console.log('⏰ Scheduler already running');
      return;
    }

    this.isRunning = true;
    console.log('⏰ Task Scheduler started');

    // Run every hour (for demo - adjust as needed)
    this.hourlyTask = setInterval(() => {
      this.runHourlyCheck();
    }, 60 * 60 * 1000); // 1 hour

    // Run daily at 9 AM (simulated)
    this.dailyTask = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 9) {
        this.runDailyCheck();
      }
    }, 60 * 60 * 1000); // Check every hour

    // Run weekly on Monday
    this.weeklyTask = setInterval(() => {
      const now = new Date();
      if (now.getDay() === 1 && now.getHours() === 9) {
        this.runWeeklyCheck();
      }
    }, 60 * 60 * 1000);
  }

  /**
   * Stop the scheduler
   */
  stop() {
    if (!this.isRunning) return;
    
    clearInterval(this.hourlyTask);
    clearInterval(this.dailyTask);
    clearInterval(this.weeklyTask);
    
    this.isRunning = false;
    console.log('⏰ Task Scheduler stopped');
  }

  /**
   * Run hourly checks (bill reminders, large purchases)
   */
  async runHourlyCheck() {
    console.log('⏰ Running hourly check...');
    
    const users = await this.getAllUsers();
    
    for (const user of users) {
      try {
        const userData = await this.getUserData(user.id);
        const result = await agent.runAgent(userData);
        
        if (result.insights.length > 0) {
          await this.sendNotifications(user.id, result.insights);
        }
      } catch (error) {
        console.error(`Error processing user ${user.id}:`, error);
      }
    }
  }

  /**
   * Run daily checks (savings streak, goal progress)
   */
  async runDailyCheck() {
    console.log('⏰ Running daily check (9 AM)...');
    
    const users = await this.getAllUsers();
    
    for (const user of users) {
      try {
        const userData = await this.getUserData(user.id);
        const result = await agent.runAgent(userData);
        
        // Filter for daily-relevant insights
        const dailyInsights = result.insights.filter(i => 
          ['savings_streak', 'goal_progress', 'emergency_fund'].includes(i.category)
        );
        
        if (dailyInsights.length > 0) {
          await this.sendNotifications(user.id, dailyInsights);
        }
      } catch (error) {
        console.error(`Error processing user ${user.id}:`, error);
      }
    }
  }

  /**
   * Run weekly checks (spending summary, category analysis)
   */
  async runWeeklyCheck() {
    console.log('⏰ Running weekly check (Monday 9 AM)...');
    
    const users = await this.getAllUsers();
    
    for (const user of users) {
      try {
        const userData = await this.getUserData(user.id);
        const result = await agent.runAgent(userData);
        
        // Generate weekly summary
        const weeklyReport = this.generateWeeklyReport(userData);
        
        await this.sendNotifications(user.id, [
          {
            type: 'weekly_summary',
            result: {
              title: 'Your Week in Money',
              message: weeklyReport.summary,
              icon: '📊'
            }
          }
        ]);
      } catch (error) {
        console.error(`Error processing user ${user.id}:`, error);
      }
    }
  }

  /**
   * Send notifications (mock - replace with real push notification service)
   */
  async sendNotifications(userId, insights) {
    console.log(`📬 Sending ${insights.length} notifications to user ${userId}`);
    
    // In production, integrate with:
    // - Firebase Cloud Messaging (FCM)
    // - OneSignal
    // - Push notification service
    
    insights.forEach(insight => {
      console.log(`  → ${insight.result.title}: ${insight.result.message}`);
    });
    
    // Store notifications in database for user to see later
    await this.storeNotifications(userId, insights);
  }

  /**
   * Generate weekly report
   */
  generateWeeklyReport(userData) {
    const transactions = userData.transactions || [];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const weekTransactions = transactions.filter(t => 
      new Date(t.timestamp) > weekAgo
    );
    
    const spent = weekTransactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const earned = weekTransactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const saved = earned - spent;
    
    return {
      summary: `You spent ₹${spent} and ${saved > 0 ? `saved ₹${saved}` : `overspent by ₹${Math.abs(saved)}`} this week`,
      spent,
      earned,
      saved
    };
  }

  /**
   * Mock functions (replace with actual database calls)
   */
  async getAllUsers() {
    // In production, fetch from database
    return [
      { id: 'user_001', phone: '9876543210' }
    ];
  }

  async getUserData(userId) {
    // In production, fetch from database
    // For now, return mock data
    return {
      userId,
      profile: { monthlyIncome: 15000 },
      transactions: [],
      savings: { emergency: { current: 1250, target: 5000 } },
      goals: []
    };
  }

  async storeNotifications(userId, insights) {
    // In production, store in database
    console.log(`💾 Stored ${insights.length} notifications for user ${userId}`);
  }
}

// Export singleton instance
const scheduler = new TaskScheduler();

module.exports = scheduler;
