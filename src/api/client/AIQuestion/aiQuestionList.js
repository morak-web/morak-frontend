import apiClient from '../../client';

// 4. [GET] /api/projects/{projectId}/ai/questions/tree
export const getAIQuestionList = async (projectId) => {
  try {
    const { data } = await apiClient.get(
      `/api/projects/${projectId}/ai/questions/tree`
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
