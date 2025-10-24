import { useEffect, useState } from 'react';
import DesignerPortfolioModal from './Porfolio/DesignerPortfolioModal';
import { useDesigner } from '../../context/DesignerContext';
import { useMyInfo } from '../../context/MyInfoContext';

const STORAGE_KEY = 'designer_register_v1'; // 로컬 초안 저장 키

export default function DesignerRegisterPage() {
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const { fetchMyInfo, myInfo } = useMyInfo();

  // 폼 상태
  const [interestedIn, setInterestedIn] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [intro, setIntro] = useState('');

  // 로컬 복원 완료 여부(가드용)
  const [hydrated, setHydrated] = useState(false);

  // 디자이너 등록 api
  const { desginerRegisterInfo, createDesignerRegister } = useDesigner();

  // --- 유틸: 로컬 저장/복원 ---
  const saveLocal = (draft) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      console.error('Failed to save draft', e);
    }
  };

  const loadLocal = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to load draft', e);
      return null;
    }
  };

  const clearLocal = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear draft', e);
    }
  };

  // 최초 로드: 내 정보 + 로컬 초안 복원
  useEffect(() => {
    fetchMyInfo();

    const saved = loadLocal();
    if (saved) {
      setInterestedIn(saved.interestedIn ?? '');
      setYearsOfExperience(saved.yearsOfExperience ?? '');
      setIntro(saved.intro ?? '');
    }

    // 로컬 복원 완료 플래그 (초기 빈 값으로 덮어쓰기 방지)
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 입력 변경 시 즉시 로컬 스냅샷 저장
  useEffect(() => {
    // 복원 전에는 저장하지 않음(초기 빈 값으로 덮어쓰기 방지)
    if (!hydrated) return;

    const draft = {
      interestedIn,
      yearsOfExperience,
      intro,
      savedAt: new Date().toISOString(),
    };
    saveLocal(draft);
  }, [hydrated, interestedIn, yearsOfExperience, intro]); // 의존성에 hydrated 포함

  const onSubmit = async (e) => {
    e.preventDefault();

    // 빈 문자열/공백 방어
    const payload = {
      name: myInfo?.name?.trim() ?? '',
      interestedIn: interestedIn.trim(),
      yearsOfExperience:
        yearsOfExperience === '' ? 0 : Number(yearsOfExperience),
      intro: intro.trim(),
    };

    try {
      const created = await createDesignerRegister(payload);
      console.log('created:', created, 'ctx:', desginerRegisterInfo);

      // 제출 후에도 폼 값을 남겨두고 싶을 때: 메타데이터만 갱신
      saveLocal({
        ...payload,
        yearsOfExperience: String(payload.yearsOfExperience), // 입력박스는 문자열 유지
        savedAt: new Date().toISOString(),
        lastSubmittedAt: new Date().toISOString(),
      });

      alert('디자이너 정보가 저장되었습니다.');
    } catch (e) {
      console.error(e);
      alert('저장 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.');
      return null;
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-white w-[95%] min-h-[577px] rounded-[11px] px-[36px] py-[26px] flex flex-col justify-between"
      >
        <section className="mb-[40px]">
          <h1 className="text-[20px] text-[#525466] font-semibold">
            디자이너 등록
          </h1>
        </section>

        <div className="w-[100%] h-[400px] px-[5px] sm:px-[20px] flex flex-col justify-between mb-[10px]">
          <div className="flex items-center">
            <h1 className="text-[13px] md:text-[15px] text-[#525466] font-semibold  w-[30%] sm:w-[25%]">
              이름
            </h1>
            <input
              type="text"
              disabled
              value={myInfo?.name ?? ''}
              className="flex items-center w-[70%] md:w-[300px] h-[38px] bg-[#f2f3fa] rounded-[19px] px-[20px] text-[#383946] text-[15px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694]"
            />
          </div>

          <div className="flex items-center">
            <h1 className="text-[13px] md:text-[15px] text-[#525466] font-semibold w-[30%] sm:w-[25%]">
              관심 분야
            </h1>
            <input
              type="text"
              value={interestedIn}
              onChange={(e) => setInterestedIn(e.target.value)}
              placeholder="예) 앱, 웹, 키오스크"
              className="w-[70%] md:w-[300px] h-[38px] bg-[#f2f3fa] rounded-[19px] px-[20px] text-black text-[14px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694] placeholder:text-[14px]"
            />
          </div>

          <div className="flex items-center">
            <h1 className="text-[13px] md:text-[15px] text-[#525466] font-semibold w-[30%] sm:w-[25%]">
              디자인 경력
            </h1>
            <div className="w-[70%] md:w-[300px] h-[38px] bg-[#f2f3fa] rounded-[19px] flex items-center pr-[7px] sm:pr-0 sm:gap-5 pl-[20px] focus-within:border-[1px] focus-within:border-[#d6d6d694]">
              <input
                type="number"
                min="0"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                className="w-[80%] outline-none bg-transparent text-[14px]"
              />
              <p className="text-[#525466] text-[13px] whitespace-nowrap">
                년차
              </p>
            </div>
          </div>

          <div className="flex">
            <h1 className="text-[13px] md:text-[15px] text-[#525466] font-semibold w-[30%] sm:w-[25%]">
              기타 설명
            </h1>
            <div className="flex flex-col gap-[14px] w-[70%] ">
              <textarea
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder="본인 소개, 강점, 선호 분야 등을 적어주세요."
                className="h-[180px] bg-[#F2F3FA] rounded-[19px] resize-none py-[16px] px-[20px] text-black text-[14px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694] placeholder:text-[14px]"
              />
              <button
                type="button"
                className="w-[100%] md:w-[300px] h-[38px] rounded-[19px] shadow-md text-[10px] sm:text-[15px] cursor-pointer text-[#525466]"
                onClick={() => setPortfolioModalOpen(true)}
              >
                포트폴리오 등록하기
              </button>
            </div>
          </div>
        </div>

        <section className="w-[100%] flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              if (!confirm('저장된 초안을 삭제할까요?')) return;
              clearLocal();
              setInterestedIn('');
              setYearsOfExperience('');
              setIntro('');
            }}
            className="text-[13px] text-red-500 underline"
          ></button>

          <button
            type="submit"
            className="cursor-pointer w-[190px] h-[45px] bg-[#bdcfff] text-[16px] rounded-[23px]"
          >
            등록/수정 완료
          </button>
        </section>
      </form>

      <DesignerPortfolioModal
        portfolioModalOpen={portfolioModalOpen}
        onClose={() => setPortfolioModalOpen(false)}
      />
    </>
  );
}
