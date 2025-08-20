import { useQuery } from '@tanstack/react-query';
import { projectList, projectDetailInquiry } from '../api/ClientAPIs';

// 프로젝트 리스트 훅
export default function useMyProjectList(status) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['my-projects', status],
    queryFn: () => projectList(status),
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
