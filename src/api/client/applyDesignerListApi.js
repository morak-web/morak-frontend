import apiClient from '../client';

// 지원한 디자이너 [GET] /api/projects/{projectId}/applicants
export const applyDesignerList = async (projectId) => {
  try {
    const { data } = await apiClient.get(
      `/api/projects/${projectId}/applicants`
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// 요청 승인 [POST]/api/projects/{projectId}/applicants/{applicationId}/approve
export const approveApply = async (projectId, applicationId, payload) => {
  try {
    const { data } = await apiClient.post(
      `/api/projects/${projectId}/applicants/${applicationId}/approve`,
      payload
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
