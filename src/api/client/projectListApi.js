import apiClient from '../client';

// [GET] /api/projects/my?status={status}
export const getProjectList = async (status) => {
  try {
    const { data } = await apiClient.get('/api/projects/my', {
      params: { status },
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
