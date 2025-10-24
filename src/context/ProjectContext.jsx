// ProjectContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import { getProjectDetail } from '../api/client/projectDetailApi';
import { getProjectList } from '../api/client/projectListApi';
import { getResultFile } from '../api/client/resultFileApi';
import {
  createProject,
  submitNewProject,
} from '../api/client/createProjectApi';
import { createClientFeedback } from '../api/client/ProjectList/FeedbackRegister';
import { getAIQuestionList } from '../api/client/AIQuestion/aiQuestionList';
import { createResponseAIQuestion } from '../api/client/AIQuestion/responseAiQuestion';
import {
  applyDesignerList,
  approveApply,
} from '../api/client/applyDesignerListApi';

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [projectDetail, setProjectDetail] = useState(null);
  const [projectList, setProjectList] = useState([]);
  const [listVersion, setListVersion] = useState(0); // ✅ 목록 무효화 트리거
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [midResultFile, setMidResultFile] = useState('');
  const [finalResultFile, setFinalResultFile] = useState('');

  const [currentData, setCurrentData] = useState(null);
  const [responseData, setReponseData] = useState(null);

  const [midFeedback, setMidFeedback] = useState(null);
  const [finalFeedback, setFinalFeedback] = useState(null);

  const [AIQuestionList, setAIQuestionList] = useState(null);
  const [AIResponse, setAIResponse] = useState(null);

  const [applyDesigner, setApplyDesigner] = useState(null);

  const removeFromProjectListById = useCallback((targetId) => {
    setProjectList((prev) =>
      Array.isArray(prev)
        ? prev.filter((p) => String(p?.id ?? p?.projectId) !== String(targetId))
        : prev
    );
  }, []);

  // ---------- GET ----------
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

  const fetchProjectList = useCallback(async (status) => {
    if (!status) return null;
    setLoading(true);
    setError(null);
    try {
      const data = await getProjectList(status);
      setProjectList(Array.isArray(data) ? data : []);
      return data;
    } catch (e) {
      setError(e);
      setProjectList([]);
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

  const fetchAIQuestionList = useCallback(async (projectId) => {
    try {
      const data = await getAIQuestionList(projectId);
      setAIQuestionList(data);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

  const fetchApplyDesigner = useCallback(async (projectId) => {
    try {
      const data = await applyDesignerList(projectId);
      setApplyDesigner(data);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

  // ---------- POST ----------
  const approveDesignerApply = useCallback(async (projectId, applicationId) => {
    try {
      const data = await approveApply(projectId, applicationId);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

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
      setError(e);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createFeedback = useCallback(async (projectId, payload) => {
    try {
      const data = await createClientFeedback(projectId, payload);
      if (payload?.phase === 'MID') setMidFeedback(data);
      if (payload?.phase === 'FINAL') setFinalFeedback(data);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

  const createResponse = useCallback(async (projectId, payload) => {
    try {
      const data = await createResponseAIQuestion(projectId, payload);
      setAIResponse(payload);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

  // ---------- PATCH ----------
  // A) 기존 함수: 제출 후 컨텍스트 목록에서 제거
  const patchNewProject = useCallback(
    async (projectId) => {
      try {
        const updated = await submitNewProject(projectId);
        removeFromProjectListById(projectId);
        // 목록 리패치 트리거
        setListVersion((v) => v + 1);
        return updated;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    [removeFromProjectListById]
  );

  // B) 새로운 편의 함수(권장): 제출 + 동기화 (RequirementSummaryPage에서 이걸 우선 사용)
  const submitAndSync = useCallback(
    async (projectId) => {
      const res = await patchNewProject(projectId); // 위 로직 재사용
      return res;
    },
    [patchNewProject]
  );

  const resetProject = useCallback(() => {
    setProjectDetail(null);
    setError(null);
    setLoading(false);
  }, []);

  const value = {
    loading,
    error,
    // Detail
    projectDetail,
    fetchProjectDetail,
    resetProject,
    // List
    projectList,
    setProjectList,
    listVersion, // ✅ 목록 리패치 트리거 노출
    fetchProjectList,
    // files
    midResultFile,
    finalResultFile,
    fetchResultFile,
    // create project
    create,
    currentData,
    responseData,
    // feedback
    createFeedback,
    midFeedback,
    finalFeedback,
    // AI QnA
    fetchAIQuestionList,
    AIQuestionList,
    createResponse,
    AIResponse,
    // designers
    fetchApplyDesigner,
    applyDesigner,
    approveDesignerApply,
    // submit
    patchNewProject,
    submitAndSync, // ✅ 추가
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
