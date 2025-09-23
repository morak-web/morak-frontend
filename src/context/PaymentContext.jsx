import { createContext, useContext, useState, useCallback } from 'react';
import { getPayment } from '../api/client/paymentApi';
import { createPayment } from '../api/client/createPaymentApi';

const PaymentContext = createContext(null);

export function PaymentProvider({ children }) {
  // 결제 내역
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET - 결제 내역
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
  }, []);

  // POST - 결제 생성
  const createdPayment = useCallback(async (payload) => {
    try {
      const data = await createPayment(payload);
      return data;
    } catch (e) {
      console.error(e);
    }
  });
  const value = { payment, fetchPayment, loading, error, createdPayment };
  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
}

export function usePayment() {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error('usePayment must be used within a ProjectProvider');
  return ctx;
}
