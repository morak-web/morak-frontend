import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../api/ClientAPIs';

export default function useCreateProject() {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-projects'] });
    },
  });
  return {
    data: mutation.data,
    error: mutation.error,
    isError: mutation.isError,
    mutateAsync: mutation.mutateAsync,
  };
}
