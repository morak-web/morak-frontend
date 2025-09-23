import apiClient from '../client';

// [POST] /api/payments
export const createPayment = async (payload) => {
  try {
    const { data } = await apiClient.post('/api/payments', payload);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
