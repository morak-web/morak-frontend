import apiClient from '../client';

// [POST] /api/projects/{projectId}/results
export const submitResultFile = async (
  projectId,
  { phase, description = '', file },
  options = {}
) => {
  try {
    const fd = new FormData();
    fd.append('phase', phase);
    fd.append('description', description);
    fd.append('file', file);
    const { data } = await apiClient.post(
      `/api/projects/${projectId}/results`,
      fd,
      { ...options }
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
