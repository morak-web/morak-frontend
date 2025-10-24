import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import YesIcon from '../../../../assets/RequestList/yes-icon.png';
import NoIcon from '../../../../assets/RequestList/no-icon.png';
import approveIcon from '../../../../assets/RequestList/approve-icon.png';
import userIcon from '../../../../assets/user-icon.png';

// api
import { useProject } from '../../../../context/ProjectContext';

export default function ApplyDesignerListCard() {
  const [decisionById, setDecisionById] = useState({});
  const navigate = useNavigate();
  const { id: idParam } = useParams();

  // ⚠️ id는 문자열일 가능성 → 백엔드가 숫자 기대하면 Number로 변환
  const projectId = useMemo(
    () => (idParam ? Number(idParam) : null),
    [idParam]
  );

  // 컨텍스트에서 "지원자 리스트"는 배열 상태로 노출한다고 가정.
  // 함수명과 겹치지 않게 별칭 사용.
  const {
    fetchApplyDesigner,
    applyDesigner: applicantList, // ← 배열 상태라고 가정
    approveDesignerApply,
  } = useProject();

  // ✅ id가 있을 때만, 그리고 id/함수 변경 시 재조회
  useEffect(() => {
    if (!projectId) return;
    fetchApplyDesigner(projectId).catch((e) => {
      console.error('[fetchApplyDesigner] status:', e?.response?.status);
      console.error('[fetchApplyDesigner] data:', e?.response?.data);
    });
  }, [projectId, fetchApplyDesigner]);

  const setDecision = (designerId, v) => {
    setDecisionById((prev) => ({ ...prev, [designerId]: v }));
  };

  if (!projectId) {
    return (
      <div className="w-full h-[470px] flex items-center justify-center text-[#8b90a0]">
        프로젝트 ID가 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full h-[470px] flex flex-col gap-[15px]">
      {(applicantList ?? []).map((item) => {
        const designerId = item?.designerId;
        const applicationId = item?.applicationId;
        const decision = decisionById[designerId] ?? '';

        const handleApprove = async () => {
          try {
            // ✅ 타입 맞추기 (대부분 숫자)
            const res = await approveDesignerApply(
              Number(projectId),
              Number(applicationId)
            );
            console.log('[approveDesignerApply] ok:', res);
            return res;
          } catch (e) {
            console.error(
              '[approveDesignerApply] status:',
              e?.response?.status
            );
            console.error('[approveDesignerApply] data:', e?.response?.data);
            console.error('[approveDesignerApply] sent params:', {
              projectId: Number(projectId),
              applicationId: Number(applicationId),
            });
            alert(
              e?.response?.data?.message ||
                e?.response?.data?.error ||
                '승인 중 오류가 발생했습니다.'
            );
            return null;
          }
        };

        return (
          <div
            key={String(
              item?.applicationId ?? item?.designerId ?? Math.random()
            )}
            className="w-[100%] min-h-[229px] py-[16px] px-[10px] bg-[#F7F8FC] rounded-[30px] flex"
          >
            {/* left content */}
            <div className="w-[50%] py-[20px] px-[6%] flex flex-col items-center border-r-[1px] border-[#D9D9D9]">
              <div className="flex gap-[20px]">
                <img
                  src={userIcon}
                  alt="designerImg"
                  className="w-[53px] h-[53px] mb-[11px]"
                />
                <div className="flex flex-col gap-[5px]">
                  <h1 className="text-[12px] font-light">
                    <span className="text-[15px] font-semibold">
                      {item?.name ?? '이름 미상'}
                    </span>{' '}
                    님과의 프로젝트
                  </h1>
                  <div className="flex gap-[7px]">
                    {(item?.interestedIn ?? '')
                      .split(',')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((chip) => (
                        <div
                          className="text-[#525466] rounded-[3px] text-[10px] bg-white px-[5px] py-[2px]"
                          key={chip}
                        >
                          {chip}
                        </div>
                      ))}
                    <p className="text-[#525466] text-[10px]">
                      {(item?.interestedIn ?? '').split(',').filter(Boolean)
                        .length > 2
                        ? '...'
                        : ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-[#525466] text-[12px] mb-[12px] flex flex-col items-center text-center gap-[10px]">
                <p className="text-[12px] text-[#525466] text-center">
                  {item?.designerIntro ?? ''}
                </p>
              </div>

              <button
                className="text-[#525466] text-[13px] font-semibold bg-[#DFE1ED] py-[10px] rounded-[19px] w-[100%] text-center cursor-pointer"
                onClick={() => {
                  const dId = item?.designerId;
                  if (!dId) return;
                  navigate(`/client-page/designer-portfolio/${dId}`);
                }}
              >
                포트폴리오 보기
              </button>
            </div>

            {/* right content */}
            <div className="flex justify-center items-center w-[50%]">
              {item?.status === 'PENDING' ? (
                decision === '' ? (
                  <div className="flex flex-col gap-[21px]">
                    <h1 className="text-center text-[#525466] text-[13px] font-semibold">
                      이 디자이너의 지원을
                      <br /> 수락할까요?
                    </h1>
                    <div className="flex gap-[75px]">
                      <button
                        type="button"
                        onClick={async () => {
                          setDecision(designerId, 'Y'); // 낙관적
                          const ok = await handleApprove();
                          if (!ok) {
                            // 실패 시 롤백
                            setDecision(designerId, '');
                          }
                        }}
                        className="w-[41px] h-[41px] cursor-pointer"
                      >
                        <img src={YesIcon} alt="YesIcon" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDecision(designerId, 'N')}
                        className="w-[41px] h-[41px] cursor-pointer"
                      >
                        <img src={NoIcon} alt="NoIcon" />
                      </button>
                    </div>
                  </div>
                ) : decision === 'Y' ? (
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
                )
              ) : (
                // PENDING이 아니면 서버 상태로 표시(선택)
                <div className="text-[#525466] text-[13px]">
                  현재 상태: {item?.status ?? '-'}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
