import apiClient from '../client';

//  [GET] /api/projects/my/applications?status={status}
export const getApplyProjectList = async (status) => {
  try {
    const { data } = await apiClient.get(`/api/projects/my/applications`, {
      params: { status },
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
