import { useState } from 'react';
import MatchingInput from './components/MatchingInput';
import { RequestListMocks } from '../../mocks/RequestListMocks';
import RequestDetailPage from './components/RequestDetailPage';
import RequestDetailNoDesignerPage from './components/RequestDetailNoDesignerPage';
import DesignerPortfolioPage from './components/DesignerPortfolioPage';
import IntermediateFeedbackModal from './IntermediateFeedback/IntermediateFeedbackModal';
import AIFeedbackPage from './AIFeedback/AIFeedbackPage';

const STATUS = [
  { title: '작성 중', count: 0 },
  { title: '매칭 중', count: 1 },
  { title: '진행 중', count: 0 },
  { title: '완료', count: 0 },
];

const STATE_BTN = [
  {
    title: '작성 중',
    state: 'writing',
  },
  {
    title: '매칭 중',
    state: 'matching',
  },
  {
    title: '진행 중',
    state: 'doing',
  },
  {
    title: '완료',
    state: 'complete',
  },
];

export default function RequestListPage() {
  const [checkState, setCheckState] = useState('matching');
  const [selectedButton, setSelectedButton] = useState({
    id: null,
    action: ' ',
  });
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

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
      {selectedButton.action === '중간 결과 / 피드백' && (
        <IntermediateFeedbackModal
          feedbackModalOpen={feedbackModalOpen}
          onClose={() => {
            setFeedbackModalOpen(false);
            closeScreen();
          }}
        />
      )}
      {selectedButton.action === 'AI 피드백' && (
        <AIFeedbackPage
          feedbackModalOpen={feedbackModalOpen}
          onClose={() => {
            setFeedbackModalOpen(false);
            closeScreen();
          }}
        />
      )}
      {selectedButton.id === null && (
        <div className="w-[95%] h-[710px] flex flex-col justify-between">
          <div className="flex w-[100%] h-[80px] bg-white rounded-[11px] justify-center py-[13px] 2xl:px-[1px] px-[5px] ">
            {STATUS.map((item, idx) => (
              <div className="flex items-center" key={idx}>
                <h1 className="text-[11px] sm:text-[18px] md:text-[20px] text-[rgba(82,84,102,1)] mr-[7px] sm:mr-[12px] md:mr-[15px] xl:mr-[25px] 2xl:mr-[45px] ">
                  {item.title}
                </h1>
                <h2
                  className={`text-[17px] sm:text-[26px] md:text-[28px] ${item.count > 0 ? 'text-[#687AFE] font-bold ' : 'text-[rgba(195,196,206)] '}`}
                >
                  {item.count}
                </h2>
                {idx < 3 ? (
                  <div className="inline-block w-[1px] h-[42px] bg-[rgba(195,196,206)] mr-[6px] sm:mr-[18px] xl:mr-[25px] 2xl:mr-[40px] ml-[6px] sm:ml-[14px] md:ml-[20px] xl:ml-[25px] 2xl:ml-[40px]" />
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
          <div className="bg-white w-[100%] h-[84%] rounded-[11px]">
            <div className="pl-[28px] pr-[13px] py-[25px] h-[100%] flex flex-col gap-[33px]">
              <div className="flex gap-[10px]">
                {STATE_BTN.map((item) => (
                  <label
                    key={item.title}
                    className="gap-[6px] flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="requestState"
                      value={item.state}
                      className="w-[16px] h-[16px] hidden peer"
                      checked={checkState === item.state}
                      onChange={(e) => setCheckState(e.target.value)}
                    />
                    <span className="block w-[16px] h-[16px] border-[1px] border-[#DFE1ED] rounded-[4px] peer-checked:bg-[#DFE1ED]" />
                    <span className="text-[13px] text-[#525466]">
                      {item.title}
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex flex-col gap-[24px] overflow-y-auto pr-[27px] custom-scrollbar">
                <MatchingInput
                  state={checkState}
                  selectedButtonClick={selectedButtonClick}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
