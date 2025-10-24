import apiClient from '../client';

// [GET] /api/projects/{projectId}/results?phase={phase}
export const getResultFile = async (projectId, phase) => {
  try {
    const { data } = await apiClient.get(
      `/api/projects/${projectId}/results?phase=${encodeURIComponent(phase)}`
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
