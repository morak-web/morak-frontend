import axios from 'axios';

// 커스텀 axios 생성
const client = axios.create({
  baseURL: '/api', // http://localhost:8080
  withCredentials: true, // 세션/쿠키 기반이면 필수
  headers: { 'Cache-Control': 'no-cache' }, // 304 오류 방지
});

// 1. 프로젝트 생성
export const createProject = async (data) => {
  const res = await client.post('/projects', data, {
    headers: { 'Content-Type': 'application/json' },
  });
};

// 3. 프로젝트 목록 조회
export const projectList = async (status) => {
  try {
    const normalized = status ? String(status).toUpperCase() : undefined;
    const res = await client.get('/projects/my', {
      params: normalized ? { status: normalized } : {},
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

// 프로젝트 상세 조회
export const projectDetailInquiry = async (projectId) => {
  try {
    const res = await client.get(`/projects/${projectId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
