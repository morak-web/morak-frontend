import MainLayout from '../../../../components/layout/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import arrowIcon from '../../../../assets/RequestList/IntermediateFeedback/arrow-icon.png';
import { useProject } from '../../../../context/ProjectContext';

export default function AIRequestPage() {
  const [responseMessage, setResponseMessage] = useState('');
  const { id } = useParams();
  const [questionId, setQuestionId] = useState(1);
  const {
    fetchAIQuestionList,
    AIQuestionList,
    currentData,
    createResponse,
    AIResponse,
  } = useProject();

  useEffect(() => {
    fetchAIQuestionList(id);
    console.log('AIQuestionList', AIQuestionList);
  }, []);

  const onQuestionSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      questionId: 2,
      answer: responseMessage.trim(),
    };
    try {
      const created = await createResponse(id, payload);
      console.log(AIResponse);
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!responseMessage.trim()) return;
    setResponseMessage('');
  };
  return (
    <MainLayout>
      <div className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] py-[30px] flex items-center">
        <div className=" w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between">
          <h1 className="text-[24px] font-bold flex flex-col mb-[30px]">
            안녕하세요 AI 모락이에요
          </h1>
          {/* chat */}
          <form onSubmit={onQuestionSubmit} className="w-full h-full">
            <div className="bg-white h-[530px] rounded-[15px] pl-[30px] pr-[10px] pt-[20px] pb-[10px] flex flex-col justify-between">
              <div
                className={`h-[480px] pr-[18px] custom-scrollbar overflow-y-auto flex flex-col mb-[10px] gap-[20px]`}
              >
                {AIQuestionList?.map((item, idx) => {
                  return (
                    <div key={idx} className="flex flex-col gap-[20px]">
                      {item.questionId === 1 && (
                        <div className="inline-block bg-[#F7F8FC] px-[14px] py-[11px]  rounded-[12px]  self-start text-[#525466] ">
                          <h1 className="text-[14px] font-medium">
                            모락 AI /{' '}
                            {item?.createdAt.slice(0, 10).replaceAll('-', '.')}
                            {'   '}
                            {item?.createdAt.slice(11, 16)}
                          </h1>
                          <p className="text-[16px]">{item.question}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className=" flex h-[45px] bg-[#EDEFF7] items-center rounded-[35px] px-2">
                <input
                  type="text"
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="w-[95%] h-[50px] rounded-[35px] outline-none px-[10px]"
                />
                <div className="flex gap-[10px]">
                  {/* <button className="w-[24px] h-[24px]">
                        <img src={folderIcon} alt="folderIcon" />
                      </button> */}
                  <button
                    onClick={handleSend}
                    className="w-[24px] h-[24px] cursor-pointer"
                  >
                    <img src={arrowIcon} alt="arrowIcon" />
                  </button>
                </div>
              </div>
            </div>
          </form>
          {/* button */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/request/write')}
              className=" text-[18px] cursor-pointer"
            >
              이전
            </button>
            <button
              type="submit"
              onClick={() => navigate(`/request/requirement-summary/${id}`)}
              className="bg-[#BDCFFF] px-[17px] py-[8px] rounded-[8px] text-[18px] cursor-pointer"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
