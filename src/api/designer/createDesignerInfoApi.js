import apiClient from '../client';

// [POST] /api/designers
export const createDesignerInfo = async (payload) => {
  try {
    const { data } = await apiClient.post('/api/designers', payload);
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
