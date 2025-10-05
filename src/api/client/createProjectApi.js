import apiClient from '../client';

// [POST] /api/projects
export const createProject = async (payload) => {
  try {
    const { data } = await apiClient.post('/api/projects', payload);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// [PATCH] /api/projects/{projectId}/submit
export const submitNewProject = async (projectId) => {
  try {
    const { data } = await apiClient.patch(`/api/projects/${projectId}/submit`);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
