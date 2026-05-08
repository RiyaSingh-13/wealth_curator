import { useAnalytics } from '../hooks/useAnalytics';

const AIInsights = ({ insights }) => {
  const { trackEvent } = useAnalytics();

  if (!insights || insights.length === 0) {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 text-center">
        <p className="text-gray-500">✨ No insights available right now.</p>
      </div>
    );
  }

  const handleApply = (insightText) => {
    trackEvent('CTA', 'click', `Apply: ${insightText.substring(0, 50)}`);
    alert(`Strategy applied: ${insightText}`);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🧠</span>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Strategy</h2>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full ml-2 dark:bg-blue-800 dark:text-blue-100">
          Curated for you
        </span>
      </div>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start justify-between gap-3 p-3 bg-white rounded-lg shadow-sm dark:bg-gray-800">
            <div className="flex items-start gap-3 flex-1">
              <span className="text-lg">💡</span>
              <p className="text-gray-700 text-sm leading-relaxed dark:text-gray-300">{insight}</p>
            </div>
            <button
              onClick={() => handleApply(insight)}
              className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
            >
              Apply →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;