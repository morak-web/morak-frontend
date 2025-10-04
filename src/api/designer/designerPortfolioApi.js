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

// \[POST] /api/designers/{designerId}/portfolios
export const postDesignerPortfolio = async (
  designerId,
  { title, description, tags, file },
  options = {}
) => {
  try {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('tags', tags);
    fd.append('file', file);
    const { data } = await apiClient.post(
      `/api/designers/${designerId}/portfolios`,
      fd,
      { ...options }
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// \[PATCH] /api/designers/{designerId}/portfolios/{portfolioId}
export const patchDesignerPortfolio = async (
  designerId,
  portfolioId,
  payload
) => {
  try {
    const { data } = await apiClient.patch(
      `/api/designers/${designerId}/portfolios/${portfolioId}`,
      payload
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// \[DELETE] /api/designers/{designerId}/portfolios/{portfolioId}
export const deleteDesignerPortfolio = async (designerId, portfolioId) => {
  try {
    const { data } = await apiClient.delete(
      `/api/designers/${designerId}/portfolios/${portfolioId}`
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
