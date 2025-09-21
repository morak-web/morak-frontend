import apiClient from '../client';

//[POST] /api/projects
export const createNewProject = async () => {
  try {
    const { data } = await apiClient.post('/api/projects', payload);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
