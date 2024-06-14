import { useEffect, useState } from 'react';
import Purchases from 'react-native-purchases';

export function useCustomerInfo() {
  const [customerInfo, setCustomerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomerInfo = async () => {
    setLoading(true);
    try {
      const info = await Purchases.getCustomerInfo();
      setCustomerInfo(info);
      setError(null);
    } catch (e) {
      setError(e);
      console.log('Error fetching customer info:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerInfo();  // Initial fetch on component mount
  }, []);

  useEffect(() => {
    // Subscribe to purchaser updates
    Purchases.addCustomerInfoUpdateListener(fetchCustomerInfo);
    return () => {
      Purchases.removeCustomerInfoUpdateListener(fetchCustomerInfo);
    };
  }, []);

  return { customerInfo, loading, error };
}
