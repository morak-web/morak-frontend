import { createContext, useContext, useCallback, useState } from 'react';
import { getMatchingWaiting } from '../api/designer/matchingWaitingApi';

const DesignerContext = createContext(null);

export function DesignerProvider({ children }) {
  const [matchingWaitingList, setMatchingWaitingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMatchingWaiting = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMatchingWaiting();
      setMatchingWaitingList(data);
      return data;
    } catch (e) {
      setError(e);
      setMatchingWaitingList(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = { matchingWaitingList, loading, error, fetchMatchingWaiting };
  return (
    <DesignerContext.Provider value={value}>
      {children}
    </DesignerContext.Provider>
  );
}

export function useDesigner() {
  const ctx = useContext(DesignerContext);
  if (!ctx) throw new Error('useProject must be used within a ProjectProvider');
  return ctx;
}
