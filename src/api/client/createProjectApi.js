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
