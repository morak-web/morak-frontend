import apiClient from '../client';

// [GET] /api/designers/{designerId}/portfolios
export const getDesignerPortfolio = async (designerId) => {
  try {
    const { data } = await apiClient.get(
      `/api/designers/${designerId}/portfolios`
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
