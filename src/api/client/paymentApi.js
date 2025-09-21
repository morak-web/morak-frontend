import apiClient from '../client';

// [GET] /api/payments/my
export const getPayment = async () => {
  try {
    const { data } = await apiClient.get('/api/payments/my');
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
