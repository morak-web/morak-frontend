import { useState } from 'react';

import useCreateProject from '../../../hooks/useCreateProject';

import MainLayout from '../../../components/layout/MainLayout';
import ChooseCategoryPage from '../../request-write/ChooseCategoryPage';
import RequestWritePage from '../../request-write/RequestWritePage';
import AIRequestPage from '../../request-write/AIRequestPage';
import RequirementSummaryPage from '../../request-write/RequirementSummaryPage';
import RequestWriteCompletePage from '../../request-write/RequestWriteCompletePage';
import { useProjectStatus } from '../../../hooks/useMyProject';

export default function CreateRequestPage() {
  const { mutateAsync: submitProject } = useProjectStatus();
  const { mutateAsync } = useCreateProject();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    userRequirements: '',
    createdAt: null,
    dueDate: null,
    budgetEstimate: '',
    status: 'DRAFT',
  });

  const next = () => {
    setStep((s) => s + 1);
  };
  const prev = () => {
    setStep((s) => s - 1);
  };

  const toIsoOrUndefined = (v) => {
    if (!v) return undefined;
    if (v instanceof Date) return v.toISOString();
    return v; // 이미 문자열이면 그대로
  };

  const toNumberOrUndefined = (v) => {
    if (v === '' || v === null || v === undefined) return undefined;
    const n = typeof v === 'number' ? v : Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  const handleSubmit = async () => {
    try {
      const result = await mutateAsync({
        categoryId: Number(formData.categoryId),
        title: formData.title?.trim(),
        userRequirements: formData.userRequirements,
        createdAt: toIsoOrUndefined(formData.createdAt),
        dueDate: toIsoOrUndefined(formData.dueDate),
        budgetEstimate: toNumberOrUndefined(formData.budgetEstimate),
      });
      console.log('📥 서버 응답:', result); // 🔥 응답 확인

      if (result?.projectId) {
        const submitproject = await submitProject(result.projectId);
        console.log('전환완료', submitproject);
      }
      alert('제출 성공!');
      setStep(5);
    } catch (err) {
      console.error('❌ 프로젝트 생성 실패:', err);
    }
  };

  return (
    <MainLayout>
      {step === 1 && (
        <ChooseCategoryPage
          next={next}
          value={formData.categoryId}
          onChange={(val) => setFormData((s) => ({ ...s, categoryId: val }))}
        />
      )}
      {step === 2 && (
        <RequestWritePage
          next={next}
          prev={prev}
          value={{
            title: formData.title,
            userRequirements: formData.userRequirements,
            createdAt: formData.createdAt,
            dueDate: formData.dueDate,
            budgetEstimate: formData.budgetEstimate,
          }}
          onChange={(patch) => setFormData((s) => ({ ...s, ...patch }))}
        />
      )}
      {step === 3 && <AIRequestPage next={next} prev={prev} />}
      {step === 4 && (
        <RequirementSummaryPage
          data={formData}
          prev={prev}
          onSubmit={handleSubmit}
        />
      )}
      {step === 5 && <RequestWriteCompletePage prev={prev} />}
    </MainLayout>
  );
}
