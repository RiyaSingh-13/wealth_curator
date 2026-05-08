// src/services/mockData.js

// Simulate network delay (jaise real API ho)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Main dashboard data jo UI mein dikhega
export const fetchDashboardData = async () => {
  // 1 second ka delay – loading state dekhne ke liye
  await delay(1000);

  // Return mock data exactly as required by the design
  return {
    // Summary cards ke liye
    netWorth: 24500,
    spending: 3200,
    savings: 8450,
    
    // AI Insights (mock – baad mein dynamic kar denge)
    insights: [
      "Your tech exposure increased by 14% – consider diversifying into value stocks.",
      "You can save $180 annually by removing duplicate subscriptions (Netflix, Prime, Disney+).",
      "You saved 12% more than last month. Ready for a new investment?"
    ],
    
    // Alerts section
    alerts: [
      { id: 1, message: "Entertainment threshold: 90% used ($450/$500)", severity: "warning" },
      { id: 2, message: "Dining anomaly: Spending at 'The Oak Room' is 20% higher than average", severity: "info" },
      { id: 3, message: "Subscription renewed: Bloomberg Terminal auto-paid", severity: "success" }
    ],
    
    // Recent transactions (table ke liye)
    transactions: [
      { id: 1, name: "The Artisanal Kitchen", amount: 42.50, category: "Food", date: "2025-06-12", status: "completed" },
      { id: 2, name: "City Electric Co.", amount: 120.00, category: "Bills", date: "2025-06-10", status: "completed" },
      { id: 3, name: "Spotify Subscription", amount: 15.99, category: "Subscription", date: "2025-06-09", status: "completed" },
      { id: 4, name: "Whole Foods Market", amount: 89.37, category: "Groceries", date: "2025-06-08", status: "completed" },
      { id: 5, name: "Uber Ride", amount: 24.50, category: "Transport", date: "2025-06-07", status: "completed" }
    ],
    
    // Spending breakdown (chart ke liye)
    spendingBreakdown: [
      { category: "Housing", amount: 2200, percentage: 35 },
      { category: "Food", amount: 800, percentage: 28 },
      { category: "Investing", amount: 650, percentage: 22 },
      { category: "Utilities", amount: 300, percentage: 10 },
      { category: "Leisure", amount: 250, percentage: 5 }
    ]
  };
};

// Optional: Individual API calls agar baad mein chahiye
export const fetchTransactions = async () => {
  await delay(500);
  const data = await fetchDashboardData();
  return data.transactions;
};

export const fetchSummary = async () => {
  await delay(300);
  const data = await fetchDashboardData();
  return {
    netWorth: data.netWorth,
    spending: data.spending,
    savings: data.savings
  };
};