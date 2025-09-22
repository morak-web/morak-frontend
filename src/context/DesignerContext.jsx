import { createContext, useContext, useCallback, useState } from 'react';
import { getMatchingWaiting } from '../api/designer/matchingWaitingApi';
import { getDesignerProject } from '../api/designer/designerProjectApi';

const DesignerContext = createContext(null);

export function DesignerProvider({ children }) {
  // matching 대기
  const [matchingWaitingList, setMatchingWaitingList] = useState([]);
  // 작업 중인 프로젝트 목록
  const [workingList, setWorkingList] = useState([]);
  const [completeList, setCompleteList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // matching 대기
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

  // 작업 중인 프로젝트 목록
  const fetchDesignerProject = useCallback(async (status) => {
    if (!status) return null;
    setLoading(true);
    setError(null);
    try {
      if (status === 'WORKING') {
        const data = await getDesignerProject('WORKING');
        setWorkingList(data);
      }
      if (status === 'COMPLETE') {
        const data = await getDesignerProject('COMPLETE');
        setCompleteList(data);
      }
      return data;
    } catch (e) {
      setError(e);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  const value = {
    // matching 대기
    matchingWaitingList,
    fetchMatchingWaiting,
    // 작업 중인 프로젝트 대기
    workingList,
    completeList,
    fetchDesignerProject,
    loading,
    error,
  };
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
