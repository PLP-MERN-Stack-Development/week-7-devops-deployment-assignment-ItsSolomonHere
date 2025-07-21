// client/src/hooks/useApi.js
import { useState, useCallback } from 'react';

const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunction(...args);
      setData(response);
      return response; // Return data for optimistic updates or further processing
    } catch (err) {
      setError(err.response?.data || { message: err.message || 'An unknown error occurred' });
      setData(null); // Clear data on error
      throw err; // Re-throw to allow component-level error handling if needed
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { data, loading, error, request, setData }; // setData is useful for optimistic updates
};

export default useApi;