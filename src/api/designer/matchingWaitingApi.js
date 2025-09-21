import apiClient from '../client';

// [GET] /api/projects/matching
export const getMatchingWaiting = async () => {
  try {
    const { data } = await apiClient.get('/api/projects/matching');
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
