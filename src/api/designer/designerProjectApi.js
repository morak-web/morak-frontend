import apiClient from '../client';

// [GET] /api/projects/my/design?status={status}
export const getDesignerProject = async (status) => {
  try {
    const { data } = await apiClient.get('/api/projects/my/design', {
      params: { status },
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
