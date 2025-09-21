import { createContext, useContext, useState, useCallback } from 'react';
import { getPayment } from '../api/client/paymentApi';

const PaymentContext = createContext(null);

export function PaymentProvider({ children }) {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPayment = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPayment();
      setPayment(data);
      return data;
    } catch (e) {
      setError(e);
      setPayment(null);
      return null;
    } finally {
      setLoading(false);
    }
  });
  const value = { payment, fetchPayment, loading, error };
  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
}

export function usePayment() {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error('usePayment must be used within a ProjectProvider');
  return ctx;
}
