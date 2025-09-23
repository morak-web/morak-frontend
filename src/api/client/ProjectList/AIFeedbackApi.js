import apiClient from '../../client';

// [GET] /api/projects/{projectId}/ai-feedback?phase=MID
export const getAIFeedback = async (projectId, phase) => {
  try {
    const { data } = await apiClient.get(
      `/api/projects/${projectId}/ai-feedback/`,
      { params: { phase } }
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
