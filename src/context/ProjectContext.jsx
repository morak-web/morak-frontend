// projectDetail
import { createContext, useContext, useState, useCallback } from 'react';
import { getProjectDetail } from '../api/client/projectDetailApi';
import { getProjectList } from '../api/client/projectListApi';
import { createProject } from '../api/client/createProjectApi';

// 컨텍스트 생성
const ProjectContext = createContext(null);

// Provider 컴포넌트
export function ProjectProvider({ children }) {
  // Project Detail
  const [projectDetail, setProjectDetail] = useState(null);
  // Project List
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // project create
  const [currentData, setCurrentData] = useState(null);
  const [responseData, setReponseData] = useState(null);

  // --------------------[ GET ]------------------------
  // 상세 조회
  const fetchProjectDetail = useCallback(async (projectId) => {
    if (!projectId) return null;
    setLoading(true);
    setError(null);
    try {
      const data = await getProjectDetail(projectId);
      setProjectDetail(data);
      return data;
    } catch (e) {
      setError(e);
      setProjectDetail(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 프로젝트 리스트 item 정보
  const fetchProjectList = useCallback(async (status) => {
    if (!status) return null;
    setLoading(true);
    setError(null);
    try {
      const data = await getProjectList(status);
      setProjectList(data);
      return data;
    } catch (e) {
      setError(e);
      setProjectList(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // ----------------------------[ POST ]--------------------------
  // 프로젝트 생성
  const create = useCallback(async (payload) => {
    if (!payload) return null;
    setLoading(true);
    setError(null);
    try {
      setReponseData(payload);
      const data = await createProject(payload);
      setCurrentData(data);
      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

  const resetProject = useCallback(() => {
    setProjectDetail(null);
    setError(null);
    setLoading(false);
  }, []);

  const value = {
    loading,
    error,
    // Project Detail
    projectDetail,
    fetchProjectDetail,
    resetProject,
    // Project List
    projectList,
    fetchProjectList,
    // create project
    create,
    currentData,
    responseData,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used within a ProjectProvider');
  return ctx;
}
