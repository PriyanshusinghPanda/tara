/**
 * Finance Agent - The main AI agent that orchestrates everything
 * This is the "brain + coordinator" of the agentic system
 */

const rulesEngine = require('./rulesEngine');
const actionHandlers = require('./actionHandlers');

class FinanceAgent {
  constructor() {
    this.name = 'PaisoAgent';
    this.version = '1.0.0';
    this.taskHistory = new Map(); // Store executed tasks per user
  }

  /**
   * Main agent execution - analyzes user data and returns actionable insights
   * @param {Object} userData - Complete user financial context
   * @returns {Object} - Agent output with tasks and actions
   */
  async runAgent(userData) {
    const startTime = Date.now();
    
    try {
      // Step 1: Analyze context and generate tasks
      const tasks = rulesEngine.evaluateRules({
        transactions: userData.transactions || [],
        savings: userData.savings || {},
        goals: userData.goals || [],
        userProfile: userData.profile || {}
      });

      // Step 2: Filter out duplicate/recent tasks
      const filteredTasks = this.filterDuplicateTasks(userData.userId, tasks);

      // Step 3: Execute each task through action handlers
      const results = [];
      for (const task of filteredTasks) {
        const result = await actionHandlers.handle(task, userData);
        
        if (result.notify) {
          results.push({
            id: this.generateTaskId(),
            timestamp: new Date().toISOString(),
            task,
            result,
            priority: task.priority,
            category: task.category
          });
        }
      }

      // Step 4: Sort by priority
      const sorted = this.sortByPriority(results);

      // Step 5: Store task history
      this.storeTaskHistory(userData.userId, sorted);

      const executionTime = Date.now() - startTime;

      return {
        success: true,
        agent: {
          name: this.name,
          version: this.version,
          executionTime: `${executionTime}ms`
        },
        insights: sorted,
        summary: this.generateSummary(sorted),
        metadata: {
          totalTasksEvaluated: tasks.length,
          actionableInsights: sorted.length,
          highPriority: sorted.filter(t => t.priority === 'high').length
        }
      };
    } catch (error) {
      console.error('Agent execution error:', error);
      return {
        success: false,
        agent: { name: this.name, version: this.version },
        insights: [],
        error: error.message
      };
    }
  }

  /**
   * Filter duplicate tasks to avoid notification spam
   */
  filterDuplicateTasks(userId, tasks) {
    const history = this.taskHistory.get(userId) || [];
    const recentTasks = history.filter(t => {
      const age = Date.now() - new Date(t.timestamp).getTime();
      return age < 24 * 60 * 60 * 1000; // Last 24 hours
    });

    return tasks.filter(task => {
      // Check if similar task was shown recently
      const isDuplicate = recentTasks.some(recent => 
        recent.task.category === task.category &&
        recent.task.action === task.action
      );
      return !isDuplicate;
    });
  }

  /**
   * Sort tasks by priority
   */
  sortByPriority(tasks) {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return tasks.sort((a, b) => 
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

  /**
   * Store task history for filtering
   */
  storeTaskHistory(userId, tasks) {
    const existing = this.taskHistory.get(userId) || [];
    this.taskHistory.set(userId, [...existing, ...tasks].slice(-50)); // Keep last 50
  }

  /**
   * Generate summary for frontend display
   */
  generateSummary(insights) {
    if (insights.length === 0) {
      return {
        message: "You're doing great! No urgent actions needed.",
        emoji: '✅',
        tone: 'positive'
      };
    }

    const highPriority = insights.filter(i => i.priority === 'high').length;
    
    if (highPriority > 0) {
      return {
        message: `${highPriority} important ${highPriority === 1 ? 'tip' : 'tips'} for you`,
        emoji: '⚡',
        tone: 'urgent'
      };
    }

    return {
      message: `${insights.length} helpful ${insights.length === 1 ? 'suggestion' : 'suggestions'}`,
      emoji: '💡',
      tone: 'helpful'
    };
  }

  /**
   * Generate unique task ID
   */
  generateTaskId() {
    return 'TASK_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Get agent insights for a specific category
   */
  async getInsightsByCategory(userData, category) {
    const fullResult = await this.runAgent(userData);
    return {
      success: true,
      insights: fullResult.insights.filter(i => i.category === category)
    };
  }

  /**
   * Clear task history for user (useful for testing)
   */
  clearHistory(userId) {
    this.taskHistory.delete(userId);
  }
}

module.exports = new FinanceAgent();
