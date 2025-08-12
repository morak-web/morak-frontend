import { useState } from 'react';
import { RequestListMocks } from '../../mocks/RequestListMocks';
import RequestDetailPage from './components/RequestDetailPage';
import RequestDetailNoDesignerPage from './components/RequestDetailNoDesignerPage';
import DesignerPortfolioPage from './components/DesignerPortfolioPage';

export default function RequestListPages() {
  const [selectedButton, setSelectedButton] = useState({
    id: null,
    action: ' ',
  });
  const currentList = RequestListMocks[checkState] || [];
  const selectedRequestDetail = currentList.find(
    (item) => item.id === selectedButton.id
  );

  const selectedButtonClick = (id, action) => {
    setSelectedButton({ id, action });
    if (
      action === '중간 결과 / 피드백' ||
      action === 'AI 피드백' ||
      action === '최종 결과'
    ) {
      setFeedbackModalOpen(true);
    }
  };
  const closeScreen = () => {
    setSelectedButton({ id: null, action: '' });
  };

  return (
    <div>
      {selectedButton.action === '포트폴리오' && (
        <DesignerPortfolioPage
          id={selectedButton.id}
          requestState={checkState}
          closeScreen={closeScreen}
        />
      )}
      {selectedButton.action === '상세' && (
        <RequestDetailNoDesignerPage
          id={selectedButton.id}
          category={selectedRequestDetail.category}
          closeScreen={closeScreen}
        />
      )}
      {selectedButton.action === '의뢰 상세' && (
        <RequestDetailPage
          id={selectedButton.id}
          profile={selectedRequestDetail.profile}
          designer={selectedRequestDetail.designer}
          category={selectedRequestDetail.category}
          closeScreen={closeScreen}
        />
      )}
    </div>
  );
}
