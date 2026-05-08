import { useCallback } from 'react';

export const useAnalytics = () => {
  const trackEvent = useCallback((category, action, label) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      });
    } else {
      console.log(`[GA] ${category} - ${action} - ${label}`);
    }
  }, []);

  return { trackEvent };
};