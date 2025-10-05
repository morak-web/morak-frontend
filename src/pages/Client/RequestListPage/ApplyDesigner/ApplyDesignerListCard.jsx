import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import YesIcon from '../../../../assets/RequestList/yes-icon.png';
import NoIcon from '../../../../assets/RequestList/no-icon.png';
import approveIcon from '../../../../assets/RequestList/approve-icon.png';

// api
import { useProject } from '../../../../context/ProjectContext';

export default function ApplyDesignerListCard() {
  const [decisionById, setDecisionById] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchApplyDesigner, applyDesigner, approveDesignerApply } =
    useProject();
  useEffect(() => {
    fetchApplyDesigner(id);
  }, []);
  const setDecision = (designerId, v) => {
    setDecisionById((prev) => ({ ...prev, [designerId]: v }));
  };

  return (
    <div className="w-full h-[470px] flex flex-col gap-[15px] bg-red-200">
      {applyDesigner?.map((item) => {
        const designerId = item.designerId;
        const decision = decisionById[designerId] ?? '';
        const handleApprove = async () => {
          try {
            const created = await approveDesignerApply(id, item.applicationId);
            console.log(created);
            return created;
          } catch (e) {
            console.error(e);
            return null;
          }
        };
        return (
          <div
            key={item.name}
            className="w-[100%] h-[229px] py-[16px] px-[10px] bg-[#F7F8FC] rounded-[30px] flex"
          >
            {/* left content */}
            <div className="w-[50%] py-[20px] px-[6%] flex flex-col items-center  border-r-[1px] border-[#D9D9D9]">
              {/* <p className="text-[#525466] text-[10px] mb-[21px]">
              지원 시간 : {item.appliedAt.slice(0, 16).replaceAll('T', ' ')}
            </p> */}
              <div className="flex gap-[20px]">
                <img
                  src={item.profileImageUrl}
                  alt="designerImg"
                  className="w-[53px] h-[53px] mb-[11px]"
                />
                <div className="flex flex-col gap-[5px]">
                  <h1 className="text-[12px] font-light">
                    <span className="text-[15px] font-semibold">
                      {item.name}
                    </span>{' '}
                    님과의 프로젝트
                  </h1>{' '}
                  <div className="flex gap-[7px]">
                    {item.interestedIn
                      .split(',')
                      .slice(0, 2)
                      .map((item) => (
                        <div
                          className="text-[#525466] rounded-[3px] text-[10px] bg-white px-[5px] py-[2px]"
                          key={item}
                        >
                          {item}
                        </div>
                      ))}
                    <p className="text-[#525466] text-[10px]">...</p>
                  </div>
                </div>
              </div>
              <div className="text-[#525466] text-[12px] mb-[12px] flex flex-col items-center text-center gap-[10px]">
                <p className="text-[12px] text-[#525466] text-center">
                  {item.designerIntro}
                </p>
              </div>
              <button
                className="text-[#525466] text-[13px] font-semibold bg-[#DFE1ED] py-[10px] rounded-[19px] w-[100%] text-center cursor-pointer"
                onClick={() => {
                  const id = item?.designerId;
                  navigate(`/client-page/designer-portfolio/${id}`);
                }}
              >
                포트폴리오 보기
              </button>
            </div>
            {/* right content */}
            <div className="flex justify-center items-center w-[50%]">
              {item.status === 'PENDING' ? (
                <>
                  {decision === '' ? (
                    <div className="flex flex-col gap-[21px]">
                      <h1 className="text-center text-[#525466] text-[13px] font-semibold">
                        이 디자이너의 지원을
                        <br /> 수락할까요?
                      </h1>
                      <div className="flex gap-[75px]">
                        <button
                          onClick={() => {
                            setDecision(designerId, 'Y');
                            handleApprove();
                          }}
                          className="w-[41px] h-[41px] cursor-pointer"
                        >
                          <img src={YesIcon} alt="YesIcon" />
                        </button>
                        <button
                          onClick={() => setDecision(designerId, 'N')}
                          className="w-[41px] h-[41px] cursor-pointer"
                        >
                          <img src={NoIcon} alt="NoIcon" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {decision === 'Y' ? (
                        <div className="flex flex-col items-center justify-center gap-[5px]">
                          <img
                            src={approveIcon}
                            alt="approveIcon"
                            className="w-[25px] h-[20px]"
                          />
                          <h1 className="text-center text-[#6072FF] text-[20px] font-semibold">
                            승인되었습니다!
                          </h1>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-[21px]">
                          <h1 className="text-center text-[#B0B3C6] text-[20px] font-semibold">
                            거절되었습니다
                          </h1>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
