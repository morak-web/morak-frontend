import apiClient from '../client';
// [GET] /api/me
export const loginMyInfo = async () => {
  try {
    const { data } = await apiClient.get('/api/me');
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
