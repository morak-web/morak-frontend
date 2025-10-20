import { useState } from 'react';
import DesignerPortfolioModal from './Porfolio/DesignerPortfolioModal';
import { useDesigner } from '../../context/DesignerContext';
import { useMyInfo } from '../../context/MyInfoContext';
import { useEffect } from 'react';

export default function DesignerRegisterPage() {
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const { fetchMyInfo, myInfo } = useMyInfo();
  useEffect(() => {
    fetchMyInfo();
  }, []);
  // 디자이너 등록 api
  const { desginerRegisterInfo, createDesignerRegister } = useDesigner();
  const [interestedIn, setInterestedIn] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [intro, setIntro] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: myInfo?.name,
      interestedIn: interestedIn.trim(),
      yearsOfExperience: Number(yearsOfExperience),
      intro: intro.trim(),
    };
    console.log(payload);
    try {
      const created = await createDesignerRegister(payload);
      console.log(desginerRegisterInfo);
      alert('완료되었습니다!');
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white w-[95%] min-h-[577px] rounded-2xl px-10 py-8 flex flex-col justify-between shadow-lg border border-neutral-100"
    >
      <section className="mb-8">
        <h1 className="text-2xl text-neutral-900 font-bold">
          디자이너 등록
        </h1>
        <p className="text-neutral-600 mt-2">전문 디자이너로 활동하기 위한 정보를 입력해주세요</p>
      </section>
      <div className="w-full flex flex-col gap-6 mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-base text-neutral-900 font-semibold w-32">
            이름
          </h1>
          <input
            type="text"
            disabled={true}
            value={myInfo?.name ?? ''}
            className="flex-1 max-w-md h-12 bg-neutral-100 rounded-xl px-5 text-neutral-600 text-base border-2 border-transparent outline-none cursor-not-allowed"
          />
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-base text-neutral-900 font-semibold w-32">
            관심 분야
          </h1>
          <input
            type="text"
            value={interestedIn}
            onChange={(e) => setInterestedIn(e.target.value)}
            placeholder="예: UI/UX, 그래픽 디자인"
            className="flex-1 max-w-md h-12 bg-white rounded-xl px-5 text-neutral-900 text-base border-2 border-neutral-200 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all"
          />
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-base text-neutral-900 font-semibold w-32">
            디자인 경력
          </h1>
          <div className="flex-1 max-w-md h-12 bg-white rounded-xl flex items-center px-5 border-2 border-neutral-200 focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-100 transition-all">
            <input
              type="number"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              placeholder="0"
              className="flex-1 outline-none bg-transparent text-neutral-900"
            />
            <p className="text-neutral-600 text-base font-medium whitespace-nowrap ml-2">
              년차
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <h1 className="text-base text-neutral-900 font-semibold w-32 pt-3">
            기타 설명
          </h1>
          <div className="flex flex-col gap-4 flex-1">
            <textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="자기소개, 주요 작업 경험, 특기 등을 자유롭게 작성해주세요"
              className="h-48 bg-white rounded-xl resize-none py-4 px-5 text-neutral-900 text-base border-2 border-neutral-200 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all leading-relaxed"
            />
            <button
              type="button"
              className="w-full max-w-md h-12 rounded-xl shadow-md border-2 border-neutral-200 hover:border-sky-500 text-base font-semibold cursor-pointer text-neutral-700 hover:text-sky-700 transition-all hover:shadow-lg"
              onClick={() => setPortfolioModalOpen(true)}
            >
              포트폴리오 등록하기
            </button>
          </div>
        </div>
      </div>
      <section className="w-full flex justify-end pt-6 border-t border-neutral-200">
        <button
          type="submit"
          className="cursor-pointer px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white text-base font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          등록/수정 완료
        </button>
      </section>
      <DesignerPortfolioModal
        portfolioModalOpen={portfolioModalOpen}
        onClose={() => setPortfolioModalOpen(false)}
      />
    </form>
  );
}
