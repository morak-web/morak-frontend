import apiClient from '../../client';

// [POST] /api/projects/{projectId}/feedback
export const createClientFeedback = async (projectId, payload) => {
  try {
    const { data } = await apiClient.post(
      `/api/projects/${projectId}/feedback`,
      payload
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
