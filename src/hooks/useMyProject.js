import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  projectList,
  projectDetailInquiry,
  changeProjectStatus,
} from '../api/ClientAPIs';

// 프로젝트 리스트 훅
export default function useMyProjectList(status) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['my-projects', status.toUpperCase()],
    queryFn: () => projectList(status.toUpperCase()),
  });
  return { data, isLoading, isError, refetch };
}

export function useMyProjectDetail(projectId) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['project-details', projectId],
    queryFn: () => projectDetailInquiry(projectId),
  });
  return { data, isLoading, isError };
}

// 프로젝트 상태 변경
export function useProjectStatus(projectId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (projectId) => changeProjectStatus(projectId),
    onSuccess: (result) => {
      // result : status
      qc.setQueryData(['project-details', projectId], (prev) => ({
        ...(prev ?? {}),
        status: result?.status,
      }));

      // 2) 기존 status 목록에서 제거
      const allKeys = ['DRAFT', 'MATCHING', 'WORKING', 'COMPLETE'];
      allKeys.forEach((key) => {
        qc.setQueryData(['my-projects', key], (old) => {
          if (!Array.isArray(old)) return old;
          return old.filter((p) => p.projectId !== projectId);
        });
      });

      // 3) 새 status 목록에 prepend (앞에 추가)
      qc.setQueryData(['my-projects', result?.status], (old) => {
        const list = Array.isArray(old) ? old : [];
        // optimistic item
        const optimisticItem = {
          ...(list.find((p) => p.projectId === projectId) ?? {}),
          projectId,
          status: result?.status,
        };
        return [optimisticItem, ...list];
      });
      qc.invalidateQueries({ queryKey: ['my-projects', result?.status] });
    },
  });
}
