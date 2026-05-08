// src/hooks/useFetch.js
import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for fetching data
 * @param {Function} fetchFn - async function that returns promise (e.g., fetchDashboardData)
 * @param {Array} deps - dependencies to re-run fetch (like useEffect)
 * @returns {Object} { data, loading, error, refetch }
 */
export const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // To prevent state update if component unmounts
  const isMounted = useRef(true);

  // Function to manually refetch data
  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      if (isMounted.current) {
        setData(result);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.message || "Something went wrong");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    refetch();

    // Cleanup function – component unmount pe flag false karo
    return () => {
      isMounted.current = false;
    };
  }, [...deps]); // Re-run when dependencies change

  return { data, loading, error, refetch };
};