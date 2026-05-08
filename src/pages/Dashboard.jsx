import { lazy, Suspense, useEffect, useCallback, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useAnalytics } from '../hooks/useAnalytics';
import { fetchDashboardData } from '../services/mockData';
import Header from '../components/Header';
import SummaryCards from '../components/SummaryCards';
import AIInsights from '../components/AIInsights';
import AlertsSection from '../components/AlertsSection';
import TransactionsTable from '../components/TransactionsTable';

const SpendingChart = lazy(() => import('../components/SpendingChart'));

const Dashboard = () => {
  const { data, loading, error, refetch } = useFetch(fetchDashboardData);
  const { trackEvent } = useAnalytics();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    trackEvent('Page', 'view', 'Dashboard');
  }, [trackEvent]);

  const handleSearch = useCallback((query) => {
    trackEvent('Search', 'query', query);
    setSearchQuery(query);
  }, [trackEvent]);

  if (loading) {
    return (
      <>
        <Header onSearch={handleSearch} />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your financial dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header onSearch={handleSearch} />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md text-center">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Unable to load data</h3>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button onClick={refetch} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!data) return null;

  // Filter transactions based on search query
  const filteredTransactions = data.transactions.filter(tx =>
    tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header onSearch={handleSearch} />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Alexander</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <SummaryCards netWorth={data.netWorth} spending={data.spending} savings={data.savings} />
              <AIInsights insights={data.insights} />
              <AlertsSection alerts={data.alerts} />
              <TransactionsTable transactions={filteredTransactions} />
            </div>
            <div className="space-y-6">
              <Suspense fallback={<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center text-gray-500 dark:text-gray-400">Loading chart...</div>}>
                <SpendingChart data={data.spendingBreakdown} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;