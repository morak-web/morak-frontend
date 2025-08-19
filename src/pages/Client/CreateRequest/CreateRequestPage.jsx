import { useState } from 'react';

import useCreateProject from '../../../hooks/useCreateProject';

import MainLayout from '../../../components/layout/MainLayout';
import ChooseCategoryPage from '../../request-write/ChooseCategoryPage';
import RequestWritePage from '../../request-write/RequestWritePage';
import AIRequestPage from '../../request-write/AIRequestPage';
import RequirementSummaryPage from '../../request-write/RequirementSummaryPage';
import RequestWriteCompletePage from '../../request-write/RequestWriteCompletePage';

export default function CreateRequestPage() {
  const { mutateAsync } = useCreateProject();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    userRequirements: '',
    createdAt: '',
    dueDate: '',
    budgetEstimate: '',
    status: 'DRAFT',
  });

  const next = () => {
    setStep((s) => s + 1);
  };
  const prev = () => {
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    await mutateAsync({
      categoryId: Number(formData.categoryId),
      title: formData.title?.trim(),
      userRequirements: formData.userRequirements,
      createdAt: formData.createdAt,
      dueDate: formData.dueDate,
      budgetEstimate: Number(formData.budgetEstimate),
      status: 'MATCHING',
    });
    alert('제출 성공!');
    setStep(5);
    // setFormData({
    //   categoryId: '',
    //   title: '',
    //   userRequirements: '',
    //   createdAt: '',
    //   dueDate: '',
    //   budgetEstimate: '',
    // });
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
