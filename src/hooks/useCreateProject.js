import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../api/ClientAPIs';

export default function useCreateProject() {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: (result, variables) => {
      // result: projectId, title
      // variables : body
      const projectId = result?.projectId;
      const statusApi = 'MATCHING';
      if (!projectId) {
        // projectId가 없으면 리스트/상세 시드하지 않음
        return;
      }

      // 상세 캐시 시드(project-detail)
      qc.setQueryData(['project-details', projectId], (prev) => ({
        ...(prev ?? []),
        projectId,
        categoryId: variables?.categoryId,
        title: variables?.title ?? '',
        userRequirements: variables?.userRequirements ?? '',
        status: statusApi,
        createdAt: variables?.createdAt,
        dueDate: variables?.dueDate,
        budgetEstimate: variables?.budgetEstimate,
      }));

      // 목록 캐시 시드 (my-projects)
      qc.setQueryData(['my-projects', statusApi], (old) => {
        const list = Array.isArray(old) ? old : [];
        if (list.some((p) => p.projectId === projectId)) return list;
        const optimisticItem = {
          projectId,
          title: variables?.title ?? '',
          status: statusApi,
          createdAt: variables?.createdAt,
        };
        return [optimisticItem, ...list];
      });
      // qc.invalidateQueries({ queryKey: ['my-projects', statusApi] });

      setTimeout(() => {
        qc.invalidateQueries({ queryKey: ['my-projects', statusApi] });
      }, 500);
    },
  });

  return {
    data: mutation.data,
    error: mutation.error,
    isError: mutation.isError,
    mutateAsync: mutation.mutateAsync,
  };
}
