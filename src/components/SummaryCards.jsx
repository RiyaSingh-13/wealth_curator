import { memo } from 'react';
import { formatCurrency } from '../utils/formatters';

const SummaryCards = ({ netWorth, spending, savings }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Total Net Worth</h3>
          <span className="text-2xl">💰</span>
        </div>
        <p className="text-3xl font-bold text-gray-900 mt-2 dark:text-white">{formatCurrency(netWorth)}</p>
        <div className="mt-3 flex items-center text-sm">
          <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">↑ 12%</span>
          <span className="text-gray-500 ml-2 dark:text-gray-400">vs last month</span>
        </div>
      </div>
      {/* Similarly for spending and savings – add dark classes */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Monthly Spending</h3>
          <span className="text-2xl">💳</span>
        </div>
        <p className="text-3xl font-bold text-gray-900 mt-2 dark:text-white">{formatCurrency(spending)}</p>
        <div className="mt-3 flex items-center text-sm">
          <span className="text-red-600 bg-red-100 px-2 py-0.5 rounded-full dark:bg-red-900/30 dark:text-red-400">↑ 5%</span>
          <span className="text-gray-500 ml-2 dark:text-gray-400">vs last month</span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Total Savings</h3>
          <span className="text-2xl">🏦</span>
        </div>
        <p className="text-3xl font-bold text-gray-900 mt-2 dark:text-white">{formatCurrency(savings)}</p>
        <div className="mt-3 flex items-center text-sm">
          <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">↑ 8%</span>
          <span className="text-gray-500 ml-2 dark:text-gray-400">vs last month</span>
        </div>
      </div>
    </div>
  );
};

export default memo(SummaryCards);