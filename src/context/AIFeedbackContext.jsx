import { createContext, useContext, useState, useCallback } from 'react';
import { getAIFeedback } from '../api/client/ProjectList/AIFeedbackApi';

const AIFeedbackContext = createContext(null);

export function AIFeedbackProvider({ children }) {
  const [midAIFeedback, setMidAIFeedback] = useState(null);
  const [finalAIFeedback, setFinalAIFeedback] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const fetchAIFeedback = useCallback(async (projectId, phase) => {
    if (!phase) return null;
    setLoading(true);
    setError(null);
    try {
      if (phase === 'MID') {
        const data = await getAIFeedback(projectId, 'MID');
        setMidAIFeedback(data);
        return data;
      } else if (phase === 'FINAL') {
        const data = await getAIFeedback(projectId, 'FINAL');
        setFinalAIFeedback(data);
        return data;
      }
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    midAIFeedback,
    finalAIFeedback,
    fetchAIFeedback,
    loading,
    error,
  };
  return (
    <AIFeedbackContext.Provider value={value}>
      {children}
    </AIFeedbackContext.Provider>
  );
}

export function useAIFeedback() {
  const ctx = useContext(AIFeedbackContext);
  if (!ctx) throw new Error('useAIFeedback');
  return ctx;
}
