import apiClient from '../client';

// [POST] /api/projects/{projectId}/apply
export const applyProject = async (projectId, { designerId }) => {
  try {
    const { data } = await apiClient.post(`/api/projects/${projectId}/apply`, {
      designerId,
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
