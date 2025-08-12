/** @ts-check */

import { RequestListMocks } from '../../../mocks/RequestListMocks';
import AIBtn from '../../../assets/RequestList/btn-style.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MATCHING_AND_COMPLETE_BTN = [
  '의뢰 상세',
  'AI 피드백',
  '중간 결과 / 피드백',
  '최종 결과',
];

/**
 * @typedef {keyof typeof RequestListMocks} StateKey
 */

/**
 * @param {{ state: StateKey }} props
 */

export default function MatchingInput({ state, selectedButtonClick }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[24px]">
      {RequestListMocks[state].map((item) => (
        <div
          key={item.id}
          className="w-[100%] py-[30px] bg-[#F7F8FC] rounded-[30px] flex"
        >
          <div className="w-[38%]">
            {(state === 'doing' || state === 'complete') && (
              <div className=" w-[100%] h-[100%] flex flex-col  justify-between items-center border-r-[1px] border-[#D9D9D9]">
                <div className="flex gap-[20px]">
                  <img
                    src={item.profile}
                    alt="profile"
                    className="w-[53px] h-[53px] mb-[11px]"
                  />
                  <div className="flex flex-col gap-[7px]">
                    <h1 className="text-[14px] font-light">
                      <span className="text-[17px] font-semibold">
                        {item.designer.name}
                      </span>{' '}
                      님과의 프로젝트
                    </h1>
                    <div className="flex px-[3px] gap-[10px]">
                      {item.field.map((item) => (
                        <div
                          key={item}
                          className=" px-[12px] h-[14px] text-[9px] text-[#525466] bg-white rounded-[3px] "
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[13px] text-[#525466] whitespace-pre-line mb-[13px] text-center px-[18%]">
                  {item.description}
                </p>
                <Link
                  onClick={() => selectedButtonClick(item.id, '포트폴리오')}
                  className="w-[70%] h-[38px] bg-[#DFE1ED] rounded-[19px] text-[#525466] text-[15px] font-semibold flex justify-center items-center"
                >
                  포트폴리오 보기
                </Link>
              </div>
            )}
          </div>
          <div className="w-[60%] min-h-[100%] px-[24px] flex flex-col">
            <div className="mb-[10px]">
              <h1 className="text-[#525466] text-[14px] font-semibold mb-[7px]">
                프로젝트 카테고리
              </h1>
              <div className="flex gap-[7px] text-[13px] text-[#525466] px-[6px]">
                {item.category.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
            <div className="mb-[20px]">
              <h1 className="text-[#525466] text-[14px] font-semibold mb-[7px]">
                요구사항 요약
              </h1>
              <p className="text-[13px] text-[#525466] px-[6px]">
                {item.summary}
              </p>
            </div>
            )} )}
          </div>
        </div>
      ))}
    </div>
  );
}
