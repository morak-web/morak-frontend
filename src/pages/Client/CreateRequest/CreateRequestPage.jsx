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
    userRequirements: '',
    dueDate: '',
    budgetEstimate: '',
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
      userRequirements: formData.userRequirements,
      dueDate: formData.dueDate,
      budgetEstimate: Number(formData.budgetEstimate),
    });
    alert('제출 성공!');
    setFormData({
      categoryId: '',
      userRequirements: '',
      dueDate: '',
      budgetEstimate: '',
    });
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
            userRequirements: formData.userRequirements,
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
