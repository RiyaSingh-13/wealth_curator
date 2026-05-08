const AlertsSection = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'warning':
        return { bg: 'bg-yellow-50', border: 'border-l-4 border-yellow-500', text: 'text-yellow-800', icon: '⚠️', darkBg: 'dark:bg-yellow-900/20', darkText: 'dark:text-yellow-300' };
      case 'info':
        return { bg: 'bg-blue-50', border: 'border-l-4 border-blue-500', text: 'text-blue-800', icon: 'ℹ️', darkBg: 'dark:bg-blue-900/20', darkText: 'dark:text-blue-300' };
      case 'success':
        return { bg: 'bg-green-50', border: 'border-l-4 border-green-500', text: 'text-green-800', icon: '✅', darkBg: 'dark:bg-green-900/20', darkText: 'dark:text-green-300' };
      default:
        return { bg: 'bg-gray-50', border: 'border-l-4 border-gray-500', text: 'text-gray-800', icon: '📌', darkBg: 'dark:bg-gray-800', darkText: 'dark:text-gray-300' };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🔔</span>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Alerts</h2>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const styles = getSeverityStyles(alert.severity);
          return (
            <div key={alert.id} className={`${styles.bg} ${styles.border} rounded-r-lg p-3 flex items-start gap-3 ${styles.darkBg}`}>
              <span className="text-xl">{styles.icon}</span>
              <p className={`${styles.text} text-sm flex-1 ${styles.darkText}`}>{alert.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsSection;