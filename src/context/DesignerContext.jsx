import { createContext, useContext, useCallback, useState } from 'react';
import { getMatchingWaiting } from '../api/designer/matchingWaitingApi';
import { getDesignerProject } from '../api/designer/designerProjectApi';
import { getDesignerPortfolio } from '../api/designer/designerPortfolioApi';
import { getDesignerInfo } from '../api/designer/designerInfoApi';
import { createDesignerInfo } from '../api/designer/createDesignerInfoApi';
import { submitResultFile } from '../api/designer/submitResultFile';

const DesignerContext = createContext(null);

export function DesignerProvider({ children }) {
  // -----------[GET]--------------
  // matching 대기
  const [matchingWaitingList, setMatchingWaitingList] = useState([]);
  // 작업 중인 프로젝트 목록
  const [workingList, setWorkingList] = useState([]);
  const [completeList, setCompleteList] = useState([]);
  // 디자이너 포트폴리오
  const [designerPortfolio, setDesignerPortfolio] = useState([]);
  // 디자이너 정보
  const [designerInfo, setDesignerInfo] = useState(null);
  // -----------[POST]--------------
  // 디자이너 등록
  const [desginerRegisterInfo, setDesignerRegisterInfo] = useState(null);
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
        return data;
      }
      if (status === 'COMPLETE') {
        const data = await getDesignerProject('COMPLETE');
        setCompleteList(data);
        return data;
      }
    } catch (e) {
      setError(e);
      setWorkingList([]);
      setCompleteList([]);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 디자이너 포트폴리오
  const fetchDesignerPortfolio = useCallback(async (designerId) => {
    if (!designerId) return null;
    setLoading(true);
    setError(false);
    try {
      const data = await getDesignerPortfolio(designerId);
      setDesignerPortfolio(data);
      return data;
    } catch (e) {
      setError(e);
      setDesignerPortfolio([]);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 디자이너 정보
  const fetchDesignerInfo = useCallback(async (id) => {
    if (!id) return;
    setLoading(true);
    setError(false);
    try {
      const data = await getDesignerInfo(id);
      setDesignerInfo(data);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setLoading(false);
    }
  });
  // ----------[POST]-----------------
  // 디자이너 등록
  const createDesignerRegister = useCallback(async (payload) => {
    if (!payload) return;
    setLoading(true);
    setError(null);
    try {
      setDesignerRegisterInfo(payload);
      const data = await createDesignerInfo(payload);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setLoading(false);
    }
  });

  // 디자이너 결과물 제출
  const createResultFile = useCallback(
    async (projectId, { phase, description, file }) => {
      if (!projectId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await submitResultFile(projectId, {
          phase,
          description,
          file,
        });
        return data;
      } catch (e) {
        console.error(e);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const value = {
    loading,
    error,
    // matching 대기
    matchingWaitingList,
    fetchMatchingWaiting,
    // 작업 중인 프로젝트 대기
    workingList,
    completeList,
    fetchDesignerProject,
    // designer portfolio
    designerPortfolio,
    fetchDesignerPortfolio,
    // 디자이너 정보
    fetchDesignerInfo,
    designerInfo,
    // 디자이너 등록
    createDesignerRegister,
    desginerRegisterInfo,
    // 디자이너 결과물 제출
    createResultFile,
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
