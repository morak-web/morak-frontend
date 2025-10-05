// projectDetail
import { createContext, useContext, useState, useCallback } from 'react';
import { getProjectDetail } from '../api/client/projectDetailApi';
import { getProjectList } from '../api/client/projectListApi';
import { getResultFile } from '../api/client/resultFileApi';
import { createProject } from '../api/client/createProjectApi';
import { createClientFeedback } from '../api/client/ProjectList/FeedbackRegister';
import { getAIQuestionList } from '../api/client/AIQuestion/aiQuestionList';
import { createResponseAIQuestion } from '../api/client/AIQuestion/responseAiQuestion';
import {
  applyDesignerList,
  approveApply,
} from '../api/client/applyDesignerListApi';

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
  // 결과 파일
  const [midResultFile, setMidResultFile] = useState('');
  const [finalResultFile, setFinalResultFile] = useState('');
  // project create
  const [currentData, setCurrentData] = useState(null);
  const [responseData, setReponseData] = useState(null);
  // client feedback
  const [midFeedback, setMidFeedback] = useState(null);
  const [finalFeedback, setFinalFeedback] = useState(null);
  // AI 질문 조회
  const [AIQuestionList, setAIQuestionList] = useState(null);
  // AI 질문에 대한 대답
  const [AIResponse, setAIResponse] = useState(null);
  // 지원한 디자이너 리스트
  const [applyDesigner, setApplyDesigner] = useState(null);

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

  const fetchResultFile = useCallback(async (projectId, phase) => {
    try {
      if (phase === 'MID') {
        const data = await getResultFile(projectId, 'MID');
        setMidResultFile(data);
        return data;
      } else if (phase === 'FINAL') {
        const data = await getResultFile(projectId, 'FINAL');
        setFinalResultFile(data);
        return data;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

  // AI 질문 조회
  const fetchAIQuestionList = useCallback(async (projectId) => {
    try {
      const data = await getAIQuestionList(projectId);
      setAIQuestionList(data);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  });

  // 지원한 디자이너
  const fetchApplyDesigner = useCallback(async (projectId) => {
    try {
      const data = await applyDesignerList(projectId);
      setApplyDesigner(data);
      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  });

  // ----------------------------[ POST ]--------------------------

  // 요청 승인
  const approveDesignerApply = useCallback(async (projectId, applicationId) => {
    try {
      const data = await approveApply(projectId, applicationId);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  });

  // 프로젝트 생성
  const create = useCallback(async (payload) => {
    if (!payload) return null;
    setLoading(true);
    setError(null);
    try {
      const data = await createProject(payload);
      setReponseData(payload);
      setCurrentData(data);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);
  //

  // 클라이언트 피드백
  const createFeedback = useCallback(async (projectId, payload) => {
    try {
      if (payload['phase'] === 'MID') {
        const data = await createClientFeedback(projectId, payload);
        setMidFeedback(data);
        return data;
      } else if (payload['phase'] === 'FINAL') {
        const data = await createClientFeedback(projectId, payload);
        setFinalFeedback(data);
        return data;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  });

  // AI 질문 대답
  const createResponse = useCallback(async (projectId, payload) => {
    try {
      const data = await createResponseAIQuestion(projectId, payload);
      setAIResponse(payload);
      console.log('data', data);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  });

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
    // result file
    midResultFile,
    finalResultFile,
    fetchResultFile,
    // create project
    create,
    currentData,
    responseData,
    // client feedback
    createFeedback,
    midFeedback,
    finalFeedback,
    // AI 질문 조회
    fetchAIQuestionList,
    AIQuestionList,
    // AI 질문 대답
    createResponse,
    AIResponse,
    // 지원한 디자이너 리스트
    fetchApplyDesigner,
    applyDesigner,
    approveDesignerApply,
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
