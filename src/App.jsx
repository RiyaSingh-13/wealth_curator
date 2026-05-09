import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { ActivityIndicator, StyleSheet as RNStyleSheet, View } from 'react-native-web';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ANALYTICS_EVENTS } from './analytics/events';
import { useAnalytics } from './hooks/useAnalytics';

const DashboardScreen = lazy(() =>
  import('./features/dashboard/DashboardScreen').then((m) => ({ default: m.DashboardScreen })),
);

function DashboardRoute() {
  const { track } = useAnalytics();
  return (
    <DashboardErrorBoundary onError={() => track(ANALYTICS_EVENTS.LAZY_CHUNK_ERROR, { chunk: 'DashboardScreen' })}>
      <DashboardScreen />
    </DashboardErrorBoundary>
  );
}

function RouteAnalyticsShell() {
  const location = useLocation();
  const { track } = useAnalytics();

  useEffect(() => {
    track(ANALYTICS_EVENTS.PAGE_VIEW, {
      page_location: `${location.pathname}${location.search}`,
      page_title: 'Wealth Curator Dashboard',
    });
  }, [location.pathname, location.search, track]);

  const fallback = useMemo(
    () => (
      <View style={styles.fallback} accessibilityRole="progressbar">
        <ActivityIndicator color="#c9a962" size="large" />
      </View>
    ),
    [],
  );

  return (
    <Suspense fallback={fallback}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/:section" element={<DashboardRoute />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteAnalyticsShell />
    </BrowserRouter>
  );
}

function DashboardErrorBoundary({ children, onError }) {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = (error, errorInfo) => {
      console.error(error);
      setHasError(true);
      onError?.();
    };

    // Set up error handling
    const originalConsoleError = console.error;
    console.error = (...args) => {
      originalConsoleError(...args);
      if (args[0] instanceof Error) {
        handleError(args[0]);
      }
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, [onError]);

  if (hasError) {
    return (
      <View style={styles.fallback}>
        <ActivityIndicator color="#c9a962" />
      </View>
    );
  }

  return children;
}

const styles = RNStyleSheet.create({
  fallback: {
    flex: 1,
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b0f14',
  },
});
