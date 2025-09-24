import apiClient from '../client';

// [GET] /api/designers/{디자이너 아이디}
export const getDesignerInfo = async (id) => {
  try {
    const { data } = await apiClient.get(`/api/designers/${id}`);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
