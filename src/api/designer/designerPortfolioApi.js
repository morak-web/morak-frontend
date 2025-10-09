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

// \[POST] /api/designers/portfolios
export const postDesignerPortfolio = async (
  { title, description, tags, file },
  options = {}
) => {
  try {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('tags', tags);
    fd.append('file', file);
    const { data } = await apiClient.post(`/api/designers/portfolios`, fd, {
      ...options,
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// \[PATCH] /api/designers/portfolios/{portfolioId}
export const patchDesignerPortfolio = async (
  portfolioId,
  { title, description, tags, file } = {},
  options = {}
) => {
  try {
    const fd = new FormData();

    // 변경된 것만 append (빈문자열은 초기화 의도로 append 허용)
    if (title !== undefined) fd.append('title', title);
    if (description !== undefined) fd.append('description', description); // '' 허용
    if (tags !== undefined) fd.append('tags', tags); // '' 허용
    if (file instanceof File) fd.append('file', file);

    const { data } = await apiClient.patch(
      `/api/designers/portfolios/${portfolioId}`,
      fd,
      {
        // headers: { 'Content-Type': 'multipart/form-data' }, // 필요시
        ...options,
      }
    );
    return data ?? true;
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
