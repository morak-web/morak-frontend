import apiClient from '../../client';

// 5.[POST] /api/projects/{projectId}/ai/answers
export const createResponseAIQuestion = async (projectId, payload) => {
  try {
    const { data } = await apiClient.post(
      `/api/projects/${projectId}/ai/answers`,
      payload
    );

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
