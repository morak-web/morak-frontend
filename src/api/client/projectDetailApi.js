import apiClient from '../client';

// [GET] /api/projects/{projectId}
export const getProjectDetail = async (projectId) => {
  try {
    const { data } = await apiClient.get(
      `/api/projects/${encodeURIComponent(projectId)}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
